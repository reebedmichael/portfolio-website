import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useFlutterFlowProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supabaseQueries.getFlutterFlowProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching FlutterFlow projects data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}; 