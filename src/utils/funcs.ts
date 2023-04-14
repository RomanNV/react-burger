import { setCookie, getCookie, deleteCookie } from "../cookie/cookie";
import {
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
// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((res) => {
        if (res && res.success) {
          return res;
        } else {
          return Promise.reject(res.message);
        }
      });

  // не забываем выкидывать ошибку, чтобы она попала в `catch`
};

// создаем функцию проверки на `success`
// const checkSuccess = (res: any) => {
//   if (res && res.success) {
//     return res;
//   }
//   // не забываем выкидывать ошибку, чтобы она попала в `catch`
//   return Promise.reject(`Ответ не success: ${res}`);
// };

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
const request = (endpoint: string, options?: any) => {
  console.log("in request");

  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
  // .then(checkSuccess);
};
const refreshToken = () => {
  console.log("i am in refresh");

  const fetchBody = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });
  return request(TOKEN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const newReq = await request(url, options);
    console.log(newReq);

    return newReq;
  } catch (err: any) {
    console.log("i am in catch");

    if (err === "jwt expired") {
      console.log("jwt expired");

      const refreshData = await refreshToken(); //обновляем токен

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", "", refreshData.accessToken.split("Bearer")[1]);
      options = {
        ...options,
        headers: {
          ...options?.headers,
          authorization: "Bearer" + " " + getCookie("accessToken")?.trim(),
        },
      };
      return await request(url, options); //повторяем запрос
    } else {
      console.log(err);

      return Promise.reject(err);
    }
  }
};
const getDataIng = (): Promise<Response> => {
  return request(DATA_URL_INGREDIENTS);
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

const postEmailToGetCode = (email: string): Promise<Response> => {
  const fetchBody = JSON.stringify({ email });
  return request(PASSWORD_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};
const postToResetPassword = (data: InitialInputReset): Promise<Response> => {
  const fetchBody = JSON.stringify(data);
  return request(SEND_CODE_TO_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

const registerNewUser = (data: InitialInputRegister): Promise<Response> => {
  const fetchBody = JSON.stringify(data);
  return request(REGISTER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
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
  return request(LOGIN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};
const logOut = (): Promise<Response> => {
  const refreshToken = { token: localStorage.getItem("refreshToken") };
  const accessToken = getCookie("accessToken")?.trim(); ///delete trim
  localStorage.removeItem("refreshToken");
  deleteCookie("accessToken");
  const fetchBody = JSON.stringify(refreshToken);
  return request(LOGOUT_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + accessToken,
    },
    body: fetchBody,
  });
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

export {
  getDataIng,
  getDataOrder,
  getPrice,
  postEmailToGetCode,
  postToResetPassword,
  registerNewUser,
  refreshToken,
  login,
  getUser,
  logOut,
  changeUserData,
};
