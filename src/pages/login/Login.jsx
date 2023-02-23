import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../services/actions/auth";

const INITIALINPUT = { email: "", password: "" };
export const Login = () => {
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  console.log(user);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(inputData));
  };

  return (
    <>
      <AppHeader title={"Личный кабинет"} />
      <div className={styles.login_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <form className={styles.form_login}>
            <EmailInput
              onChange={onChange}
              value={inputData.email}
              name={"email"}
              isIcon={false}
            />
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
            extraClass={styles.enter_button}
            onClick={onSubmit}
          >
            Войти
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p className={` text text_type_main-default text_color_inactive`}>
            Вы новый пользователь?
            <Link to="/register">
              <a className={styles.a_link} href="">
                Зарегистрироваться
              </a>
            </Link>
          </p>
          <p className={` text text_type_main-default text_color_inactive`}>
            Забыли пароль?
            <Link to="/forgot-password">
              <a className={styles.a_link} href="">
                Восстановиnь пароль
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
