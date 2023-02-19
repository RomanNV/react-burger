import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./ResetPassword.module.css";

export const ResetPassword = () => {
  const [password, setPassword] = useState();
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.reset_password_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form>
            <PasswordInput
              onChange={onChange}
              value={password}
              name={"password"}
              extraClass="mb-2"
            ></PasswordInput>

            <Input placeholder="Введите код из письма"></Input>
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Сохранить
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p className={`${styles.p} text text_type_main-default`}>
            Вспомнили пароль?{" "}
            <a className={styles.a_link} href="">
              Войти
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
