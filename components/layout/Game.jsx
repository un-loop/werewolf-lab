import React from "react";
import { Box, Typography } from "@material-ui/core";
import GamePanel from "./GamePanel";

const Game = ({children, game}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            height="100vh"
        >
            {
                game ?
                    <React.Fragment>
                        <Box flexGrow={1}>
                            {children}
                        </Box>
                        <GamePanel players={game.players} events={game.events} />
                    </React.Fragment>
                :
                    <Typography variant="body1">
                        Loading Game...
                    </Typography>
            }
        </Box>
    )
}

export default Game;
