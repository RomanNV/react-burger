import {
  Input,
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./RegisterPage.module.css";
const INITIALINPUT = { email: "", password: "", name: "" };
export const RegisterPage = () => {
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setInputData(INITIALINPUT);
  };

  return (
    <>
      <AppHeader />
      <div className={styles.register_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <form className={styles.register_forms}>
            <Input
              placeholder="Имя"
              name="name"
              value={inputData.name}
              onChange={onChange}
            ></Input>
            <EmailInput
              onChange={onChange}
              value={inputData.email}
              name={"email"}
              isIcon={false}
            ></EmailInput>

            <PasswordInput
              onChange={onChange}
              value={inputData.password}
              name={"password"}
              extraClass="mb-2"
            />
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onSubmit}
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
