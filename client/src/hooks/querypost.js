import { useState, useCallback } from "react";

// Create the hook with url to route to specify
export const useFetchPost = (url) => {
    // Set response loading and error
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    // Create the callback for function with postData
    const callback = useCallback(async (postData) => {
        try {
            setLoading(true)
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            })
            const data = await res.json();
            setResponse(data);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [url]);
    return {callback, data: { response, loading, error }};
}