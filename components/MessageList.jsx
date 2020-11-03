import { Box, List, Typography } from '@material-ui/core';
import React from 'react';
import Message from './Message';

export const ListHOC = (Component) => ({title, items}) => (
    <Box px={2}>
        <Typography variant="h4">
            {title}
        </Typography>
        <List>
            {items.length === 0 && "No items"}
            {items.length !== 0 && items.map(
                (item, index) => <Component item={item} key={index} />
            )}
        </List>
    </Box>
);

const MessageList = ({messages}) => {
    const ListComponent = ListHOC(
        ({item}) => <Message message={item} />
    );

    return <ListComponent items={messages} />
}


export default MessageList;
