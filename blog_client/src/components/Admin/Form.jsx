import React, { useContext, useEffect, useState, Fragment } from 'react'
import { TextField, FormControl, FormControlLabel, Switch, Button, InputLabel, MenuItem, Select } from "@material-ui/core";


import userContext from '../../context/user/userContext';
import categoryContext from '../../context/category/categoryContext';
import itemContext from '../../context/item/itemContext';

const Form = ({ setOpen, rowIndex, selectedTable }) => {

    const UserContext = useContext(userContext);
    const CategoryContext = useContext(categoryContext);
    const ItemContext = useContext(itemContext);

    const  { users, createUser, editUser } = UserContext;
    const  { categories, createCategory, editCategory, getAllCategories } = CategoryContext;
    const  { items, createItem, editItem } = ItemContext;

    const text_s_limit = 500;
    const text_l_limit = 2000;

    const [disabled, setDisabled] = useState(true);

    const [ dataUser, setDataUser ] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        admin: 0
    });

    const [ dataCategory, setDataCategory ] = useState({
        id: "",
        name: ""
    });

    const [ dataItem, setDataItem ] = useState({
        id: "",
        category_id: "",
        title: "",
        text_s: "",
        text_l: "",
        image: "",
        name: ""
    });

    useEffect(() => {
        console.log(dataItem)
    }, [dataItem])

    
    // En caso de que sea un formulario para edición, actualiza el state con los datos
    // de la fila seleccionada.
    useEffect(() => {

        if(rowIndex > -1){

            if(selectedTable === 'users'){

                const {id, name, email, phone, admin} = users[rowIndex];
                const user = {
                    id: id,
                    name: name,
                    email: email,
                    password: '',
                    phone: phone,
                    admin: admin
                }
                setDataUser(user);

            }else if(selectedTable === 'categories'){

                const {id, name} = categories[rowIndex];
                const category = {
                    id: id,
                    name: name
                }
                setDataCategory(category);

            }else{

                const item = items[rowIndex];
                setDataItem(item);

            }
        }
    
        if(selectedTable === 'items'){
            getAllCategories();
        }
    
    }, [])

    useEffect(() => {

        if(rowIndex === -1){

            if(selectedTable === 'users'){
                if(dataUser.name.trim() !== '' 
                    && dataUser.email.trim() !== '' 
                    && dataUser.password.trim() !== ''
                    && dataUser.phone.trim() !== '')
                {
                    setDisabled(false);
                
                }else{
                    setDisabled(true);
                }
            }else if(selectedTable === 'categories'){
                if(dataCategory.name.trim() !== ''){
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }else{
                if(dataItem.category_id !== ''
                   && dataItem.title.trim() !== ''
                   && dataItem.text_s.trim() !== ''
                   && dataItem.text_l.trim() !== ''
                   && dataItem.image.trim() !== '')
                {
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }
        }
        else{

            if(selectedTable === 'users'){
                if(dataUser.name.trim() !== '' 
                    && dataUser.email.trim() !== '' 
                    && dataUser.phone.trim() !== '')
                {
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }else if(selectedTable === 'categories'){
                if(dataCategory.name.trim() !== ''){
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }else{
                if(dataItem.category_id !== ''
                   && dataItem.title.trim() !== ''
                   && dataItem.text_s.trim() !== ''
                   && dataItem.text_l.trim() !== ''
                   && dataItem.image.trim() !== '')
                {
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
            }

        }

    }, [dataUser, dataCategory, dataItem])

    const handleChange = (e) => {

        if(selectedTable === 'users'){

            if(e.target.name === 'admin'){
                setDataUser({
                    ...dataUser,
                    [e.target.name]: e.target.checked === true ? 1 : 0
                });
            }else{
                setDataUser({
                    ...dataUser,
                    [e.target.name]: e.target.value
                });
            }

        }else if(selectedTable === 'categories'){
            setDataCategory({
                ...dataCategory,
                [e.target.name]: e.target.value
            });
        }else{
            if(e.target.name === 'category_id'){
                const cat = categories.find(category => category.id === e.target.value);
                setDataItem({
                    ...dataItem,
                    [e.target.name]: e.target.value,
                    ['name']: cat.name
                });

            }else{
                setDataItem({
                    ...dataItem,
                    [e.target.name]: e.target.value
                });
            }  
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(rowIndex === -1){

            if(selectedTable === 'users'){
                createUser(dataUser);
            }else if(selectedTable === 'categories'){
                createCategory(dataCategory);
            }else{
                createItem(dataItem);
            }

        }else{

            if(selectedTable === 'users'){
                editUser(dataUser, rowIndex);
            }else if(selectedTable === 'categories'){
                editCategory(dataCategory, rowIndex);
            }else{
                console.log(dataItem)
                editItem(dataItem, rowIndex);
            }
            
        }
        setOpen(false);
        
    }
    
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                {selectedTable === 'users'

                ?
                    <Fragment>
                        <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                value={dataUser.name}
                                onChange={handleChange}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={dataUser.email}
                                onChange={handleChange}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={dataUser.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Teléfono"
                                name="phone"
                                autoComplete="phone"
                                value={dataUser.phone}
                                onChange={handleChange}
                                autoFocus
                            />
                        </FormControl>
                        <FormControlLabel control={<Switch color="primary" name="admin" checked={dataUser.admin === 1 ? true : false} onChange={handleChange} />} label="Administrador" />
                    </Fragment>
                :   
                    selectedTable === 'categories'

                        ?
                            <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    name="name"
                                    autoComplete="name"
                                    value={dataCategory.name}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </FormControl>
                        :
                            <Fragment>
                                <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="title"
                                        label="Titulo"
                                        name="title"
                                        autoComplete="title"
                                        value={dataItem.title}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel>Seleccione una Categoría</InputLabel>
                                    <Select
                                        labelId="categories"
                                        id="categories"
                                        name="category_id"
                                        value={categories.length > 0 ? dataItem.category_id : ''}
                                        onChange={handleChange}
                                        label="Categorias"
                                    >
                                        
                                       { categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        ))};
                                    </Select>
                                </FormControl>
                                <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="text_s"
                                        label="Texto Corto"
                                        inputProps={{
                                            maxlength: text_s_limit
                                        }}
                                        name="text_s"
                                        value={dataItem.text_s}
                                        helperText={`${dataItem.text_s.length}/${text_s_limit}`}
                                        onChange={handleChange}
                                        multiline={true}
                                        maxRows={5}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="text_l"
                                        label="Texto Largo"
                                        inputProps={{
                                            maxlength: text_l_limit
                                        }}
                                        name="text_l"
                                        value={dataItem.text_l}
                                        helperText={`${dataItem.text_l.length}/${text_l_limit}`}
                                        onChange={handleChange}
                                        multiline={true}
                                        maxRows={5}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormControl required={true} style={{ width: "100%", marginBottom: '10px'}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="image"
                                        label="URL de la Imagen"
                                        name="image"
                                        value={dataItem.image}
                                        onChange={handleChange}
                                        multiline={true}
                                        maxRows={2}
                                        autoFocus
                                    />
                                </FormControl>                              
                            </Fragment>


                }

                <Button
                    type="submit"
                    fullWidth
                    style={{marginTop: '20px', fontWeight: 'bold'}}
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                >
                    {rowIndex === -1
                        ?
                            'Registrar'
                        :
                            'Editar'
                    }
                </Button> 
            </form>
            <Button
                fullWidth
                style={{marginTop: '10px', fontWeight: 'bold'}}
                variant="contained"
                color="secondary"
                onClick={() => setOpen(false)}
            >
                Cancelar
            </Button>
        </Fragment>
    );
}


export default Form;