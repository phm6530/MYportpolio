import { useState, useEffect, useRef } from 'react';

function useWebSocket(url) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('disconnected');
    const ws = useRef(null); // useRef를 사용하여 ws 객체를 저장

    useEffect(() => {
        ws.current = new WebSocket(url);

        const onOpen = () => {
            console.log('Connected to the server');
            setStatus('connected');
        };

        const onMessage = event => {
            // 서버로부터 받은 데이터가 Blob 형태인 경우
            if (event.data instanceof Blob) {
                // Blob을 텍스트로 변환
                const reader = new FileReader();
                reader.onload = () => {
                    console.log('Message from server:', reader.result);
                    setData(reader.result);
                };
                reader.readAsText(event.data);
            } else {
                // 데이터가 텍스트 형태인 경우
                console.log('Message from server:', event.data);
                setData(event.data);
            }
        };
        const onClose = () => {
            console.log('Disconnected from the server');
            setStatus('disconnected');
        };

        ws.current.addEventListener('open', onOpen);
        ws.current.addEventListener('message', onMessage);
        ws.current.addEventListener('close', onClose);

        return () => {
            ws.current.removeEventListener('open', onOpen);
            ws.current.removeEventListener('message', onMessage);
            ws.current.removeEventListener('close', onClose);
            ws.current.close();
        };
    }, [url]); // url이 변경될 때마다 useEffect 내의 로직을 재실행

    function sendMessage(message) {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.log('WebSocket is not open.');
        }
    }

    return { data, status, sendMessage };
}

export default useWebSocket;
