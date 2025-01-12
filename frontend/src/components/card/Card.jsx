import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddToCartButton from '../Buttons/AddToCartButton';
import AddToWishlistButton from '../Buttons/AddToWishlist';
import { Link } from 'react-router-dom';
import CardLogo from '../logo/CardLogo';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product, onAddToCart, id }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'inherit' }} aria-label="product">
            <CardLogo />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.title}
        subheader={product.description}
      />
      <Link to={`/main/product/${product.id}`}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.title}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {`new Price: $${product.price}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
        {`Old Price: $${product.old_price}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <AddToWishlistButton product={product}/>
        <AddToCartButton product={product} onAddToCart={onAddToCart} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            {product.description || 'No additional details available.'}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
