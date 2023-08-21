// utilites
import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setError(data.error);
          setData(data);
          setLoading(false);
        });
    }, [url]);
  
    return [data, loading, error];
}