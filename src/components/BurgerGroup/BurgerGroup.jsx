import { BurgerIngredientsItem } from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerGroup.module.css";
import PropTypes from "prop-types";
import { propTypeData } from "../../utils/propTypeData.js";
export function BurgerGroup({ tabData, title, isCounter }) {
  return (
    <div className={styles.group_box}>
      <p className={`${styles.tab_title} text text_type_main-medium`}>
        {title}
      </p>
      <ul className={styles.ul_tab}>
        {tabData.map((ingredient) => {
          return (
            <BurgerIngredientsItem
              idItem={Math.random()}
              isCounter={isCounter}
              key={ingredient._id}
              ingredient={ingredient}
            ></BurgerIngredientsItem>
          );
        })}
      </ul>
    </div>
  );
}

// BurgerGroup.propTypes = {
//   tabData: PropTypes.arrayOf(PropTypes.shape(propTypeData)).isRequired,
//   title: PropTypes.string.isRequired,
//   isCounter: PropTypes.bool.isRequired,
//   toggleModal: PropTypes.func.isRequired,
//   getDataIngredient: PropTypes.func.isRequired,
// };
