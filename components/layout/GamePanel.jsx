import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import PlayerList from "../game/PlayerList";
import EventList from "../game/EventList";

const useStyle = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            height: 200,
            padding: theme.spacing(2),
            borderTop: "0.4px #ccc",
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
