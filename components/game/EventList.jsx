import React from "react";
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    makeStyles,
} from "@material-ui/core";
import useGameContext from "../providers/gameProvider/useGameContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    list: {
        overflowY: "scroll",
        overflowX: "hidden",
        flexGrow: 1,
    },
    item: {
        padding: 0,
    },
}));

// scroll bar
const EventList = () => {
    const classes = useStyles();
    const { eventLog } = useGameContext();

    return (
        <Box className={classes.root} flexGrow={1}>
            <Typography variant="h2">Events</Typography>
            <List className={classes.list}>
                {eventLog &&
                    eventLog.map((value, index) => (
                        <ListItem key={index} className={classes.item}>
                            <ListItemText primary={value} />
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
};

export default EventList;
