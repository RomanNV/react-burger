import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderItem.module.css";
export const OrderItem = ({ image, counter, price, name }) => {
  return (
    <div className={styles.ingredient_list_wrap}>
      <div className={styles.white_grad}>
        <img
          className={styles.img_icon}
          src={`${image}`}
          width="112"
          height="56"
          alt=" ingredient"
        />
      </div>

      <div className={`text text_type_main-default ${styles.ingredient_name}`}>
        {name}
      </div>
      <div className={`p-1 ${styles.price_box}`}>
        <p className="text text_type_digits-default">{counter}</p>
        <div>X</div>
        <CurrencyIcon type="primary" />
        <span className="text text_type_digits-default">{price}</span>
      </div>
    </div>
  );
};
