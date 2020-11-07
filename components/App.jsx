import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {w3cwebsocket as WebSocket} from 'websocket';
import { werewolfProtocol } from '../constants';
import { deserialize } from '../serialization/game';
import MessageList from './MessageList';
import NameEntry from './NameEntry';

const getHandleSend = (client) => (nickname) => {
    if (client.readyState === client.OPEN) {
        client.send(nickname);
    }
}

export default () => {
    const [nickname, setNickname] = useState('');
    const [nicknameChosen, setNicknameChosen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [nameError, setNameError] = useState('');
    const [game, setGame] = useState({});

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

    const handleNameSelect = (e) => {
        e.preventDefault();

        if (nickname.length < 2) {
            setNameError('Nickname must be at least 2 characters');
            return;
        }

        setNameError(false);
        setNicknameChosen(true);
        sendMessage(nickname);
    };

    const client = useMemo(() => {
        const newClient = new WebSocket('ws://localhost:3000/', werewolfProtocol);
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
                setGame(deserialize(e.data));
            }
        }
   }, [client, addMessage]);

    return (
        <React.Fragment>
            <Typography variant="h3">
                Play Werewolf
            </Typography>
            <NameEntry
                nickname={nickname}
                setNickname={setNickname}
                nicknameChosen={nicknameChosen}
                nameError={nameError}
            />
            {!nicknameChosen &&
                <Button
                    onClick={handleNameSelect}
                    variant="contained"
                >
                    Submit
                </Button>
            }


            <MessageList messages={messages} />
        </React.Fragment>
    )
}
