import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getExperience();
        setExperience(data);
      } catch (err) {
        console.error('Error fetching experience data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
}; 