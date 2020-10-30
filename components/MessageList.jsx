import { Box, List, Typography } from '@material-ui/core';
import React from 'react';
import Message from './Message';

const MessageList = ({messages}) => (
    <Box px={2}>
        <Typography variant="h4">
            Messages
        </Typography>
        <List>
            {messages.length === 0 && "No Messages"}
            {messages.length !== 0 && messages.map(
                (message, index) => <Message message={message} key={index} />
            )}
        </List>
    </Box>

);

export default MessageList;
