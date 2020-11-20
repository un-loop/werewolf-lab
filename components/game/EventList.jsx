import React from "react";
import { Typography, List, ListItem, ListItemText, Box } from "@material-ui/core";


// scroll bar
const EventList = ({events}) => {

    return (
        <Box flexGrow={1}>
            <Typography variant="h4">Events</Typography>
            <List>
                {events.map((value, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={value} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};


export default EventList;
