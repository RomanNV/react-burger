import { setCookie, getCookie } from "../cookie/cookie.js";
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
const postToResetPassword = (data) => {
  const token = getCookie("accessToken");
  const fetchBody = { ...data, token };
  console.log(fetchBody);

  return fetch(`${END_POINT}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const registerNewUser = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetch(`${END_POINT}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const refreshToken = () => {
  return (
    fetch(`${END_POINT}auth/token`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(localStorage.getItem("refreshToken")),
    }.then(checkReponse)
  );
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
const login = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetch(`${END_POINT}auth/login`, {
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
const registerUser = (state) => state.registerUser;
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
  registerNewUser,
  registerUser,
  refreshToken,
  login,
};
