import React from "react";
import { Typography, List, ListItemText, Box, ListItem } from "@material-ui/core";

const PlayerList = ({players}) => {

    return (
        <Box flexGrow={1}>
            <Typography variant="h4">
                Player List
            </Typography>
            <List>
                {
                    players.map(
                        (player) => (
                            <ListItem key={player.name}>
                                <ListItemText primary={player.name} />
                            </ListItem>
                        )
                    )
                }
            </List>
        </Box>
    )
};

export default PlayerList;
