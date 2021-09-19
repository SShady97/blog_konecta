import React, { useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import itemContext from '../../context/item/itemContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ListItems = ({ setSlug }) => {

    const classes = useStyles();

    const ItemContext = useContext(itemContext);

    const { items } = ItemContext;

    return (
        <List className={classes.root}>
            {
                items.map((item) => {
                    return(
                        <Fragment key={item.title}>
                            <Tooltip title={`Ver ${item.title}`}>
                                <Link to={`/item/${item.slug}`}>
                                    <Button fullWidth onClick={() => setSlug(item.slug)}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={item.slug} src={item.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={
                                                    <Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        {` - Creado el ${item.created_at.substring(0, 10)}`}
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Button>
                                </Link>
                            </Tooltip>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    );
                })
                
            }
            
        </List>
    );
}

export default ListItems;
