import React, { useCallback, useMemo, useEffect } from 'react';
import GameContext from './WebSocketContext';

const getHandleSend = (client) => (nickname) => {
    if (client.readyState === client.OPEN) {
        client.send(nickname);
    }
}

const useWebSocket = (endpoint, protocol, setGame) => {
    const client = useMemo(
        () => new WebSocket(endpoint, protocol),
        [endpoint, protocol]
    );

    const sendMessage = useCallback(getHandleSend(client), [client]);

    useEffect(() => {
        client.onerror = () => console.log('Connection error');
        client.onopen = () => {
                console.log('WebSocket client connected');
        }
        client.onmessage = (e) => {
            if (typeof e.data === 'string') {
                const gameState = JSON.parse(e.data);

                //todo: hook up setting game
                setGame(gameState);
            }
        }
   }, [client, setGame]);

    return sendMessage;
}

export default useWebSocket;
