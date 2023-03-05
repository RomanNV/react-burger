import { setCookie, getCookie, deleteCookie } from "../cookie/cookie.js";
import {
  DATA_URL_INGREDIENTS,
  LOGIN_POINT,
  LOGOUT_POINT,
  ORDER_POINT,
  PASSWORD_RESET,
  REGISTER_POINT,
  SEND_CODE_TO_RESET,
  TOKEN_POINT,
  USER_POINT,
} from "./const.js";

const getDataIng = () => {
  return fetch(DATA_URL_INGREDIENTS);
};

const getDataOrder = (arr) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  return fetchWithRefresh(ORDER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken").trim(),
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
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        return Promise.reject(err);
      });
};

const postEmailToGetCode = (email) => {
  const fetchBody = JSON.stringify({ email });
  return fetch(PASSWORD_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};
const postToResetPassword = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetch(SEND_CODE_TO_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const registerNewUser = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetch(REGISTER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const refreshToken = () => {
  const fetchBody = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });
  return fetch(TOKEN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
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
      setCookie("accessToken", refreshData.accessToken.split("Bearer")[1]);
      options.headers.authorization =
        "Bearer" + " " + getCookie("accessToken").trim();
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
const getUser = () => {
  return fetchWithRefresh(USER_POINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken").trim(),
    },
  });
};
const login = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetch(LOGIN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};
const logOut = () => {
  const refreshToken = { token: localStorage.getItem("refreshToken") };
  const accessToken = getCookie("accessToken").trim();
  localStorage.removeItem("refreshToken");
  deleteCookie("accessToken");
  const fetchBody = JSON.stringify(refreshToken);
  return fetch(LOGOUT_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + accessToken,
    },
    body: fetchBody,
  }).then(checkReponse);
};

const changeUserData = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetchWithRefresh(USER_POINT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken").trim(),
    },
    body: fetchBody,
  });
};

const getIngredientsFromState = (state) => state.ingredientsData;
const getConstructorData = (state) => state.constructorData;
const getConstructorModal = (state) => state.constructorModal;
const getIngredientsDataFromState = (state) => state.ingredientsData;
const getIngredientsModal = (state) => state.ingredientModal;
const authState = (state) => state.auth;
const totalPriceState = (state) => state.totalPrice;
export {
  getDataIng,
  getDataOrder,
  getPrice,
  getIngredientsFromState,
  getConstructorData,
  getConstructorModal,
  getIngredientsDataFromState,
  getIngredientsModal,
  postEmailToGetCode,
  postToResetPassword,
  registerNewUser,
  refreshToken,
  login,
  getUser,
  logOut,
  authState,
  changeUserData,
  totalPriceState,
};
