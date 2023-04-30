import style from "./AppHeader.module.css";
import { FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { func } from "prop-types";

export const AppHeader: FC = (): JSX.Element => {
  const pathName: string = useLocation().pathname;
  return (
    <header className={style.content_box}>
      <nav className={style.nav_grid_box}>
        <div className={style.nav_link_box}>
          <div className={style.nav_link}>
            <BurgerIcon type="primary" />
            <Link
              to="/"
              className={
                pathName === "/"
                  ? `${style.nav_link_a1} text text_type_main-default`
                  : `${style.nav_link_a2} text text_type_main-default `
              }
            >
              Конструктор
            </Link>
          </div>
          <div className={style.nav_link}>
            <ListIcon type="secondary" />
            <Link
              to="/feed"
              className={`${style.nav_link_a2} text text_type_main-default`}
            >
              Лента заказов
            </Link>
          </div>
        </div>
        <Link to="/">
          <Logo />
        </Link>

        <div className={style.nav_link}>
          <ProfileIcon type="secondary" />
          <Link
            to="/profile"
            className={
              pathName === "/profile"
                ? `${style.nav_link_a1} text text_type_main-default`
                : `${style.nav_link_a2} text text_type_main-default `
            }
          >
            Личный кабинет
          </Link>
        </div>
      </nav>
    </header>
  );
};
