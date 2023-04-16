export const logger = (store) => {
  console.log(store);
  return (next) => {
    console.log(next);
    return (action) => {
      console.group(action.type);
      console.info("dispatching", action);
      let result = next(action);
      console.log("next state", store.getState());
      console.groupEnd(action.type);
      return result;
    };
  };
};

const aa = JSON.stringify({
  success: true,
  name: "Флюоресцентный бургер",
  order: {
    ingredients: [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
    ],
    _id: "643c532e0905fd001b62aa5d",
    owner: {
      name: "wwwwrfsssssssss",
      email: "romanosow@mail.ru",
      createdAt: "2023-02-18T12:19:12.678Z",
      updatedAt: "2023-04-16T19:48:57.760Z",
    },
    status: "done",
    name: "Флюоресцентный бургер",
    createdAt: "2023-04-16T19:57:34.296Z",
    updatedAt: "2023-04-16T19:57:34.886Z",
    number: 49064,
    price: 988,
  },
});
