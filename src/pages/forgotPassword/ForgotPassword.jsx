import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./ForgotPassword.module.css";
import { getCodeToResetPassword } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../utils/funcs";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { LayoutWithHeader } from "../../components/LayoutWithHeader/LayoutWithHeader";

export const ForgotPassword = () => {
  const INITIALINPUT = { email: "" };
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const { error } = useSelector(authState);

  const dispatch = useDispatch();
  const onSuccess = () => {
    navigate("/reset-password", { state: { isForgotPasswordFlag: true } });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputData.email) {
      return;
    }
    dispatch(getCodeToResetPassword(inputData.email, onSuccess));
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <LayoutWithHeader>
      <div className={styles.forgot_password_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form className={styles.forgot_form} onSubmit={onSubmit}>
            <EmailInput
              onChange={onChange}
              value={inputData.email}
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
    </LayoutWithHeader>
  );
};
