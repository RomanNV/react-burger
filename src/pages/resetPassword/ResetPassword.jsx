import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/AppHeader/AppHeader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { getRequestToResetPassword } from "../../services/actions/auth";
import { authState } from "../../utils/funcs";
import styles from "./ResetPassword.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const INITIALINPUT = { password: "", token: "" };
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const { error, isResetPassword } = useSelector(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isCheckForgotPage = location?.state?.isCheckForgotPage;

  useEffect(() => {
    if (!isCheckForgotPage) {
      navigate("/forgot-password");
    }
    if (isResetPassword) {
      navigate("/login");
    }
  }, [isCheckForgotPage, isResetPassword]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getRequestToResetPassword(inputData));
  };

  if (error) {
    return <ErrorMessage error={error.message}></ErrorMessage>;
  }
  return (
    <>
      <AppHeader title={"Личный кабинет"} />
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
            <Link className={styles.a_link} to={"/login"}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
