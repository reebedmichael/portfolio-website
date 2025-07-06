import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getAbout();
        setAbout(data);
      } catch (err) {
        // Production-safe error handling
        if (import.meta.env.DEV) {
          console.error('Error fetching about data:', err);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, loading, error };
}; 