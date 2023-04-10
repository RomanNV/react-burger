import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../utils/funcs";
import {
  changeUserDataAction,
  logOutAction,
} from "../../services/actions/auth";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { LayoutWithHeader } from "../../components/LayoutWithHeader/LayoutWithHeader";
import { InitialInputProfile } from "../../types/commonTypes";

export const Profile: React.FC = () => {
  const location = useLocation();
  const state = useSelector(authState);
  const { user, error } = state;
  const dispatch = useDispatch<any>();

  const INITIALINPUT: InitialInputProfile = {
    login: user?.email,
    password: "",
    name: user?.name,
    isShowButon: false,
  };
  const [prevInput, setPrevInput] = useState<InitialInputProfile>(INITIALINPUT);
  const [inputData, setInputData] = useState<InitialInputProfile>(INITIALINPUT);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
      isShowButon: true,
    });
  };
  useEffect(() => {
    setPrevInput({
      ...INITIALINPUT,
      login: user?.email,
      password: "",
      name: user?.name,
    });
  }, [user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeUserDataAction(inputData));
    setInputData({
      ...inputData,
      isShowButon: false,
      password: "",
    });
  };
  const onCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setInputData({
      ...prevInput,
      isShowButon: false,
    });
  };

  const logOut = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logOutAction());
  };

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  //отрисовка вложенного маршрута
  if (location.pathname === "/profile/orders") {
    return <Outlet></Outlet>;
  }

  return (
    <LayoutWithHeader>
      <div className={styles.box_container}>
        <div className={styles.flex_container}>
          <div className={styles.link_box}>
            <div className={styles.wrap_link}>
              <Link
                className={`${styles.a_link} text text_type_main-medium ${
                  location.pathname === "/profile" ? styles.a_link_active : null
                }`}
                to={""}
              >
                Профиль{" "}
              </Link>
              <Link
                to={"orders "}
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                История заказов
              </Link>

              <Link
                to={"/"}
                onClick={logOut}
                className={`${styles.a_link} text text_type_main-medium text_color_inactive`}
              >
                Выход
              </Link>
            </div>
            <p
              className={`${styles.footer_link_box} text text_type_main_small text_color_inactive `}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>

          <div className={styles.wrap_content_form}>
            <form className={styles.profile_form} onSubmit={onSubmit}>
              <Input
                onChange={onChange}
                placeholder="Имя"
                icon="EditIcon"
                name="name"
                value={inputData.name}
              ></Input>
              <Input
                onChange={onChange}
                placeholder="Логин"
                name="login"
                icon="EditIcon"
                value={inputData.login}
              ></Input>

              <PasswordInput
                onChange={onChange}
                value={inputData.password}
                name={"password"}
                icon="EditIcon"
              ></PasswordInput>
              {inputData.isShowButon ? (
                <>
                  <Button htmlType="submit" type="primary" size="large">
                    Сохранить
                  </Button>
                  <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={onCancel}
                  >
                    Отмена
                  </Button>
                </>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    </LayoutWithHeader>
  );
};
