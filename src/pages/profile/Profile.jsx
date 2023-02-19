import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Profile.module.css";
import { useLocation } from "react-router-dom";

export const Profile = () => {
  const location = useLocation();
  const [password, setPassword] = useState("password");
  const onChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <AppHeader />
      <div className={styles.box_container}>
        <div className={styles.flex_container}>
          <div className={styles.link_box}>
            <div className={styles.wrap_link}>
              <a
                href=""
                className={`${styles.a_link} text text_type_main-medium`}
              >
                Профиль
              </a>
              <a
                href=""
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                История заказов
              </a>
              <a
                href=""
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                Выход
              </a>
            </div>
            <p
              className={`${styles.footer_link_box} text text_type_main_small text_color_inactive`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>

          <div className={styles.wrap_content_form}>
            <form className={styles.profile_form}>
              <Input placeholder="Имя" icon="EditIcon"></Input>
              <Input placeholder="Логин" icon="EditIcon"></Input>

              <PasswordInput
                onChange={onChange}
                value={password}
                name={"password"}
                icon="EditIcon"
              ></PasswordInput>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
