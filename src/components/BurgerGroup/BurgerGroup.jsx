import { BurgerIngredientsItem } from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerGroup.module.css";
import PropTypes from "prop-types";
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
              isCounter={isCounter}
              key={ingredient._id}
              {...ingredient}
            ></BurgerIngredientsItem>
          );
        })}
      </ul>
    </div>
  );
}

BurgerGroup.propTypes = {
  tabData: PropTypes.array,
  title: PropTypes.string,
  isCounter: PropTypes.bool,
};
