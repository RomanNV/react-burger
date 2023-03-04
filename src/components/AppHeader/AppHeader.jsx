import style from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

export default function AppHeader({ title }) {
  const pathName = useLocation().pathname;
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
              to="/login"
              className={`${style.nav_link_a2} text text_type_main-default`}
            >
              Лента заказов
            </Link>
          </div>
        </div>
        <Logo />
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
            {title}
          </Link>
        </div>
      </nav>
    </header>
  );
}
