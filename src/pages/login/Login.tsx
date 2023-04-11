import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../services/actions/auth";
import { authState } from "../../services/reducers/stateFuncs";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InitialLoginPage } from "../../types/commonTypes";

export const Login: React.FC = () => {
  const INITIALINPUT: InitialLoginPage = { email: "", password: "" };
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch<any>();
  const { error } = useSelector(authState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAction(inputData));
  };

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  return (
    <div className={styles.login_form}>
      <div className={styles.wrap_content_form}>
        <h1 className="text text_type_main-medium">Вход</h1>

        <form className={styles.form_login} onSubmit={onSubmit}>
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
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Вход
          </Button>
        </form>
      </div>
      <div className={styles.wrap_link}>
        <p className={` text text_type_main-default text_color_inactive`}>
          Вы новый пользователь?
          <Link className={styles.a_link} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className={` text text_type_main-default text_color_inactive`}>
          Забыли пароль?
          <Link to="/forgot-password" className={styles.a_link}>
            Восстановиnь пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
