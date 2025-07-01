
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'client' | 'expert' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpertProfile {
  id: string;
  user_id: string;
  category: string;
  specialization: string;
  bio?: string;
  experience_years: number;
  hourly_rate: number;
  availability_status: 'online' | 'busy' | 'offline';
  languages: string[];
  certifications: string[];
  education: string[];
  expertise_areas: string[];
  total_sessions: number;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface ConsultationType {
  id: string;
  expert_id: string;
  duration: number;
  price: number;
  description?: string;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  expert_id: string;
  consultation_type_id: string;
  scheduled_at: string;
  duration: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meeting_link?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: User;
  expert?: ExpertProfile;
  consultation_type?: ConsultationType;
}

export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  expert_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  client?: User;
}
