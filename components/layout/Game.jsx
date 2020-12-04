import React from "react";
import { Box, Typography } from "@material-ui/core";
import GamePanel from "./GamePanel";
import GameContextProvider from "../providers/gameProvider";

const Game = ({children, game}) => {
    return (
        <GameContextProvider game={game}>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                width="100vw"
                height="100vh"
            >
                {
                    game ?
                        <React.Fragment>
                            <Box flexGrow={1}>
                                {game && children}
                            </Box>
                            <GamePanel />
                        </React.Fragment>
                    :
                        <Typography variant="body1">
                            Loading Game...
                        </Typography>
                }
            </Box>
        </GameContextProvider>
    )
}

export default Game;
