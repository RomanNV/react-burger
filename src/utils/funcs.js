import { DATA_URL } from "./const.js";
import { requestData } from "./requestData.js";

const getIngredients = (data) => {
  return data.filter((item) => {
    return item.type !== "bun";
  });
};

const getBun = (data) => {
  return data.filter((item) => {
    return item.type === "bun";
  })[0];
};

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

const getData = () => {
  return requestData(`${DATA_URL}ingredients`);
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
export {
  getData,
  getBun,
  getOrder,
  getIngredients,
  getDataIng,
  getDataOrder,
  getPrice,
};
