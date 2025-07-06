import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getProjects();
        setProjects(data);
      } catch (err) {
        // Production-safe error handling
        if (import.meta.env.DEV) {
          console.error('Error fetching projects data:', err);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}; 