import { useState, useEffect } from 'react';
import api from '../services/api';

function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(endpoint)
      .then(response => setData(response.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;

