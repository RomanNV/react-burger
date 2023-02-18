import { DATA_URL } from "./const.js";
import { requestData } from "./requestData.js";

const getOrder = (arr) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  return requestData(`${DATA_URL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

const getDataIng = () => {
  return fetch(`${DATA_URL}ingredients`);
};

const getDataOrder = (arr) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });

  return fetch(`${DATA_URL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

const getPrice = (arr) => {
  if (arr.length === 0) {
    return 0;
  } else {
    let acc = 0;
    arr.forEach((item) => {
      const ingredient = item.ingredient;

      acc =
        ingredient.type === "bun"
          ? ingredient.price * 2 + acc
          : acc + ingredient.price;
    });

    return acc;
  }
};
const getIngredientsFromState = (state) => state.ingredientsData;
const getConstructorData = (state) => state.constructorData;
const getConstructorModal = (state) => state.constructorModal;
const getIngredientsDataFromState = (state) => state.ingredientsData;
const getIngredientsModal = (state) => state.ingredientModal;
export {
  getOrder,
  getDataIng,
  getDataOrder,
  getPrice,
  getIngredientsFromState,
  getConstructorData,
  getConstructorModal,
  getIngredientsDataFromState,
  getIngredientsModal,
};
