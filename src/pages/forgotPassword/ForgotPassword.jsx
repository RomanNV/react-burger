import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./ForgotPassword.module.css";

export const ForgotPassword = () => {
  return (
    <>
      <AppHeader />
      <div className={styles.forgot_password_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form>
            <Input placeholder="Укажите E-mail"></Input>
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Восстановить
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p className={`${styles.p} text text_type_main-default`}>
            Вспомнили пароль? <a href="">Войти</a>
          </p>
        </div>
      </div>
    </>
  );
};
