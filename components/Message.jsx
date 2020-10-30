import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

const Message = ({message}) => {
    return (
        <ListItem>
            <ListItemText primary={message.text} secondary={moment(message.date).format('LTS')} />
        </ListItem>
    )
}

export default Message;
