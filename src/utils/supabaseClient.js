import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Silent fail in production - environment variables should be set
  if (import.meta.env.DEV) {
    console.warn('Missing Supabase environment variables. Please check your .env file.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Production-safe error logging
const logError = (context, error) => {
  if (import.meta.env.DEV) {
    console.error(`${context}:`, error);
  }
  // In production, you might want to send to an error tracking service
  // but don't expose sensitive details in console
};

// Query functions for different data types
export const supabaseQueries = {
  // About section data
  getAbout: async () => {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .single();
    
    if (error) {
      logError('Error fetching about data', error);
      return null;
    }
    return data;
  },

  // Skills data grouped by category
  getSkills: async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('proficiency', { ascending: false });
    
    if (error) {
      logError('Error fetching skills data', error);
      return [];
    }
    
    // Group skills by category
    const groupedSkills = data.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    return groupedSkills;
  },

  // Projects data
  getProjects: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .order('featured', { ascending: false });
    
    if (error) {
      logError('Error fetching projects data', error);
      return [];
    }
    return data;
  },

  // Experience data
  getExperience: async () => {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_year', { ascending: false });
    
    if (error) {
      logError('Error fetching experience data', error);
      return [];
    }
    return data;
  },

  // Site settings (social links, contact info)
  getSiteSettings: async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();
    
    if (error) {
      logError('Error fetching site settings', error);
      return null;
    }
    return data;
  },

  // Contact form submission
  submitContactMessage: async (messageData) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message,
        created_at: new Date().toISOString()
      }]);
    
    if (error) {
      logError('Error submitting contact message', error);
      throw error;
    }
    return data;
  },

  // Download tracking (optional)
  trackDownload: async (fileName) => {
    const { data, error } = await supabase
      .from('downloads')
      .upsert([{
        file_name: fileName,
        download_count: 1,
        last_downloaded: new Date().toISOString()
      }], {
        onConflict: 'file_name',
        ignoreDuplicates: false
      });
    
    if (error) {
      logError('Error tracking download', error);
    }
    return data;
  },

  // FlutterFlow projects data
  getFlutterFlowProjects: async () => {
    const { data, error } = await supabase
      .from('flutterflow_projects')
      .select('*')
      .order('year', { ascending: false })
      .order('featured', { ascending: false });
    
    if (error) {
      logError('Error fetching FlutterFlow projects data', error);
      return [];
    }
    return data;
  }
}; 