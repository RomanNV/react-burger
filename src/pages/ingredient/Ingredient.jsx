import { useSelector } from "react-redux";
import { getIngredientsDataFromState } from "../../utils/funcs";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { useMemo } from "react";

export const Ingredient = () => {
  const { viewItem, dataIngredients } = useSelector(
    getIngredientsDataFromState
  );
  const navigate = useNavigate();
  const { id } = useParams();

  //если мы пришли не с главной страницы
  const temparyViewItem = useMemo(() => {
    if (Object.keys(viewItem).length === 0) {
      const filteredData = dataIngredients.filter(({ _id }) => {
        return _id === id;
      })[0];
      return filteredData;
    } else return viewItem;
  }, [viewItem, dataIngredients]);

  const closeModal = () => {
    navigate("/");
  };

  return (
    <Modal closeModal={closeModal}>
      <IngredientDetails {...temparyViewItem}></IngredientDetails>
    </Modal>
  );
};
