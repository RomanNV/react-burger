import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { BurgerBunBottom } from "../BurgerBunBottom/BurgerBunBottom";
import { BurgerBunTop } from "../BurgerBunTop/BurgerBunTop";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { propTypeData } from "../../utils/propTypeData.js";
import PropTypes from "prop-types";

export const BurgerConstructor = ({ dataProps, isOpenModal, toggleModal }) => {
  const data = dataProps;
  let tempBun = [];

  data.forEach((element, index) => {
    if (element.type === "bun") {
      tempBun.push(index);
    }
  });

  return (
    <>
      <Modal isOpenModal={isOpenModal} toggleModal={toggleModal}>
        <OrderDetails
          toggleModal={toggleModal}
          orderNum="034536"
        ></OrderDetails>
      </Modal>
      <section className={styles.content_box}>
        <div className={styles.burger_box}>
          <div className={styles.div_box_fixed}>
            <BurgerBunTop
              isLocked={true}
              {...data[tempBun.shift()]}
            ></BurgerBunTop>
          </div>

          <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
            {data.map(({ _id, image, name, price, type }) => {
              if (type === "bun") {
                return;
              }
              return (
                <li key={_id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                  ></ConstructorElement>
                </li>
              );
            })}
          </ul>
          <div className={styles.div_box_fixed}>
            <BurgerBunBottom
              isLocked={true}
              {...data[tempBun.shift()]}
            ></BurgerBunBottom>
          </div>
        </div>

        <div className={styles.button_container}>
          <span className={styles.price_box}>
            <p className="text text_type_main-large">610</p>
            <CurrencyIcon className={styles.icon} type="primary" />
          </span>
          <Button
            onClick={() => toggleModal()}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  dataProps: PropTypes.arrayOf(PropTypes.shape(propTypeData)).isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
};
