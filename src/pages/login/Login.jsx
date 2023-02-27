import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../services/actions/auth";
import { authState } from "../../utils/funcs";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const Login = () => {
  const INITIALINPUT = { email: "", password: "" };
  const [inputData, setInputData] = useState(INITIALINPUT);
  const navigate = useNavigate();
  const location = useLocation();
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const { user, error } = useSelector(authState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(inputData));
  };

  useEffect(() => {
    if (user && location.state) {
      const from = location.state?.from;
      navigate(from);
      return;
    } else {
      if (user) {
        navigate("/");
      }
    }
  }, [user]);

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

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
