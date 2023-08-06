import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteCard from './Favorite';
import { Drink } from '../../types/interfaces';
import { removeFavorite } from '../../store';

type favoriteListProps = {
  favorites: Drink[];
};

const FavoriteList: React.FunctionComponent<favoriteListProps> = ({
  favorites,
}) => {
  const dispatch = useDispatch();
  const onClose = (drink: Drink) => {
    dispatch(removeFavorite(drink));
  };
  return (
    <Fragment>
      {favorites.map((drink) => (
        <FavoriteCard key={drink.idDrink} drink={drink} onClose={onClose} />
      ))}
    </Fragment>
  );
};

export default FavoriteList;
