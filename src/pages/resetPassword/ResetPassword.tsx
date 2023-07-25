import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/redux-hooks";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { getRequestToResetPassword } from "../../services/actions/auth";
import { authState } from "../../services/reducers/stateFuncs";
import styles from "./ResetPassword.module.css";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { InitialInputReset } from "../../types/commonTypes";
import { useForm } from "../../hooks/useForm";

export const ResetPassword = () => {
  const INITIALINPUT: InitialInputReset = { password: "", token: "" };
  const { values, handleChange } = useForm(INITIALINPUT);
  const { error } = useSelector(authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isForgotPasswordFlag = useLocation()?.state?.isForgotPasswordFlag;

  const onSuccess = () => {
    navigate("/login");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getRequestToResetPassword(values, onSuccess));
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
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
          ></PasswordInput>

          <Input
            placeholder="Введите код из письма"
            value={values.token}
            name={"token"}
            onChange={handleChange}
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
