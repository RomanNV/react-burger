import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Login.module.css";

export const Login = () => {
  const [show, setShow] = useState(false);
  const iconClick = () => {
    setShow(!show);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.login_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <form>
            <Input placeholder="E-mail"></Input>
            <Input
              placeholder="Пароль"
              icon={show ? "ShowIcon" : "HideIcon"}
              onIconClick={iconClick}
            ></Input>
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Войти
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p>Вы новый пользователь? Зарегистрироваться</p>
          <p>Забыли пароль? Восстановиь пароль</p>
        </div>
      </div>
    </>
  );
};
