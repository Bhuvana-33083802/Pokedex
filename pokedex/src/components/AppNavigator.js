import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Define the styles using makeStyles
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "black",
  },
  title: {
    cursor: "grab",
    color: "pink", // Use a valid color name or hex code
  },
}));

export default function AppNavigator() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Pokedex
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
