import { Button, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {w3cwebsocket as WebSocket} from 'websocket';
import { werewolfProtocol } from '../constants';
import werewolf from '../server/themes/werewolf';
import Game from './layout/Game';
import Page from './layout/Page';
import MessageList from './MessageList';
import NameEntry from './NameEntry';
import useWebSocket from './providers/webSocketProvider/useWebSocket';

export default () => {
    const [nickname, setNickname] = useState('');
    const [nicknameChosen, setNicknameChosen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [nameError, setNameError] = useState('');
    const [game, setGame] = useState();


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

    const sendMessage = useWebSocket('ws://localhost:3000/', werewolfProtocol, setGame);

    return (
        <ThemeProvider theme={werewolf}>
            <Page>
                <Game game={game}>
                    <Typography variant="h1">
                        Werewolf
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
                </Game>
            </Page>
        </ThemeProvider>
    )
}
