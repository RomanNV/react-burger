import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { getRequestToResetPassword } from "../../services/actions/auth";
import { authState } from "../../services/reducers/stateFuncs";
import styles from "./ResetPassword.module.css";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { InitialInputReset } from "../../types/commonTypes";

export const ResetPassword = () => {
  const INITIALINPUT: InitialInputReset = { password: "", token: "" };
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const { error } = useSelector(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const isForgotPasswordFlag = useLocation()?.state?.isForgotPasswordFlag;

  const onSuccess = () => {
    navigate("/login");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getRequestToResetPassword(inputData, onSuccess));
  };

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return isForgotPasswordFlag ? (
    <div className={styles.reset_password_form}>
      <div className={styles.wrap_content_form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={styles.reset_form} onSubmit={onSubmit}>
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
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.enter_button}
          >
            Сохранить
          </Button>
        </form>
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
  ) : (
    <Navigate to={"/forgot-password"} />
  );
};
