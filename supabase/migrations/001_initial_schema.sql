
-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create enum types
CREATE TYPE user_role AS ENUM ('client', 'expert', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE availability_status AS ENUM ('online', 'busy', 'offline');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expert profiles table
CREATE TABLE public.expert_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  category TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2) NOT NULL,
  availability_status availability_status DEFAULT 'online',
  languages TEXT[] DEFAULT ARRAY['English'],
  certifications TEXT[],
  education TEXT[],
  expertise_areas TEXT[],
  total_sessions INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation types (pricing tiers for experts)
CREATE TABLE public.consultation_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  consultation_type_id UUID REFERENCES public.consultation_types(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  total_price DECIMAL(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE UNIQUE,
  client_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expert availability table
CREATE TABLE public.expert_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_expert_profiles_category ON public.expert_profiles(category);
CREATE INDEX idx_expert_profiles_rating ON public.expert_profiles(average_rating);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_expert_id ON public.bookings(expert_id);
CREATE INDEX idx_bookings_scheduled_at ON public.bookings(scheduled_at);
CREATE INDEX idx_reviews_expert_id ON public.reviews(expert_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR ALL USING (auth.uid() = id);

-- RLS Policies for expert_profiles table
CREATE POLICY "Anyone can view expert profiles" ON public.expert_profiles
  FOR SELECT USING (true);

CREATE POLICY "Experts can update their own profile" ON public.expert_profiles
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for consultation_types table
CREATE POLICY "Anyone can view consultation types" ON public.consultation_types
  FOR SELECT USING (true);

CREATE POLICY "Experts can manage their consultation types" ON public.consultation_types
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.expert_profiles WHERE id = expert_id
    )
  );

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.expert_profiles WHERE id = expert_id
    )
  );

CREATE POLICY "Clients can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.expert_profiles WHERE id = expert_id
    )
  );

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews for their completed bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = client_id AND
    EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE id = booking_id AND status = 'completed' AND client_id = auth.uid()
    )
  );

-- RLS Policies for expert_availability table
CREATE POLICY "Anyone can view expert availability" ON public.expert_availability
  FOR SELECT USING (true);

CREATE POLICY "Experts can manage their availability" ON public.expert_availability
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.expert_profiles WHERE id = expert_id
    )
  );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update expert rating when a new review is added
CREATE OR REPLACE FUNCTION public.update_expert_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE public.expert_profiles
  SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2) 
      FROM public.reviews 
      WHERE expert_id = NEW.expert_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE expert_id = NEW.expert_id
    ),
    updated_at = NOW()
  WHERE id = NEW.expert_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update expert rating
CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.update_expert_rating();

-- Function to update booking status and increment session count
CREATE OR REPLACE FUNCTION public.handle_booking_completion()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.expert_profiles
    SET 
      total_sessions = total_sessions + 1,
      updated_at = NOW()
    WHERE id = NEW.expert_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle booking completion
CREATE TRIGGER on_booking_completed
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_booking_completion();
