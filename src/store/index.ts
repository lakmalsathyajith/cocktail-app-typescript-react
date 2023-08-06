import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import favoriteReducer from './slices/favoriteSlice';
import { cocktailApi } from './apis/cocktailApi';
import { Drink } from '../types/interfaces';

interface initialState {
  cocktails: {};
  favorites: Drink[];
}

const store = configureStore({
  reducer: {
    [cocktailApi.reducerPath]: cocktailApi.reducer,
    favorites: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cocktailApi.middleware);
  },
});

setupListeners(store.dispatch);

const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      [cocktailApi.reducerPath]: cocktailApi.reducer,
      favorites: favoriteReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(cocktailApi.middleware),
  });
};

export { useFetchCocktailsQuery } from './apis/cocktailApi';
export { addFavorite, removeFavorite } from './slices/favoriteSlice';
export type IRootState = initialState;
export default setupStore;
