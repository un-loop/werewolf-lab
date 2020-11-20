import React from "react";
import { Typography, List, ListItemText, Box } from "@material-ui/core";


const EventList = ({events}) => {

    return (
        <Box flexGrow={1}>
            <Typography variant="h4">
                Events
            </Typography>
            <List>

            </List>
        </Box>
    )
};


export default EventList;
