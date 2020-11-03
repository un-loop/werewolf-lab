import { Button, TextField, Typography } from '@material-ui/core';
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

const getHandleSend = (client) => (message) => {
    if (client.readyState === client.OPEN) {
        client.send(message);
    }
}

export default () => {
    const [message, setMessage] = useState('');
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

    const sendMessage = useCallback(getHandleSend(client), [client]);

    useEffect(() => {
        client.onerror = () => addMessage('Connection error');
        client.onopen= () => {
                addMessage('WebSocket client connected');
        }
        client.onmessage = (e) => {
            if (typeof e.data === 'string') {
                addMessage("Received: '" + e.data + "'");
            }
        }
   }, [client, addMessage]);

    return (
        <React.Fragment>
            <Typography variant="h3">
                Testing Web Socket messages
            </Typography>
            <TextField
                label="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value) }
            />
            <Button
                onClick={() => {
                    sendMessage(message);
                    setMessage('');
                }}
            variant="contained">
                Send Message
            </Button>


            <MessageList messages={messages} />
        </React.Fragment>
    )
}
