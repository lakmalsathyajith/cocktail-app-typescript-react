import { createSlice } from '@reduxjs/toolkit';
import { Drink } from '../../types/interfaces';

/**
 * Slice with actions to add / delete favorites
 *
 * @return  {Object[]}  [return description]
 */
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite(state: Drink[], action) {
      const { idDrink }: Drink = action.payload;
      const isExist =
        state.filter((item: Drink) => item.idDrink === idDrink).length > 0;
      if (!isExist) {
        state.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      const { idDrink }: Drink = action.payload;
      const filteredFavorites = state.filter(
        (item: Drink) => item.idDrink !== idDrink
      );
      return [...filteredFavorites];
    },
  },
});

const { actions, reducer } = favoriteSlice;
export const { addFavorite, removeFavorite } = actions;
export default reducer;
