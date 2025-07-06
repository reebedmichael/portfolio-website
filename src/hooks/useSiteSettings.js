import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useSiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getSiteSettings();
        setSiteSettings(data);
      } catch (err) {
        // Production-safe error handling
        if (import.meta.env.DEV) {
          console.error('Error fetching site settings:', err);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  return { siteSettings, loading, error };
}; 