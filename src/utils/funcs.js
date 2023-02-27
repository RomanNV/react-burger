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
const postToResetPassword = (data) => {
  const fetchBody = JSON.stringify(data);
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
  console.log(JSON.stringify(localStorage.getItem("refreshToken")));
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
    console.log("in fetchrefresh");
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    console.log(err);
    if (err.message === "jwt expired") {
      console.log("reftoken");
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
//пока поменял на get запрос
const getUser = () => {
  console.log("ingetuser");
  return fetchWithRefresh(`${END_POINT}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer" + " " + getCookie("accessToken").trim(),
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
  const fetchBody = JSON.stringify(refreshToken);
  return fetchWithRefresh(`${END_POINT}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer" + " " + getCookie("accessToken").trim(),
    },
    body: fetchBody,
  });
};

const changeUserData = (data) => {
  const fetchBody = JSON.stringify(data);
  return fetchWithRefresh(`${END_POINT}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer" + " " + getCookie("accessToken").trim(),
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
  postToResetPassword,
  registerNewUser,
  refreshToken,
  login,
  getUser,
  logOut,
  authState,
  changeUserData,
};
