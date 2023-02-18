import style from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className={style.content_box}>
      <nav className={style.nav_grid_box}>
        <div className={style.nav_link_box}>
          <div className={style.nav_link}>
            <BurgerIcon type="primary" />
            <a
              href=""
              className={`${style.nav_link_a1} text text_type_main-default`}
            >
              Конструктор
            </a>
          </div>
          <div className={style.nav_link}>
            <ListIcon type="secondary" />
            <a
              href=""
              className={`${style.nav_link_a2} text text_type_main-default`}
            >
              Лента заказов
            </a>
          </div>
        </div>
        <Logo />
        <div className={style.nav_link}>
          <ProfileIcon type="secondary" />
          <a
            href=""
            className={`${style.nav_link_a2} text text_type_main-default`}
          >
            Профиль
          </a>
        </div>
      </nav>
    </header>
  );
}
