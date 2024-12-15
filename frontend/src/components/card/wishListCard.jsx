import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddToCartBtn from '../Buttons/Extrabuttons/AddToCartBtn';
import { Link } from 'react-router-dom';
import BarLogo from '../logo/BarLogo';
import RemoveFromWishList from '../Buttons/RemoveFromWishList';

const ExpandMoreButton = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    transform: (props) => (props.expand ? 'rotate(180deg)' : 'rotate(0deg)'),
}));

const WishListCard = ({ product, onRemove }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (!product) {
        return null; 
    }

    return (
        <Card sx={{ maxWidth: 270 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'inherit' }} aria-label="product">
                        <BarLogo style={{ width: '30px' }} />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={product.title || 'No Title'}
                subheader={product.description || 'No Description'}
            />
            <Link to={`/product/${product.id}`}>
                <CardMedia
                    component="img"
                    height="270"
                    image={product.image || 'defaultImage.jpg'} 
                    alt={product.title }
                />
            </Link>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`Price: $${product.price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    {`Old Price: $${product.old_price}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <AddToCartBtn product={product} />
                <RemoveFromWishList itemId={product.id} onRemove={onRemove} />
                <ExpandMoreButton
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMoreButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        {product.description || 'No additional details available.'}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default WishListCard;
