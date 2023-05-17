import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
  const [userData, setUserData] = React.useState({ email: "", password: "" });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    },
    [userData]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogin(userData);
    },
    [onLogin, userData]
  );

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form-auth" name="form__login" onSubmit={onSubmit}>
      <h2 className="form-auth__title" color="#fff">
        Вход
      </h2>
      <input
        type="email"
        id="input-login-email"
        className="form-auth__input form-auth__input_email"
        placeholder="Email"
        name="email"
        required
        onChange={onChange}
        value={userData.email}
      />

      <input
        type="password"
        id="input-login-password"
        className="form-auth__input form-auth__input_password"
        placeholder="Пароль"
        name="password"
        required
        onChange={onChange}
        value={userData.password}
      />

      <button className="form-auth__button">Войти</button>
    </form>
  );
}

export default Login;
