import {
    Box,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { werewolfProtocol } from "../constants";
import { PLAYING, SIGNUP } from "../enums/gameStatus";
import werewolf from "../server/themes/werewolf";
import Game from "./layout/Game";
import GamePlaying from "./layout/GamePlaying";
import GameSignup from "./layout/GameSignup";
import Page from "./layout/Page";
import useWebSocket from "./providers/webSocketProvider/useWebSocket";

export default () => {
    const [game, setGame] = useState();

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
                        {
                            game && game.gameStatus === SIGNUP &&
                                <GameSignup
                                    sendMessage={sendMessage}
                                />
                        }
                        {
                            game && game.gameStatus === PLAYING &&
                                <GamePlaying />
                        }
                    </Box>
                </Game>
            </Page>
        </ThemeProvider>
    );
};
