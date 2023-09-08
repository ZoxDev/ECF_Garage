import { useState, useCallback } from "react";

// Create the hook with url to route to specify
export const useFetchPost = (url) => {
    // Set response loading and error
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [resStatus, setResStatus] = useState();   
  
    // Create the callback for function with PutData
    const callback = useCallback(async (putData) => {
        try {
            setLoading(true)
            const res = await fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(putData),
            })
            const data = await res.json();
            const resStat = res.status;
            setResponse(data);
            setResStatus(resStat);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [url]);
    return {callback, data: { response, resStatus,loading, error }};
}