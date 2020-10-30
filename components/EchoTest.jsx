import { Typography } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {w3cwebsocket as WebSocket} from 'websocket';
import MessageList from './MessageList';

const getSendNumber = (client) => {
    const sendNumber = () => {
        if (client.readyState === client.OPEN) {
            const number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 5000);
        };
    }

    return sendNumber;
}

export default () => {
    const [messages, setMessages] = useState([]);

    const addMessage = useCallback(
        (messageText) => {
            const newMessage = {
                text: messageText,
                date: new Date()
            }

            const newMessages = [
                ...messages.slice(-9),
                newMessage
            ];

            setMessages(newMessages);
        }, [messages]
    );

    const client = useMemo(() => {
        const newClient = new WebSocket('ws://localhost:3000/', 'echo-protocol');
        return newClient;
    }, []);

    const sendNumber = useMemo(() => getSendNumber(client), [client]);

    useEffect(() => {
        client.onerror = () => addMessage('Connection error');
        client.onopen= () => {
                addMessage('WebSocket client connected');
                sendNumber();
        }
        client.onmessage = (e) => {
            if (typeof e.data === 'string') {
                addMessage("Received: '" + e.data + "'");
            }
        }
   }, [client, messages]);

    return (
        <React.Fragment>
            <Typography variant="h3">
                Testing Web Socket messages
            </Typography>
            <MessageList messages={messages} />
        </React.Fragment>
    )
}
