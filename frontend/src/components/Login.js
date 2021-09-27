import React from 'react';
import { withRouter } from 'react-router-dom';
import SignForm from './SignForm';

function Login(props) {

  const [values, setValues] = React.useState({});
  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(values);
    setValues({
      email: '',
      password: '',
    });
  }

  return (
    <SignForm
      handleSubmit={handleSubmit}
      buttonName="Войти"
      formName="Вход">
        <span></span>
        <input
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          value={values.email || ''}
          placeholder="Email"
          className="form__item form__item_theme_dark" />
        <span></span>
        <input
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          value={values.password || ''}
          placeholder="Пароль"
          className="form__item form__item_theme_dark" />
    </SignForm>
  );
}

export default withRouter(Login);
