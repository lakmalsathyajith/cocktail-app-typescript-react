import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          drinks: [
            {
              strCategory: 'Cocoa',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          drinks: [
            {
              strDrink: 'Castillian Hot Chocolate',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
              idDrink: '12730',
            },
            {
              strDrink: 'Chocolate Beverage',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/jbqrhv1487603186.jpg',
              idDrink: '12732',
            },
            {
              strDrink: 'Chocolate Drink',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/q7w4xu1487603180.jpg',
              idDrink: '12734',
            },
            {
              strDrink: 'Drinking Chocolate',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/u6jrdf1487603173.jpg',
              idDrink: '12736',
            },
            {
              strDrink: 'Hot Chocolate to Die for',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/0lrmjp1487603166.jpg',
              idDrink: '12738',
            },
            {
              strDrink: 'Microwave Hot Cocoa',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/8y4x5f1487603151.jpg',
              idDrink: '12744',
            },
          ],
        }),
        ctx.delay(150)
      );
    }
  ),
];
