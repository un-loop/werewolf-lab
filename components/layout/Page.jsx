import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "100vh",
    }
}));

const Page = ({children}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <CssBaseline />
            {children}
        </Box>
    );
}

export default Page;
