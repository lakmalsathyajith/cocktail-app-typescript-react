import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Drink } from '../../types/interfaces';

type cocktailResponse = {
  drinks: Drink[];
};

/**
 * Invokes external api using redux RTK
 *
 * @return  {Object}
 */
const cocktailApi = createApi({
  reducerPath: 'cocktails',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1',
  }),
  endpoints(builder) {
    return {
      fetchCocktailCategories: builder.query({
        query: () => {
          return {
            url: '/list.php',
            params: {
              c: 'list',
            },
            method: 'GET',
          };
        },
      }),
      fetchCocktails: builder.query({
        query: (type: string) => {
          return {
            url: '/filter.php',
            params: {
              c: type,
            },
            method: 'GET',
          };
        },
      }),
      fetchCocktail: builder.query({
        query: (cocktailId: string) => {
          return {
            url: '/lookup.php',
            params: {
              i: cocktailId,
            },
            method: 'GET',
          };
        },
        transformResponse: (response: cocktailResponse) => {
          return response.drinks.map((drink: Drink) => {
            return { strInstructions: drink.strInstructions };
          });
        },
      }),
      searchCocktail: builder.query({
        query: (searchKey: string) => {
          return {
            url: 'search.php',
            params: {
              s: searchKey,
            },
            method: 'GET',
          };
        },
        transformResponse: (response: cocktailResponse) => {
          if (response.drinks) {
            return response.drinks.map((drink: Drink) => {
              return {
                strDrink: drink.strDrink,
                strDrinkThumb: drink.strDrinkThumb,
                idDrink: drink.idDrink,
                strCategory: drink.strCategory,
              };
            });
          } else {
            return [];
          }
        },
      }),
    };
  },
});

export const {
  useFetchCocktailCategoriesQuery,
  useFetchCocktailsQuery,
  useFetchCocktailQuery,
  useLazyFetchCocktailsQuery,
  useLazyFetchCocktailQuery,
  useLazySearchCocktailQuery,
} = cocktailApi;
export { cocktailApi };
