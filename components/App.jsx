import {
    Box,
    Button,
    makeStyles,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import { werewolfProtocol } from "../constants";
import werewolf from "../server/themes/werewolf";
import Game from "./layout/Game";
import Page from "./layout/Page";
import MessageList from "./MessageList";
import NameEntry from "./NameEntry";
import useWebSocket from "./providers/webSocketProvider/useWebSocket";

const useStyle = makeStyles(() => {
    return {
        buttonContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        startButton: {
            transform: "scale(1.5)",
            borderRadius: "50%",
            lineHeight: "3.5",
        },
    };
});

export default () => {
    const classes = useStyle();
    const [nickname, setNickname] = useState("");
    const [nicknameChosen, setNicknameChosen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [nameError, setNameError] = useState("");
    const [game, setGame] = useState();

    const handleNameSelect = (e) => {
        e.preventDefault();

        if (nickname.length < 2) {
            setNameError("Nickname must be at least 2 characters");
            return;
        }

        setNameError(false);
        setNicknameChosen(true);
        sendMessage(nickname);
    };

    const sendMessage = useWebSocket(
        "ws://localhost:3000/",
        werewolfProtocol,
        setGame
    );

    return (
        <ThemeProvider theme={werewolf}>
            <Page>
                <Game game={game}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="stretch"
                        height="100%"
                    >
                        <Typography variant="h1">Werewolf</Typography>
                        <Box>
                            <NameEntry
                                nickname={nickname}
                                setNickname={setNickname}
                                nicknameChosen={nicknameChosen}
                                nameError={nameError}
                            />
                            {!nicknameChosen && (
                                <Button
                                    onClick={handleNameSelect}
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            )}
                        </Box>
                        <Box className={classes.buttonContainer} flexGrow={1}>
                            <Button
                                className={classes.startButton}
                                variant="contained"
                                color="primary"
                            >
                                Start
                            </Button>
                        </Box>
                    </Box>
                </Game>
            </Page>
        </ThemeProvider>
    );
};
