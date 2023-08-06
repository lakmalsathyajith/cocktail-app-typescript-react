import { Drink } from '../../types/interfaces';
import { useLazyFetchCocktailQuery } from '../../store/apis/cocktailApi';

export const useLazyCocktail = (cocktail: Drink) => {
  const [trigger, result] = useLazyFetchCocktailQuery();
  const { data, error, isLoading, isFetching } = result;
  const getMoreDetails = () => {
    trigger(cocktail.idDrink);
  };

  return {
    getMore: getMoreDetails,
    data,
    error,
    isLoading: isLoading || isFetching,
  };
};
