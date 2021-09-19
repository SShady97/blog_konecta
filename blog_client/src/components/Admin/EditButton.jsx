import React, { useState, useContext, Fragment, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Modal from './Modal';



const EditButton = ({ rowIndex, selectedTable }) => {

    
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')

    useEffect(() => {

        if(selectedTable === 'categories'){
            setTitle('Editar Categoria');
        }else if(selectedTable === 'items'){
            setTitle('Editar Item');
        }else{
            setTitle('Editar Usuario');
        }

    }, [selectedTable])

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <Fragment>
            <Tooltip title={title}>
                <Button color="primary" variant="outlined" onClick={handleOpen}>
                    <EditIcon className={EditIcon} />
                </Button>
            </Tooltip>
            <Modal 
                open={open} 
                setOpen={setOpen} 
                addModal={false} 
                rowIndex={rowIndex} 
                selectedTable={selectedTable}
                title={title}
            />
        </Fragment>
    );
}


export default EditButton;