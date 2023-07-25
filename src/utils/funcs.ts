import { setCookie, getCookie, deleteCookie } from "../cookie/cookie";
import {
  getIngredients,
  getOrder,
  GetOrderData,
  IngredientCard,
  IngredientCardWithCounter,
  IngredientCardWithId,
  InitialInputProfile,
  InitialInputRegister,
  InitialInputReset,
  InitialLoginPage,
  OrderItemWithCounter,
  OrderParams,
  UserAuth,
} from "../types/commonTypes";
import {
  BASE_URL,
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

<<<<<<< HEAD
function checkReponce<T>(res: Response): Promise<T> {
  return res.ok
    ? (res.json() as Promise<T>)
    : (res.json() as Promise<Error>).then((err) => {
        return Promise.reject(err);
      });
}

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }

  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(res);
};

function request<T>(endpoint: string, options?: any): Promise<T> {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkReponce)
    .then(checkSuccess);
}

const refreshToken = (): any => {
  const fetchBody = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });

=======
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
>>>>>>> master
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
<<<<<<< HEAD
    return await request<T>(url, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split("Bearer")[1], {});
=======
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
>>>>>>> master
      options = {
        ...options,
        headers: {
          ...options?.headers,
          authorization: "Bearer" + " " + getCookie("accessToken")?.trim(),
        },
      };
<<<<<<< HEAD

      return await request(url, options); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
=======
      return await request(url, options); //повторяем запрос
    } else {
      console.log(err);

      return Promise.reject(err);
    }
  }
};
const getDataIng = (): Promise<Response> => {
  return request(DATA_URL_INGREDIENTS);
>>>>>>> master
};

const getDataIng = () => {
  return request<getIngredients>(DATA_URL_INGREDIENTS);
};

const getChoosenOrder = (number: number) => {
  return request<GetOrderData>(`orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};
const getDataOrder = (arr: string[]) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  return fetchWithRefresh<getOrder>(ORDER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///delete trim
    },
    body: fetchBody,
  });
};

const getPrice = (arr: IngredientCardWithId[]): number => {
  //replace заглушку
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

const postEmailToGetCode = (email: string) => {
  const fetchBody = JSON.stringify({ email });
  return request<UserAuth["postEmailToReset"]>(PASSWORD_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};
const postToResetPassword = (data: InitialInputReset) => {
  const fetchBody = JSON.stringify(data);
  return request<UserAuth["resetPassword"]>(SEND_CODE_TO_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

const registerNewUser = (data: InitialInputRegister) => {
  const fetchBody = JSON.stringify(data);
  return request<UserAuth["getUserWithToken"]>(REGISTER_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};

<<<<<<< HEAD
const getUser = () => {
  return fetchWithRefresh<UserAuth["getUser"]>(USER_POINT, {
=======
const getUser = (): Promise<Response> => {
  return fetchWithRefresh(USER_POINT, {
>>>>>>> master
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///deleted trim
    },
  });
};
const login = (data: InitialLoginPage) => {
  const fetchBody = JSON.stringify(data);
  return request<UserAuth["getUserWithToken"]>(LOGIN_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: fetchBody,
  });
};
const logOut = () => {
  const refreshToken = { token: localStorage.getItem("refreshToken") };
  const accessToken = getCookie("accessToken")?.trim(); ///delete trim
  localStorage.removeItem("refreshToken");
  deleteCookie("accessToken");
  const fetchBody = JSON.stringify(refreshToken);
  return request<UserAuth["logout"]>(LOGOUT_POINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + accessToken,
    },
    body: fetchBody,
  });
};

const changeUserData = (data: InitialInputProfile) => {
  const fetchBody = JSON.stringify(data);
  return fetchWithRefresh<UserAuth["getUser"]>(USER_POINT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer" + " " + getCookie("accessToken")?.trim(), ///deleted trim
    },
    body: fetchBody,
  });
};
const getIngredientsArrayFromOrder = (
  arr1: Array<string>,
  arr2: IngredientCard[]
): IngredientCard[] => {
  const reducerArr = arr1.reduce((summ: any, ingredientId: string) => {
    const orderItem = arr2.find((item: IngredientCard) => {
      return item._id === ingredientId;
    });
    return [...summ, orderItem];
  }, []);
  return reducerArr;
};
const getIngredientsOrderWithCounter = (
  arr1: Array<OrderItemWithCounter>,
  arr2: IngredientCard[]
): Array<IngredientCardWithCounter> => {
  const reducerArr = arr1.reduce(
    (summ: any, orderItemWithCounter: OrderItemWithCounter) => {
      const orderItem = arr2.find((item: IngredientCard) => {
        return item._id === orderItemWithCounter.item;
      });
      return [...summ, { ...orderItem, counter: orderItemWithCounter.count }];
    },
    []
  );
  return reducerArr;
};

const getOrderParams = (
  createdAt: string,
  status: string,
  isOrder?: boolean
): OrderParams => {
  const dateOfOrder = new Date(createdAt);

  const getDataOrderInMillis = dateOfOrder.getTime();
  const howMathDayAfterCreatedOrder = Math.floor(
    (new Date().getTime() - getDataOrderInMillis) / 86400000
  );
  const nameDay =
    howMathDayAfterCreatedOrder === 0
      ? "сегодня"
      : howMathDayAfterCreatedOrder === 1
      ? "вчера"
      : howMathDayAfterCreatedOrder === 2
      ? "позавчера"
      : 2 < howMathDayAfterCreatedOrder && howMathDayAfterCreatedOrder <= 4
      ? `${howMathDayAfterCreatedOrder} дня назад`
      : howMathDayAfterCreatedOrder >= 4
      ? `${howMathDayAfterCreatedOrder} дней назад`
      : null;
  const currentStatus =
    status === "done"
      ? "Выполнен"
      : status === "created"
      ? "Готовится"
      : "Отменен";
  const dateString = `${nameDay}, ${dateOfOrder.getHours()}:${dateOfOrder.getMinutes()} ${
    isOrder ? "" : "i-GMT+3"
  }`;
  return { currentStatus: currentStatus, dateString: dateString };
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
  getIngredientsArrayFromOrder,
  getOrderParams,
  getChoosenOrder,
  getIngredientsOrderWithCounter,
};
