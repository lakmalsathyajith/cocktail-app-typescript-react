import { Drink, DrinkCategory } from '../../types/interfaces';
import {
  useFetchCocktailCategoriesQuery,
  useLazyFetchCocktailsQuery,
  useLazySearchCocktailQuery,
} from '../../store/apis/cocktailApi';
import { useEffect, useState } from 'react';
import { getRandom } from '../../helpers/utils';

const cocktailsPerPage = 5;

export const useGetRandomCocktails = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory>({
    strCategory: '',
  });
  const {
    data: categoryData,
    error: categoryError,
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useFetchCocktailCategoriesQuery('');

  const [trigger, result] = useLazyFetchCocktailsQuery();
  const { data, error, isLoading, isFetching } = result;

  const [searchTrigger, searchResult] = useLazySearchCocktailQuery();
  const {
    data: searchData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: searchError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading: isSearchDataLoading,
    isFetching: isSearchDataFetching,
  } = searchResult;

  const randomize = () => {
    if (categoryData) {
      const { drinks } = categoryData;
      const randomCategory: DrinkCategory[] = getRandom(drinks, 1);
      setSelectedCategory(randomCategory[0]);
      trigger(randomCategory[0].strCategory);
    }
  };

  const mergeCategory = (data: Drink[], category: DrinkCategory): Drink[] => {
    return data.map((drink: Drink) => {
      if (!drink.strCategory) {
        const drinKModified = { ...drink };
        drinKModified['strCategory'] = category.strCategory;
        return drinKModified;
      }
      return drink;
    });
  };

  const onSearchChange = (e: any) => {
    searchTrigger(e.target.value);
  };

  const selectRandomSet = () => {
    randomize();
  };

  useEffect(() => {
    randomize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData]);

  useEffect(() => {
    if (data) {
      const randomDrinks: Drink[] = mergeCategory(
        getRandom(data.drinks, cocktailsPerPage),
        selectedCategory
      );
      setDrinks(randomDrinks);
    }
  }, [data, selectedCategory]);

  useEffect(() => {
    if (searchData) {
      const randomDrinks: Drink[] = getRandom(searchData, cocktailsPerPage);
      setDrinks(randomDrinks);
    }
  }, [searchData]);

  return {
    drinks,
    selectRandomSet,
    onSearchChange,
    error: error || categoryError,
    isLoading:
      isCategoryLoading || isLoading || isFetching || isCategoryFetching,
    isSearchDataLoading: isSearchDataFetching || isSearchDataFetching,
  };
};
