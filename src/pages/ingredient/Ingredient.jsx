import { useSelector } from "react-redux";
import { getIngredientsDataFromState } from "../../utils/funcs";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";

export const Ingredient = () => {
  const { viewItem, dataIngredients } = useSelector(
    getIngredientsDataFromState
  );
  const navigate = useNavigate();
  let tempViewItem = viewItem;
  //если мы пршли не с главной страницы
  const { id } = useParams();
  if (Object.keys(viewItem).length === 0) {
    tempViewItem = dataIngredients.filter(({ _id }) => {
      return _id === id;
    })[0];
  }

  const closeModal = () => {
    navigate("/");
  };

  return (
    <Modal closeModal={closeModal}>
      <IngredientDetails {...tempViewItem}></IngredientDetails>
    </Modal>
  );
};
