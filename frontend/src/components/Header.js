import React from 'react';
import logo from '../images/header-logo.svg';
import { NavLink, useLocation } from 'react-router-dom';


function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <img
          className="header__logo"
          src={logo}
          alt="логотип"
        />

        {props.loggedIn &&

          <div className="header__user-container">
            <p
              className="header__email">{props.email}</p>
            <button
              className="header__button"
              type="button"
              onClick={props.signOut}>Выйти
            </button>
          </div>
        }
        {!props.loggedIn &&

          (<nav>
            {location.pathname === '/sign-in' && (
              <NavLink
                exact to="/sign-up"
                className="decoration-none">
                <div className="header__user-container">
                  <p
                    className="header__email"></p>
                  <button
                    className="header__button"
                    type="button">Регистрация
                  </button>
                </div>
              </NavLink>
            )}
            {location.pathname === '/sign-up' && (
              <NavLink
                exact to="/sign-in"
                className="decoration-none">
                <div className="header__user-container">
                  <p
                    className="header__email"></p>
                  <button
                    className="header__button"
                    type="button">Войти
                  </button>
                </div>
              </NavLink>
            )}

          </nav>)






        }

      </div>
    </header >
  );
}

export default Header;

/* <div className="header__user-container">
            <p
              className="header__email">{props.email}</p>
            <button
              className="header__button">Войти
            </button>
          </div> */
