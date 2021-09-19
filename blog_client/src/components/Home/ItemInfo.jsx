import React, { Fragment, useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from "@material-ui/core/Tooltip";
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { Grid, Container, Box } from '@material-ui/core';
import Appbar from '../Appbar';
import ListItems from './ListItems';
import itemContext from '../../context/item/itemContext';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
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
    }
}));

const ItemInfo = () => {
    
    const classes = useStyles();

    const ItemContext = useContext(itemContext);

    const { items, getAllItems } = ItemContext;

    const [slug, setSlug] = useState(useParams().slug);
    const [itemSelected, setItemSelected] = useState(null);
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        console.log(slug)
        getAllItems();
    }, [slug]);

    useEffect(() => {
        const item = items.find(item => item.slug === slug);
        if(item){  
            setItemSelected(item);
        }
    }, [items]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Fragment>
            <Appbar />
            <Container maxWidth="xl" style={{ marginTop: '20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box style={{maxHeight: '700px', overflow: 'auto'}}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="auto"
                                        image={itemSelected?.image}
                                        title={itemSelected?.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="h1">
                                            {itemSelected?.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {itemSelected?.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {itemSelected?.text_s}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Tooltip title={expanded ? "Ver menos" : "Ver más"}>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Más Información:</Typography>
                                        <Typography paragraph>
                                            {itemSelected?.text_l}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box style={{maxHeight: '700px', overflow: 'auto'}}>
                            <ListItems setSlug={setSlug} />
                        </Box>
                    </Grid>    
                </Grid>
            </Container>    
        </Fragment>
    );
}

export default ItemInfo;