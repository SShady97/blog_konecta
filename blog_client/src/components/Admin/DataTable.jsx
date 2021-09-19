import React, { Fragment, useEffect, useContext, useState } from 'react';

import MUIDataTable from "mui-datatables";
import AddButton from './AddButton';
import EditButton from './EditButton';
import userContext from '../../context/user/userContext';
import categoryContext from '../../context/category/categoryContext';
import itemContext from '../../context/item/itemContext';

const DataTable = ({ selectedTable }) => {

    const UserContext = useContext(userContext);
    const CategoryContext = useContext(categoryContext);
    const ItemContext = useContext(itemContext);
    
    const  { users, deleteUser } = UserContext;
    const  { categories, deleteCategory } = CategoryContext;
    const  { items, deleteItem } = ItemContext;

    const columnsUser = [
        {
            name: 'name',
            label: 'Nombre'
        },
        {
            name: 'email',
            label:'Email'
        },
        {
            name: 'phone',
            label:'Teléfono'
        },
        {
            name: 'admin',
            label:'Administrador',
            options: {
                customBodyRender: (value) => {
                
                    return (
                        <div>{value === 1 ? 'Si' : 'No'}</div>
                    )
                }
            }
        },
        {
            name: 'created_at',
            label:'Fecha de Registro',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: 'updated_at',
            label:'Última Actualización',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    
                    return (
                        <EditButton rowIndex={tableMeta.rowIndex} selectedTable={selectedTable} />
                    )
                }
            }
        }
    ];

    const columnsCategory = [
        {
            name: 'name',
            label: 'Nombre'
        },
        {
            name: 'created_at',
            label:'Fecha de Registro',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: 'updated_at',
            label:'Última Actualización',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    
                    return (
                        <EditButton rowIndex={tableMeta.rowIndex} selectedTable={selectedTable} />
                    )
                }
            }
        }
    ];

    const columnsItems = [
        {
            name: 'title',
            label: 'Titulo'
        },
        {
            name: 'name',
            label: 'Categoria'
        },
        {
            name: 'slug',
            label:'Slug'
        },
        {
            name: 'created_at',
            label:'Fecha de Registro',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: 'updated_at',
            label:'Última Actualización',
            options: {
                customBodyRender: (value) => {
                
                    const reg_date = value.substring(0, 10);
                    return (
                        <div>{reg_date}</div>
                    );
                }
            }
        },
        {
            name: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    
                    return (
                        <EditButton rowIndex={tableMeta.rowIndex} selectedTable={selectedTable} />
                    )
                }
            }
        }
    ];

    const handleDelete = (row) => {

        if(selectedTable === 'users'){

            const data_index = row[0].index;
            const id = users[data_index].id;
            deleteUser(id, data_index);

        }else if(selectedTable === 'categories'){
            const data_index = row[0].index;
            const id = categories[data_index].id;
            deleteCategory(id, data_index);
        }else{
            const data_index = row[0].index;
            const id = items[data_index].id;
            deleteItem(id, data_index);
        }
        
    };

    const options = {
        download: 'false',
        print: 'false',
        sort: 'false',
        selectableRows: 'single',
        onRowsDelete:(row)=> handleDelete(row.data),
        filter: 'false',
        viewColumns: 'false',
        customToolbar: () => {
            return(
                <AddButton selectedTable={selectedTable} />
            );
        }
    };

    return (
        <MUIDataTable 
            data={selectedTable === 'users' 
                    ? users
                    : selectedTable === 'categories'
                        ? categories
                        : items 
            } 
            columns={selectedTable === 'users' 
                        ? columnsUser 
                        : selectedTable === 'categories'
                            ? columnsCategory
                            : columnsItems
            } 
            options={options}
            style={{width: '100%'}}
        />
    );
}

export default DataTable;