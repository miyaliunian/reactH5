/**
 * Class: SimpleSnackbar
 * Author: wufei
 * Date: 2019/9/9
 * Description:
 *
 */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SlideDownSnackBar(props) {
  const classes = useStyles();
  const { show, handleClose, desc } = props;
  const [state, setState] = useState({
    open: false,
    Transition: Slide
  });

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={show}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={state.Transition}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{desc}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}
