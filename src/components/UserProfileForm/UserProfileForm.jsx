import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./UserProfileForm.module.css";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "../../services/reducers/stateFuncs";
import { changeUserDataAction } from "../../services/actions/auth";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InitialInputProfile } from "../../types/commonTypes";
export const UserProfileForm = () => {
  const location = useLocation();
  const state = useSelector(authState);
  const { user, error } = state;
  const dispatch = useDispatch();
  const INITIALINPUT = {
    login: user?.email,
    password: "",
    name: user?.name,
    isShowButon: false,
  };
  const [prevInput, setPrevInput] = useState(INITIALINPUT);
  const [inputData, setInputData] = useState(INITIALINPUT);
  const onChange = (e) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserDataAction(inputData));
    setInputData({
      ...inputData,
      isShowButon: false,
      password: "",
    });
  };
  const onCancel = (e) => {
    e.preventDefault();
    setInputData({
      ...prevInput,
      isShowButon: false,
    });
  };

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  return (
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
  );
};
