import style from "./AppHeader.module.css";
import PropTypes from "prop-types";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader({ constructor, listItems, profile }) {
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
              {constructor}
            </a>
          </div>
          <div className={style.nav_link}>
            <ListIcon type="secondary" />
            <a
              href=""
              className={`${style.nav_link_a2} text text_type_main-default`}
            >
              {listItems}
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
            {profile}
          </a>
        </div>
      </nav>
    </header>
  );
}
AppHeader.propTypes = {
  constructor: PropTypes.string,
};
