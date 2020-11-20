import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import PlayerList from "../game/PlayerList";
import EventList from "../game/EventList";

const useStyle = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: 300,
            padding: theme.spacing(2),
            borderLeft: "0.4px solid #ccc",
            '& > * + *': {
                borderTop: "0.4px solid #ccc",
                paddingTop: theme.spacing(1),
            }
        },
    };
});
// static height for consistency
// border to separate from rest of page
// padding
// background color

const GamePanel = ({ players, events }) => {
    const classes = useStyle();
    return (
        <Box className={classes.root}>
            <PlayerList players={players} />
            <EventList events={events} />
        </Box>
    );
};

export default GamePanel;
