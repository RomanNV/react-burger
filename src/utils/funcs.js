const DATA_URL = "https://norma.nomoreparties.space/api/ingredients ";

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

const getOrder = async (arr, setError) => {
  const fetchBody = JSON.stringify({
    ingredients: arr,
  });
  try {
    const responce = await fetch(
      "https://norma.nomoreparties.space/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: fetchBody,
      }
    );
    if (!responce.ok) {
      throw new Error();
    }
    const dataOrder = await responce.json();
    return dataOrder.order.number;
  } catch (err) {
    setError(err);
  }
};

const getData = async (setData, setError) => {
  try {
    const responce = await fetch(DATA_URL);
    if (!responce.ok) {
      throw new Error();
    }
    const data = await responce.json();
    setData(data.data);
  } catch (err) {
    setError(err);
  }
};

export { getData, getBun, getOrder, getIngredients };
