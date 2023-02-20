import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./ForgotPassword.module.css";
const INITIALINPUT = { email: "" };

export const ForgotPassword = () => {
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
      <AppHeader />
      <div className={styles.forgot_password_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form className={styles.forgot_form}>
            <EmailInput
              onChange={onChange}
              value={inputData.email}
              name={"email"}
              isIcon={false}
              placeholder="Укажите ваш E-mail"
            ></EmailInput>
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onSubmit}
            extraClass={styles.enter_button}
          >
            Восстановить
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p
            className={`${styles.p} text text_type_main-default text_color_inactive`}
          >
            Вспомнили пароль?
            <a className={styles.a_link} href="">
              Войти
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
