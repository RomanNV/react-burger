import { useSelector } from "react-redux";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { useEffect, useMemo, useState } from "react";
import {
  IngredientCard,
  IngredientCardWithToggleModal,
} from "../../types/commonTypes";

export const Ingredient = () => {
  const { viewItem, dataIngredients } = useSelector(
    getIngredientsDataFromState
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [isNotModal, setIsNotModal] = useState(false);

  //если мы пришли не с главной страницы
  const temparyViewItem: IngredientCard = useMemo(() => {
    if (viewItem === null) {
      const filteredData: IngredientCard = dataIngredients.filter(
        ({ _id }: IngredientCard) => {
          return _id === id;
        }
      )[0];
      setIsNotModal(true);
      return filteredData;
    } else {
      setIsNotModal(false);
      return viewItem;
    }
  }, [viewItem, dataIngredients, id]);

  useEffect(() => {
    if (isNotModal) navigate(`/ingredients/${id}`);
  }, [setIsNotModal]);

  const temparyViewItemWithToggleModal: IngredientCardWithToggleModal = {
    ...temparyViewItem,
    isNotModal,
  };

  const closeModal = () => {
    navigate("/");
  };

  return isNotModal ? (
    <IngredientDetails {...temparyViewItemWithToggleModal}></IngredientDetails>
  ) : (
    <Modal closeModal={closeModal}>
      <IngredientDetails
        {...temparyViewItemWithToggleModal}
      ></IngredientDetails>
    </Modal>
  );
};
