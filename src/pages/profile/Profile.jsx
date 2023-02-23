import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Profile.module.css";
import { useLocation, Link } from "react-router-dom";

const INITIALINPUT = { login: "", password: "", name: "" };
export const Profile = () => {
  const location = useLocation();

  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    ///надо доделать
  };
  return (
    <>
      <AppHeader title={"Профиль"} />
      <div className={styles.box_container}>
        <div className={styles.flex_container}>
          <div className={styles.link_box}>
            <div className={styles.wrap_link}>
              <Link
                className={`${styles.a_link} text text_type_main-medium ${
                  location.pathname === "/profile" ? styles.a_link_active : null
                }`}
              >
                Профиль
              </Link>
              <Link
                to={"/profile/orders "}
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                История заказов
              </Link>

              <Link
                to={"/profile/orders/:id"}
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                Выход
              </Link>
            </div>
            <p
              className={`${styles.footer_link_box} text text_type_main_small text_color_inactive `}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>

          <div className={styles.wrap_content_form}>
            <form className={styles.profile_form}>
              <Input
                onChange={onChange}
                placeholder="Имя"
                icon="EditIcon"
                name="name"
                value={inputData.name}
              ></Input>
              <Input
                onChange={onChange}
                placeholder="Логин"
                name="login"
                icon="EditIcon"
                value={inputData.login}
              ></Input>

              <PasswordInput
                onChange={onChange}
                value={inputData.password}
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
