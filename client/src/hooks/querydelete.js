import { useState, useCallback } from "react";


// Create the hook with url to route to specify
export const useFetchPost = (url) => {
    // Cookie
    const [resStatus, setResStatus] = useState();

    // Create the callback for function with postData
    const callback = useCallback(async () => {
        try {
            const res = await fetch(url, {
                method: 'DELETE',
            })
            const resStat = res.status;
            setResStatus(resStat);
        } catch (e) {
            console.error(e);
        }
    }, [url]);
    return { callback, data: { resStatus } };
}