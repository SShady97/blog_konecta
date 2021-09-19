import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));


const CardItem = ({ item }) => {

    const classes = useStyles();

    useEffect(() => {
        console.log(item)
    }, [])


    return (
        <Card className={classes.root} >
            <CardHeader
                action={
                    <Link to={`/item/${item.slug}`}>
                        <Tooltip title="Ver Detalles">
                            <IconButton>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                }
                title={item.title}
                subheader={item.name}
            />
            <CardMedia
                component="img"
                height="350"
                image={item.image}
                alt={item.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.text_s}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardItem;