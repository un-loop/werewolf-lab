import { TextField, Typography } from '@material-ui/core';
import React from 'react';

const NameEntry = ({ nickname, setNickname, nicknameChosen, nameError }) => {
    return nicknameChosen ?
        <Typography variant="body1">
            You chose: {nickname}
        </Typography>
        :
        <TextField
            error={Boolean(nameError)}
            helperText={nameError}
            label="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} />;
};

export default NameEntry;
