import {
  Input,
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const [password, setPassword] = useState();
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <div className={styles.register_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <form>
            <Input placeholder="Имя"></Input>
            <EmailInput
              onChange={onChangeEmail}
              value={email}
              name={"email"}
              isIcon={false}
            ></EmailInput>

            <PasswordInput
              onChange={onChangePassword}
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
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p className={` text text_type_main-default text_color_inactive`}>
            Уже зарегистрированы?{" "}
            <a className={styles.a_link} href="">
              Войти
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
