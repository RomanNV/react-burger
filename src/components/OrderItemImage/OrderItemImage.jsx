import styles from "./OrderItemImage.module.css";
export const OrderItemImage = ({
  ingredient,
  index,
  zIndex,
  ingredientCount,
}) => {
  return (
    <div style={{ zIndex: `${zIndex}` }}>
      <div className={styles.white_grad} style={{ zIndex: `${zIndex}` }}>
        <img
          className={styles.img_icon}
          src={`${ingredient.image}`}
          width="112"
          height="56"
          alt=" ingredient"
        />
        {index === 5 && (
          <div className={styles.icon_count}>
            <p className={styles.text_style}>+{ingredientCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};
