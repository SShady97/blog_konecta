import React, { useState, Fragment, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Modal from './Modal';


const AddButton = ({ selectedTable }) => {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')

    useEffect(() => {

        if(selectedTable === 'categories'){
            setTitle('Nueva Categoria');
        }else if(selectedTable === 'items'){
            setTitle('Nuevo Item');
        }else{
            setTitle('Nuevo Usuario');
        }

    }, [selectedTable])

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <Tooltip title={title}>
                <IconButton onClick={handleOpen}>
                    <AddIcon className={AddIcon} />
                </IconButton>
            </Tooltip>
            <Modal 
                open={open} 
                setOpen={setOpen} 
                addModal={true} 
                rowIndex={-1} 
                selectedTable={selectedTable}
                title={title}
            />
        </Fragment>
    );
}


export default AddButton;