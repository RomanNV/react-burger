import { DATA_URL, END_POINT } from "./const.js";
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

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const postEmailToGetCode = (email) => {
  const fetchBody = JSON.stringify({ email });
  return fetch(`${END_POINT}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};
//надо добавить токен
const postToResetPassword = (inputDada) => {
  const fetchBody = JSON.stringify(inputDada);
  return fetch(`${END_POINT}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const getIngredientsFromState = (state) => state.ingredientsData;
const getConstructorData = (state) => state.constructorData;
const getConstructorModal = (state) => state.constructorModal;
const getIngredientsDataFromState = (state) => state.ingredientsData;
const getIngredientsModal = (state) => state.ingredientModal;
const getForgotPassword = (state) => state.forgotPassword;
const getResetPassword = (state) => state.resetPassword;
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
  postEmailToGetCode,
  getForgotPassword,
  postToResetPassword,
  getResetPassword,
};
