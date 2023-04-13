import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./ForgotPassword.module.css";
import { getCodeToResetPassword } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../services/reducers/stateFuncs";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useForm } from "../../hooks/useForm";

export const ForgotPassword = () => {
  const INITIALINPUT: { email: "" } = { email: "" };
  const { values, handleChange } = useForm(INITIALINPUT);
  const navigate = useNavigate();
  const { error } = useSelector(authState);

  const dispatch = useDispatch<any>();
  const onSuccess = () => {
    navigate("/reset-password", { state: { isForgotPasswordFlag: true } });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email) {
      return;
    }
    dispatch(getCodeToResetPassword(values.email, onSuccess));
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className={styles.forgot_password_form}>
      <div className={styles.wrap_content_form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={styles.forgot_form} onSubmit={onSubmit}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
            placeholder="Укажите ваш E-mail"
          ></EmailInput>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Восстановить
          </Button>
        </form>
      </div>
      <div className={styles.wrap_link}>
        <p
          className={`${styles.p} text text_type_main-default text_color_inactive`}
        >
          Вспомнили пароль?
          <Link className={styles.a_link} to={"/login"}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
