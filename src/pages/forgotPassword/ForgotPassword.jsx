import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./ForgotPassword.module.css";
import { getCodeToResetPassword } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { authState, getForgotPassword } from "../../utils/funcs";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const ForgotPassword = () => {
  const INITIALINPUT = { email: "" };
  const location = useLocation();
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const { error } = useSelector(authState);
  // const { error, isGetCodeToResetPassword, data } =
  //   useSelector(getForgotPassword);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputData.email) {
      return;
    }
    dispatch(getCodeToResetPassword(inputData.email));
    navigate("/reset-password", { state: { isForgotPasswordFlag: true } });
  };

  // useEffect(() => {
  //   if (isGetCodeToResetPassword) {
  //     navigate("/reset-password");
  //   }
  // }, [isGetCodeToResetPassword]);

  // if (error) {
  //   return <ErrorMessage error={error}></ErrorMessage>;
  // }

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
            <Link className={styles.a_link} to={"/login"}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
