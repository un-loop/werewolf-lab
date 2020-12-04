import React from "react";
import { Typography, List, ListItemText, Box, ListItem, makeStyles } from "@material-ui/core";
import useGameContext from "../providers/gameProvider/useGameContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
    },
    list: {
        overflowY: "scroll",
        overflowX: "hidden",
        flexGrow: 1,
    },
    item: {
        padding: 0,
    }
}));

const PlayerList = () => {
    const classes = useStyles();
    const {players} = useGameContext();

    return (
        <Box className={classes.root} flexGrow={1}>
            <Typography variant="h2">
                Players
            </Typography>
            <List className={classes.list}>
                {
                    players && players.map(
                        (player) => (
                            <ListItem key={player.name} className={classes.item}>
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
