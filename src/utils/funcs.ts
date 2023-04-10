import { setCookie, getCookie, deleteCookie } from "../cookie/cookie";
import {
  IngredientCard,
  IngredientCardWithId,
  InitialInputProfile,
  InitialInputRegister,
  InitialInputReset,
  InitialLoginPage,
} from "../types/commonTypes";
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
} from "./const";

const getDataIng = (): Promise<Response> => {
  return fetch(DATA_URL_INGREDIENTS);
};

const getDataOrder = (arr: string[]) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  return fetchWithRefresh(ORDER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///delete trim
    },
    body: fetchBody,
  });
};

const getPrice = (arr: IngredientCardWithId[]) => {
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

const checkReponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        return Promise.reject(err);
      });
};

const postEmailToGetCode = (email: string): Promise<Response> => {
  const fetchBody = JSON.stringify({ email });
  return fetch(PASSWORD_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};
const postToResetPassword = (data: InitialInputReset): Promise<Response> => {
  const fetchBody = JSON.stringify(data);
  return fetch(SEND_CODE_TO_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};

const registerNewUser = (data: InitialInputRegister): Promise<Response> => {
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

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", "", refreshData.accessToken.split("Bearer")[1]);
      options = {
        ...options,
        headers: {
          ...options?.headers,
          authorization: "Bearer" + " " + getCookie("accessToken")?.trim(),
        },
      }; ///delete trim
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
const getUser = (): Promise<Response> => {
  return fetchWithRefresh(USER_POINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///deleted trim
    },
  });
};
const login = (data: InitialLoginPage): Promise<Response> => {
  const fetchBody = JSON.stringify(data);
  return fetch(LOGIN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  }).then(checkReponse);
};
const logOut = (): Promise<Response> => {
  const refreshToken = { token: localStorage.getItem("refreshToken") };
  const accessToken = getCookie("accessToken")?.trim(); ///delete trim
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

const changeUserData = (data: InitialInputProfile): Promise<Response> => {
  const fetchBody = JSON.stringify(data);
  return fetchWithRefresh(USER_POINT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///deleted trim
    },
    body: fetchBody,
  });
};

const getIngredientsFromState = (state: any) => state.ingredientsData;
const getConstructorData = (state: any) => state.constructorData;
const getConstructorModal = (state: any) => state.constructorModal;
const getIngredientsDataFromState = (state: any) => state.ingredientsData;
const getIngredientsModal = (state: any) => state.ingredientModal;
const authState = (state: any) => state.auth;
const totalPriceState = (state: any) => state.totalPrice;
const ingredientsDataState = (state: any) => state.ingredientsData;
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
  ingredientsDataState,
};
