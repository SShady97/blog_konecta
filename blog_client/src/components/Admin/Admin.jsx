import React, { Fragment, useEffect, useContext, useState } from 'react';

import { Grid, Divider, Container, Snackbar, Box, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Appbar from '../Appbar';
import Alert from '@material-ui/lab/Alert';
import DataTable from './DataTable';
import userContext from '../../context/user/userContext';
import categoryContext from '../../context/category/categoryContext';
import itemContext from '../../context/item/itemContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
    background: {
        borderRadius: 10,
        margin: '5%',
        width: '90%',
        backgroundColor: theme.palette.action.disabled,
    }
}));

const Admin = () => {

    const classes = useStyles();

    const [selectedTable, setSelectedTable] = useState('users');
    
    const UserContext = useContext(userContext);
    const CategoryContext = useContext(categoryContext);
    const ItemContext = useContext(itemContext);
    
    const  { getAllUsers, alert, hideAlert } = UserContext;
    const  { getAllCategories } = CategoryContext;
    const  { getAllItems } = ItemContext;

    useEffect(() => {
        getAllUsers();
    }, [])

    const handleChange = (e) => {
        setSelectedTable(e.target.value);
        if(e.target.value === 'users'){
            getAllUsers();
        }else if(e.target.value === 'categories'){
            getAllCategories();
        }else{
            getAllItems();
        }
        
    }

    const handleClose = (event, reason) => {
        hideAlert();
    };

    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px'}}>
                <Snackbar open={alert.display} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={'warning'}>
                        {alert.msg}
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} className={classes.background}>
                    <Grid item xs={12}>
                        <h3 style={{ marginBottom: '50px', textAlign: 'center' }}>ADMINISTRAR REGISTROS</h3>
                        <Box mb={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel>Seleccione una Opción</InputLabel>
                                <Select
                                    labelId="tables"
                                    id="tables"
                                    value={selectedTable}
                                    onChange={handleChange}
                                    label="Tablas"
                                >
                                    <MenuItem value={'users'}>Usuarios</MenuItem>
                                    <MenuItem value={'categories'}>Categorias</MenuItem>
                                    <MenuItem value={'items'}>Items</MenuItem>
                                </Select>
                            </FormControl>  
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm container direction="column" justifyContent="flex-start">
                        <Grid item >
                            <Box mt={2}>
                                <Divider />
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <h3>{selectedTable === 'users' 
                                        ? 'USUARIOS' 
                                        : selectedTable === 'categories'
                                            ? 'CATEGORIAS'
                                            : 'ITEMS'
                                    }
                                </h3>
                            </Box>
                            <DataTable selectedTable={selectedTable} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}

export default Admin;