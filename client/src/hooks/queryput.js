import { useState, useCallback } from "react";
import Cookies from 'universal-cookie';

// Create the hook with url to route to specify
export const useFetchPut = (url) => {
    // Cookie
    const cookie = new Cookies(null, {path: "/"});
    const tokenValue = cookie.get("token");

    // Set response loading and error
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [resStatus, setResStatus] = useState();

    // Create the callback for function with PutData
    const callback = useCallback(async (putData) => {
        console.log(putData);
        try {
            setLoading(true)
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "token" : tokenValue
                },
                body: JSON.stringify(putData),
            })
            const dataPut = await res.json();
            const resStat = res.status;
            
            setResponse(dataPut);
            setResStatus(resStat);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [url]);
    return { callback, dataPut: { response, resStatus, loading, error } };
}