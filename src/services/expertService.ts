
import { supabase, ExpertProfile, ConsultationType } from '@/lib/supabase';

export const expertService = {
  // Get all experts with optional filters
  async getExperts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }) {
    let query = supabase
      .from('expert_profiles')
      .select(`
        *,
        user:users(*)
      `)
      .eq('is_verified', true);

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.minPrice || filters?.maxPrice) {
      if (filters.minPrice) {
        query = query.gte('hourly_rate', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('hourly_rate', filters.maxPrice);
      }
    }

    if (filters?.searchTerm) {
      query = query.or(`
        specialization.ilike.%${filters.searchTerm}%,
        category.ilike.%${filters.searchTerm}%,
        bio.ilike.%${filters.searchTerm}%
      `);
    }

    const { data, error } = await query.order('average_rating', { ascending: false });

    if (error) {
      console.error('Error fetching experts:', error);
      throw error;
    }

    return data as (ExpertProfile & { user: any })[];
  },

  // Get expert by ID
  async getExpertById(id: string) {
    const { data, error } = await supabase
      .from('expert_profiles')
      .select(`
        *,
        user:users(*),
        consultation_types(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching expert:', error);
      throw error;
    }

    return data;
  },

  // Get expert by user ID
  async getExpertByUserId(userId: string) {
    const { data, error } = await supabase
      .from('expert_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching expert profile:', error);
      throw error;
    }

    return data;
  },

  // Create expert profile
  async createExpertProfile(profile: Omit<ExpertProfile, 'id' | 'created_at' | 'updated_at' | 'total_sessions' | 'average_rating' | 'total_reviews' | 'is_verified'>) {
    const { data, error } = await supabase
      .from('expert_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) {
      console.error('Error creating expert profile:', error);
      throw error;
    }

    return data;
  },

  // Update expert profile
  async updateExpertProfile(id: string, updates: Partial<ExpertProfile>) {
    const { data, error } = await supabase
      .from('expert_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating expert profile:', error);
      throw error;
    }

    return data;
  },

  // Get consultation types for an expert
  async getConsultationTypes(expertId: string) {
    const { data, error } = await supabase
      .from('consultation_types')
      .select('*')
      .eq('expert_id', expertId)
      .order('duration');

    if (error) {
      console.error('Error fetching consultation types:', error);
      throw error;
    }

    return data as ConsultationType[];
  },

  // Create consultation type
  async createConsultationType(consultationType: Omit<ConsultationType, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('consultation_types')
      .insert(consultationType)
      .select()
      .single();

    if (error) {
      console.error('Error creating consultation type:', error);
      throw error;
    }

    return data;
  },

  // Get reviews for an expert
  async getExpertReviews(expertId: string, limit = 10) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        client:users(full_name)
      `)
      .eq('expert_id', expertId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    return data;
  },
};
