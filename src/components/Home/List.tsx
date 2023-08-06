import * as React from 'react';
import Grid from '@mui/material/Grid';
import Cocktail from '../Cocktail';
import { Drink } from '../../types/interfaces';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store';

type listProps = {
  drinks: Drink[];
  favorites: Drink[];
};

const List: React.FunctionComponent<listProps> = ({ drinks, favorites }) => {
  const dispatch = useDispatch();
  const handleAddToFavorites = (drink: Drink, isFavorite: boolean) => {
    if (isFavorite) {
      dispatch(removeFavorite(drink));
    } else {
      dispatch(addFavorite(drink));
    }
  };
  return (
    <React.Fragment>
      {drinks.map((drink: Drink) => {
        const isFavorite =
          favorites.filter((fav) => fav.idDrink === drink.idDrink).length > 0;
        return (
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            key={drink.idDrink}
          >
            <Cocktail
              drink={drink}
              isFavorite={isFavorite}
              handleAddToFavorites={handleAddToFavorites}
            />
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default List;
