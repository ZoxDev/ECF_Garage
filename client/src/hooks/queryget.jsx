// utilites
import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    const config = {
      headers: {
        accept: 'application/json',
      },
      data: {},
    };

    useEffect(() => {
      fetch(url, config)
        .then((res) => {
          if (!res.ok) {
            throw Error('Could not fetch the data for that resource');
          } else {
            // Utilisez .json() pour obtenir les données JSON de la réponse
            return res.json();
          }
        })
        .then((jsonData) => {
          setData(jsonData); // Mettez les données JSON dans votre state
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, [url]);
  
    return [data, loading, error];
}