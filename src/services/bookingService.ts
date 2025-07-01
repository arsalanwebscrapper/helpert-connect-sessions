
import { supabase, Booking } from '@/lib/supabase';

export const bookingService = {
  // Create a new booking
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        status: 'pending',
      })
      .select(`
        *,
        client:users(*),
        expert:expert_profiles(*),
        consultation_type:consultation_types(*)
      `)
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }

    return data;
  },

  // Get bookings for a user (client or expert)
  async getUserBookings(userId: string, role: 'client' | 'expert' = 'client') {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        client:users(*),
        expert:expert_profiles(*),
        consultation_type:consultation_types(*)
      `);

    if (role === 'client') {
      query = query.eq('client_id', userId);
    } else {
      // For experts, we need to join with expert_profiles to get bookings
      query = query.in('expert_id', [
        supabase
          .from('expert_profiles')
          .select('id')
          .eq('user_id', userId)
      ]);
    }

    const { data, error } = await query
      .order('scheduled_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }

    return data as Booking[];
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: Booking['status'], meetingLink?: string) {
    const updates: Partial<Booking> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (meetingLink) {
      updates.meeting_link = meetingLink;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      throw error;
    }

    return data;
  },

  // Get available time slots for an expert
  async getAvailableSlots(expertId: string, date: string) {
    // This is a simplified version - in a real app, you'd want more complex scheduling logic
    const { data: availability, error } = await supabase
      .from('expert_availability')
      .select('*')
      .eq('expert_id', expertId)
      .eq('is_available', true);

    if (error) {
      console.error('Error fetching availability:', error);
      throw error;
    }

    // Get existing bookings for the date
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('scheduled_at, duration')
      .eq('expert_id', expertId)
      .gte('scheduled_at', `${date}T00:00:00Z`)
      .lt('scheduled_at', `${date}T23:59:59Z`)
      .in('status', ['pending', 'confirmed']);

    if (bookingError) {
      console.error('Error fetching bookings:', bookingError);
      throw bookingError;
    }

    // Logic to calculate available slots would go here
    // For now, return a simplified version
    return availability;
  },
};
