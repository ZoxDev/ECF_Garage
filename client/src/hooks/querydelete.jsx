// utilites
import { useState, useCallback } from "react";
import Cookies from "universal-cookie";

export const useFetchDelete = (url) => {

    const [dataDelete, setDataDelete] = useState();

    const callback = useCallback(async () => {
        const cookie = new Cookies(null, { path: "/" });
        const tokenValue = cookie.get("token");

        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "token" : tokenValue
                }
            });
            const resStat = await res.status;
            setDataDelete(resStat);
        } catch (err) {
            console.error(err);
        }
    }, [url])
    return { callback, dataDelete };
}