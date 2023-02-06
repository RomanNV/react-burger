import { getDataIng } from "../../utils/funcs";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_VIEW_ITEM = "GET_VIEW_ITEM";

export const getIngredientsData = () => {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getDataIng()
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: GET_INGREDIENTS_FAILED, error: "Ишибка сервера!" });
        }
        return res.json();
      })
      .then((responceData) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: responceData.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_FAILED, error: err.message });
      });
  };
};
