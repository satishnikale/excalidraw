import { useEffect, useState } from "react";
import { Ws_URL } from "../app/config";

export function useSocket(){
    const [ loading, setLoading ] = useState(true);
    const [ socket, setSocket ] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${Ws_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZWM3M2Q4MS0wMWU5LTQ5N2YtYmMzOC0zZDNlYjY5ZDMwZjIiLCJpYXQiOjE3NTA5MTQ0ODB9.QWidZ6HoZCQQ5vNRGGrzqPWQOyhEQ0fTPAgTlLuS7ow`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws)
        }
    }, []);

    return{
        socket, 
        loading
    }
}