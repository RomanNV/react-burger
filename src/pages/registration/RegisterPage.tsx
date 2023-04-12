import {
  Input,
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RegisterPage.module.css";
import { authState } from "../../services/reducers/stateFuncs";
import { Link } from "react-router-dom";
import { registerNewUserAction } from "../../services/actions/auth";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InitialInputRegister } from "../../types/commonTypes";
import { useForm } from "../../hooks/useForm";
export const RegisterPage = () => {
  const INITIALINPUT: InitialInputRegister = {
    email: "",
    password: "",
    name: "",
  };
  const { error } = useSelector(authState);
  const dispatch = useDispatch<any>();
  const { values, handleChange, setValues } = useForm(INITIALINPUT);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerNewUserAction(values));
    setValues(INITIALINPUT);
  };
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return (
    <div className={styles.register_box}>
      <div className={styles.wrap_content_form}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <form className={styles.register_form} onSubmit={onSubmit}>
          <Input
            placeholder="Имя"
            name="name"
            value={values.name}
            onChange={handleChange}
          ></Input>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            isIcon={false}
          ></EmailInput>

          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
          />
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>
      </div>
      <div className={styles.wrap_link}>
        <p className={` text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.a_link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
