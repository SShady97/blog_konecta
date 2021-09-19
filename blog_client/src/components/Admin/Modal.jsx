import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery } from "@material-ui/core";
import Form from './Form';


const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        width: 470,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    customizedButton: {
        position: 'absolute',
        left: '90%',
        top: '2%',
        color: 'red',
    }
}));

const Modal = ({ open, setOpen, addModal, rowIndex, selectedTable, title }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
 
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogTitle id="responsive-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Form setOpen={setOpen} rowIndex={rowIndex} selectedTable={selectedTable} />
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}


export default Modal;