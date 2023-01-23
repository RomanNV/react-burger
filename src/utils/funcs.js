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

export { getData, getBun, getOrder, getIngredients };
