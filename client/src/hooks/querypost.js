import { useState, useCallback } from "react";
import Cookies from "universal-cookie";

// Create the hook with url to route to specify
export const useFetchPost = (url) => {
    // Cookie
    const cookie = new Cookies(null, { path: "/" });
    const tokenValue = cookie.get("token");


    // Set response loading and error
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [resStatus, setResStatus] = useState();

    // Create the callback for function with postData
    const callback = useCallback(async (postData) => {
        try {
            setLoading(true)
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": tokenValue
                },
                body: JSON.stringify(postData),
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
    return { callback, data: { response, resStatus, loading, error } };
}