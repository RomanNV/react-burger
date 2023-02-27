import {
  Input,
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./RegisterPage.module.css";
import { authState } from "../../utils/funcs";
import { Link } from "react-router-dom";
import { registerNewUserAction } from "../../services/actions/auth";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
export const RegisterPage = () => {
  const INITIALINPUT = { email: "", password: "", name: "" };
  const { error, user } = useSelector(authState);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerNewUserAction(inputData));
    setInputData(INITIALINPUT);
  };
  if (error) {
    return <ErrorMessage error={error.message}></ErrorMessage>;
  }
  return (
    <>
      <AppHeader title={"Личный кабинет"} />
      <div className={styles.register_box}>
        <div className={styles.wrap_content_form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <form className={styles.register_form}>
            <Input
              placeholder="Имя"
              name="name"
              value={inputData.name}
              onChange={onChange}
            ></Input>
            <EmailInput
              onChange={onChange}
              value={inputData.email}
              name={"email"}
              isIcon={false}
            ></EmailInput>

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
            onClick={onSubmit}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.wrap_link}>
          <p className={` text text_type_main-default text_color_inactive`}>
            Уже зарегистрированы?{" "}
            <Link to="/login">
              <a className={styles.a_link} href="">
                Войти
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
