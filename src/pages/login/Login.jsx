import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Login.module.css";

export const Login = () => {
  const [password, setPassword] = useState();
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.login_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <form className={styles.form_login}>
            <Input placeholder="E-mail"></Input>
            <PasswordInput
              onChange={onChange}
              value={password}
              name={"password"}
              extraClass="mb-2"
            />
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
          <p className={` text text_type_main-default text_color_inactive`}>
            Вы новый пользователь?{" "}
            <a className={styles.a_link} href="">
              Зарегистрироваться
            </a>
          </p>
          <p className={` text text_type_main-default text_color_inactive`}>
            Забыли пароль?{" "}
            <a className={styles.a_link} href="">
              Восстановиnь пароль
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
