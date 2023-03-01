import { setCookie, getCookie, deleteCookie } from "../cookie/cookie.js";
import { DATA_URL, END_POINT } from "./const.js";
import { requestData } from "./requestData.js";

const getDataIng = () => {
  return fetch(`${DATA_URL}ingredients`);
};

const getDataOrder = (arr) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  return fetchWithRefresh(`${DATA_URL}orders`, {
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
        console.log(err, "in reponse error");
        return Promise.reject(err);
      });
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
const postToResetPassword = (data) => {
  const fetchBody = JSON.stringify(data);
  console.log(data);
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
  console.log("in refresh token");
  const fetchBody = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });
  console.log("refresh token", fetchBody);

  return fetch(`${END_POINT}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    console.log("in fetchrefresh");
    const res = await fetch(url, options);
    console.log("step 1");
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      console.log(refreshData.refreshToken);
      console.log(refreshData.accessToken.split("Bearer")[1]);
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
//пока поменял на get запрос
const getUser = () => {
  console.log("in getuser");
  return fetchWithRefresh(`${END_POINT}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken").trim(),
    },
  });
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
const logOut = () => {
  const refreshToken = { token: localStorage.getItem("refreshToken") };
  const accessToken = getCookie("accessToken").trim();
  localStorage.removeItem("refreshToken");
  deleteCookie("accessToken");
  const fetchBody = JSON.stringify(refreshToken);
  return fetch(`${END_POINT}auth/logout`, {
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
  console.log("in changeUserData");
  return fetchWithRefresh(`${END_POINT}auth/user`, {
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
