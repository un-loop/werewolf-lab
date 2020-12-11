import { Box, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import NameEntry from "../NameEntry";

const useStyle = makeStyles((theme) => {
    console.log(theme.breakpoints.down('sm'));
    return {
        buttonContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        startButton: {
            [theme.breakpoints.down('sm')]: {
                transform: "scale(1.5)",
            },
            [theme.breakpoints.up('sm')]: {
                transform: "scale(2.5)",
            },
            [theme.breakpoints.up('md')]: {
                transform: "scale(2.5)",
            },
            [theme.breakpoints.up('lg')]: {
                transform: "scale(4)",
            },
            [theme.breakpoints.up('xl')]: {
                transform: "scale(6)",
            },
            borderRadius: "50%",
            lineHeight: "4.5",
        },
    };
});

const getStartGameAction = () => {
    return {
        type: "start",
    }
}

const getJoinGameAction = (nickname) => {
    return {
        type: "join",
        payload: nickname
    }
}

const GameSignup = ({sendMessage}) => {
    const classes = useStyle();
    const [nickname, setNickname] = useState("");
    const [nicknameChosen, setNicknameChosen] = useState(false);
    const [nameError, setNameError] = useState("");

    const handleNameSelect = (e) => {
        e.preventDefault();

        if (nickname.length < 2) {
            setNameError("Nickname must be at least 2 characters");
            return;
        }

        setNameError(false);
        setNicknameChosen(true);
        sendMessage(getJoinGameAction(nickname));
    };

    const handleStartGame = (e) => {
        e.preventDefault();

        sendMessage(getStartGameAction());
    }

    return <React.Fragment>
        <Box>
            <NameEntry
                nickname={nickname}
                setNickname={setNickname}
                nicknameChosen={nicknameChosen}
                nameError={nameError}
            />
            {!nicknameChosen && (
                <Button
                    onClick={handleNameSelect}
                    variant="contained"
                >
                    Submit
                </Button>
            )}
        </Box>
        <Box className={classes.buttonContainer} flexGrow={1}>
            <Button
                className={classes.startButton}
                variant="contained"
                color="primary"
                onClick={handleStartGame}
            >
                Start
            </Button>
    </Box>

    </React.Fragment>

}

export default GameSignup;
