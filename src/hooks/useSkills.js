import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useSkills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getSkills();
        setSkills(data);
      } catch (err) {
        console.error('Error fetching skills data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
}; 