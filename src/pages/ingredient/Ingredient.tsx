import { useSelector } from "react-redux";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { useMemo } from "react";
import {
  IngredientCard,
  IngredientCardWithToggleModal,
  IsNotModal,
} from "../../types/commonTypes";

export const Ingredient: React.FC<IsNotModal> = ({
  isNotModal,
}): JSX.Element => {
  const { viewItem, dataIngredients } = useSelector(
    getIngredientsDataFromState
  );
  const { id } = useParams();

  //если мы пришли не с главной страницы
  const temparyViewItem: IngredientCard = useMemo(() => {
    if (viewItem === null) {
      const filteredData: IngredientCard = dataIngredients.filter(
        ({ _id }: IngredientCard) => {
          return _id === id;
        }
      )[0];
      return filteredData;
    } else {
      return viewItem;
    }
  }, [viewItem, dataIngredients, id]);

  const temparyViewItemWithToggleModal: IngredientCardWithToggleModal = {
    ...temparyViewItem,
    isNotModal,
  };

  return (
    <IngredientDetails {...temparyViewItemWithToggleModal}></IngredientDetails>
  );
};
