import style from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={style.content_box}>
      <nav className={style.nav_grid_box}>
        <div className={style.nav_link_box}>
          <div className={style.nav_link}>
            <BurgerIcon type="primary" />
            <Link to="/">
              <a
                href=""
                className={`${style.nav_link_a1} text text_type_main-default`}
              >
                Конструктор
              </a>
            </Link>
          </div>
          <div className={style.nav_link}>
            <ListIcon type="secondary" />
            <Link to="/login">
              <a
                href=""
                className={`${style.nav_link_a2} text text_type_main-default`}
              >
                Лента заказов
              </a>
            </Link>
          </div>
        </div>
        <Logo />
        <div className={style.nav_link}>
          <ProfileIcon type="secondary" />
          <Link to="/profile">
            <a
              href=""
              className={`${style.nav_link_a2} text text_type_main-default`}
            >
              Профиль
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
