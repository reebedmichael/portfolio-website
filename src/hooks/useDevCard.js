import { useState, useEffect } from 'react';
import { supabaseQueries } from '../utils/supabaseClient';

export const useDevCard = () => {
  const [devCard, setDevCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevCard = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await supabaseQueries.getDevCard();
        setDevCard(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dev card:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevCard();
  }, []);

  return { devCard, loading, error };
};
