import {
  addBunAction,
  addIngredientAction,
  clearConstructorAction,
  deleteConstructorIngredientAction,
  reorderIngredientList,
} from "../actions/burgerConstructor";
import { constructorReducer, initialState } from "./burgerConstructor";

const mockAddBunDataAction = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};
const mockAddIngredientDataAction = {
  _id: "643d69a5c3f7b9001cfa0943",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
};
const mockConstructorIngredient = [
  {
    ingredient: {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    itemId: 0.8544978219978372,
  },
  {
    ingredient: {
      _id: "643d69a5c3f7b9001cfa0945",
      name: "Соус с шипами Антарианского плоскоходца",
      type: "sauce",
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: "https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      __v: 0,
    },
    itemId: 0.7413968856938447,
  },
  {
    ingredient: {
      _id: "643d69a5c3f7b9001cfa0945",
      name: "Соус с шипами Антарианского плоскоходца",
      type: "sauce",
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: "https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      __v: 0,
    },
    itemId: 0.049652821738653596,
  },
  {
    ingredient: {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    itemId: 0.15680499066027753,
  },
];
describe("test for reducer of burgerConstructor", () => {
  test("Action ADD_BUN", () => {
    const expected = {
      ...initialState,
      bun: [{ ingredient: mockAddBunDataAction, itemId: 1111 }],
    };
    const received = constructorReducer(
      initialState,
      addBunAction(mockAddBunDataAction)
    );
    expect(received.bun[0].ingredient).toEqual(expected.bun[0].ingredient);
    expect(received.bun[0]).toHaveProperty("itemId");
  });
  test("Action ADD_INGREDIENT", () => {
    const expected = {
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        { mockAddIngredientDataAction, itemID: 2222 },
      ],
    };
    const received = constructorReducer(
      initialState,
      addIngredientAction(mockAddIngredientDataAction)
    );
    expect(received.ingredients.ingredient).toEqual(
      expected.ingredients.ingredient
    );
    expect(received.ingredients[0]).toHaveProperty("itemId");
  });
  test("Action DELETE_CONSTRUCTOR_INGREDIENT", () => {
    const expected = {
      ...initialState,
      ingredients: mockConstructorIngredient,
    };
    const received = constructorReducer(
      initialState,
      deleteConstructorIngredientAction(mockConstructorIngredient)
    );
    expect(received).toEqual(expected);
  });
  test("Action CLEAR_CONSTRUCTOR", () => {
    const expected = {
      ...initialState,
    };
    const received = constructorReducer(initialState, clearConstructorAction());
    expect(received).toEqual(expected);
  });
  test("Action REORDER_INGREDIENT_LIST", () => {
    const expected = {
      ...initialState,
      ingredients: mockConstructorIngredient,
    };
    const received = constructorReducer(
      initialState,
      reorderIngredientList(mockConstructorIngredient)
    );
    expect(received).toEqual(expected);
  });
});
