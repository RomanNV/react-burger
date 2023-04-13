import { useSelector } from "react-redux";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { useMemo } from "react";
import { IngredientCard } from "../../types/commonTypes";

export const Ingredient = () => {
  const { viewItem, dataIngredients } = useSelector(
    getIngredientsDataFromState
  );
  const navigate = useNavigate();
  const { id } = useParams();

  //если мы пришли не с главной страницы
  const temparyViewItem: IngredientCard = useMemo(() => {
    if (Object.keys(viewItem).length === 0) {
      const filteredData: IngredientCard = dataIngredients.filter(
        ({ _id }: IngredientCard) => {
          return _id === id;
        }
      )[0];
      return filteredData;
    } else return viewItem;
  }, [viewItem, dataIngredients, id]);

  const closeModal = () => {
    navigate("/");
  };

  return (
    <Modal closeModal={closeModal}>
      <IngredientDetails {...temparyViewItem}></IngredientDetails>
    </Modal>
  );
};
