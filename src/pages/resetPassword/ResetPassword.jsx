import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/AppHeader/AppHeader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { getRequestToResetPassword } from "../../services/actions/resetPassword";
import { getResetPassword } from "../../utils/funcs";
import styles from "./ResetPassword.module.css";

const INITIALINPUT = { password: "", token: "" };
//пока вставил токин для отладки, затем надо будет его получать из cookie

export const ResetPassword = () => {
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const { error, isGetCodeToResetPassword } = useSelector(getResetPassword);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getRequestToResetPassword(inputData));
  };
  if (error) {
    return <ErrorMessage error={error.message}></ErrorMessage>;
  }
  return (
    <>
      <AppHeader />
      <div className={styles.reset_password_form}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form className={styles.reset_form}>
            <PasswordInput
              onChange={onChange}
              value={inputData.password}
              name={"password"}
              extraClass="mb-2"
            ></PasswordInput>

            <Input
              placeholder="Введите код из письма"
              value={inputData.token}
              name={"token"}
              onChange={onChange}
            ></Input>
          </form>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
            onClick={onSubmit}
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
