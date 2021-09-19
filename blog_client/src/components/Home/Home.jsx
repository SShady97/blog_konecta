import React, { Fragment, useEffect, useContext, useState } from 'react';

import { Grid, Divider, Container, Box, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Appbar from '../Appbar';
import CardItem from './CardItem';
import loginContext from '../../context/login/loginContext';
import itemContext from '../../context/item/itemContext';
import categoryContext from '../../context/category/categoryContext';

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

const Home = () => {
    
    const classes = useStyles();

    const logContext = useContext(loginContext);
    const ItemContext = useContext(itemContext);
    const CategoryContext = useContext(categoryContext);
    
    const  { getAuthUser } = logContext;
    const  { getAllItems, items, itemsByCat } = ItemContext;
    const  { getAllCategories, categories } = CategoryContext;

    const [category, setCategory ] = useState(0);

    useEffect(() => {
        getAuthUser();
        getAllItems();
        getAllCategories();
    }, []);

    const handleChange = (e) => {
        setCategory(e.target.value);

        if(e.target.value !== 0){
            itemsByCat(e.target.value);
        }else{
            getAllItems();
        }
    };

    useEffect(() => {
        console.log(category);
    }, [category])

    return (
        <Fragment>
            <Appbar />
                <Container maxWidth="xl" style={{ marginTop: '20px'}}>
                {/* <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertstatus === 200 ? 'success' : 'warning'}>
                        {alertmsg}
                    </Alert>
                    </Snackbar> */}
                <Box mb={6}>
                    <FormControl fullWidth variant="filled">
                        <InputLabel>Filtrar por Categoria</InputLabel>
                        <Select
                            labelId="tables"
                            id="tables"
                            value={category}
                            onChange={handleChange}
                            label="Tablas"
                        >
                            <MenuItem key={0} value={0}>Todas</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>  
                </Box>
                <Grid container spacing={2}>
                    {
                        items.map((item) => {
                            console.log(item)
                            return(
                                <Grid item xs={4} >
                                    <CardItem item={item} height='350' />
                                </Grid>
                            );
                        })
                    }
                    
                </Grid>
            </Container>    
        </Fragment>
    );
}

export default Home;