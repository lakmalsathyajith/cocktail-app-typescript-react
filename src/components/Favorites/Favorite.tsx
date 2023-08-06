import React, { Fragment } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { Drink } from '../../types/interfaces';

type favoriteCardProps = {
  drink: Drink;
  onClose: (drink: Drink) => void;
};

const CardContentNoPadding = styled(CardContent)(`
  padding: 5px;
  &:last-child {
    padding-bottom: 0;
  }
`);
const FavoriteCard: React.FunctionComponent<favoriteCardProps> = ({
  drink,
  onClose,
}) => {
  return (
    <Fragment>
      <Grid
        item
        md={6}
        sm={4}
        sx={{
          minWidth: 115,
          position: 'relative',
        }}
        data-testid="favoriteCard"
      >
        <IconButton
          onClick={() => onClose(drink)}
          color="error"
          aria-label="add to shopping cart"
          sx={{
            position: 'absolute',
            top: '5px',
            right: '-20px',
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            background: 'clear',
          }}
        >
          <ClearIcon />
        </IconButton>
        <Card
          sx={{
            minWidth: 115,
          }}
        >
          <CardMedia
            sx={{ height: 100 }}
            image={`${drink.strDrinkThumb}/preview`}
            title={drink.strDrink}
          ></CardMedia>
          <CardContentNoPadding>
            <Typography variant="caption" component="div">
              {drink.strDrink}
            </Typography>
          </CardContentNoPadding>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default FavoriteCard;
