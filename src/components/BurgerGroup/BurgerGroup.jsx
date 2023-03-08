import { BurgerIngredientsItem } from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerGroup.module.css";
import PropTypes from "prop-types";
import { propTypeData } from "../../utils/propTypeData.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
export function BurgerGroup({ tabData, title }) {
  //состояние для сохранения id булки
  const [bunId, setBunId] = useState("");

  const { isDataIngredientsRequest } = useSelector(
    (state) => state.ingredientsData
  );

  return (
    <div className={styles.group_box}>
      <p className={`${styles.tab_title} text text_type_main-medium`}>
        {title}
      </p>
      <ul className={styles.ul_tab}>
        {tabData.map((ingredient) => {
          if (isDataIngredientsRequest) {
            return <Loader></Loader>;
          }
          return (
            <BurgerIngredientsItem
              key={ingredient._id}
              setBunId={setBunId}
              bunId={bunId}
              ingredient={ingredient}
            ></BurgerIngredientsItem>
          );
        })}
      </ul>
    </div>
  );
}

BurgerGroup.propTypes = {
  tabData: PropTypes.arrayOf(PropTypes.shape(propTypeData)).isRequired,
  title: PropTypes.string.isRequired,
};
