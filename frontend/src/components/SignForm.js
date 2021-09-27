import React from 'react';
import { Link } from 'react-router-dom';

function SignForm(props) {

  return (
    <div className="form form_theme_dark">
      <form
        onSubmit={props.handleSubmit}
        className="form__container">
        <p
          className="form__text form__text_theme_dark">
          {props.formName}
        </p>
        <fieldset
          className="form__main-info">
          {props.children}
        </fieldset>
        <button
          type="submit"
          className="form__button form__button_theme_dark"
        > {props.buttonName}
        </button>
        {props.isrRegForm ? (<p
          className="form__link-text">
          Уже зарегистрированы?&nbsp;
          <Link
            className="form__link"
            to="/sign-in">
            Войти
          </Link>
        </p>) : ''
        }

      </form>
    </div>
  );
}

export default SignForm;