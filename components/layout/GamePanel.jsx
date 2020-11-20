import { Box } from "@material-ui/core";
import React from "react";
import PlayerList from "../game/PlayerList";
import EventList from "../game/EventList";

const GamePanel = ({players, events}) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="stretch"
        >
            <PlayerList players={players} />
            <EventList events={events} />
        </Box>
    );
};

export default GamePanel;
