import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { Drink } from '../../types/interfaces';
import { useLazyCocktail } from '../Hooks/useLazyCocktail';

type cocktailProps = {
  drink: Drink;
  isFavorite: boolean;
  handleAddToFavorites: (drink: Drink, isFavorite: boolean) => void;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardContentNoPadding = styled(CardContent)(`
  padding: 6px;
  max-height:25px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CardActionsNoPadding = styled(CardActions)(`
  padding: 4px;
`);

const Cocktail: React.FunctionComponent<cocktailProps> = ({
  drink,
  isFavorite,
  handleAddToFavorites,
}: cocktailProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const { getMore, data, isLoading } = useLazyCocktail(drink);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!data) getMore();
  };

  return (
    <Card sx={{ width: 345 }} data-testid="cocktailCard">
      <CardMedia
        sx={{ height: 200 }}
        image={`${drink.strDrinkThumb}/preview`}
        title={drink.strDrink}
      />
      <CardContentNoPadding>
        <Typography gutterBottom variant="subtitle2" component="div">
          {drink.strDrink}
        </Typography>
      </CardContentNoPadding>
      <CardActionsNoPadding disableSpacing>
        <IconButton
          data-testid="favorite"
          aria-label="add to favorites"
          onClick={() => {
            handleAddToFavorites(drink, isFavorite);
          }}
        >
          {isFavorite ? (
            <StarIcon sx={{ color: '#1976d2' }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
        <Chip label={drink.strCategory} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActionsNoPadding>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Instructions</Typography>
          <Typography paragraph variant="subtitle2">
            {isLoading ? <CircularProgress color="inherit" /> : null}
            {data ? data[0].strInstructions : null}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Cocktail;
