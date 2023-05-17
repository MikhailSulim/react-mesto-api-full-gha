import React, { useCallback } from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
  const [userData, setUserData] = React.useState({ email: "", password: "" });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    },
    [userData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onRegister(userData);
    },
    [onRegister, userData]
  );

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form-auth" name="form__register" onSubmit={handleSubmit}>
      <h2 className="form-auth__title" color="#fff">
        Регистрация
      </h2>
      <input
        type="email"
        id="input-register-email"
        className="form-auth__input v__input_email"
        placeholder="Email"
        name="email"
        onChange={onChange}
        value={userData.email}
        required
      />

      <input
        type="password"
        id="input-register-password"
        className="form-auth__input form-auth__input_password"
        placeholder="Пароль"
        name="password"
        required
        onChange={onChange}
        value={userData.password}
      />

      <button className="form-auth__button">Зарегистрироваться </button>
      <p className="form-auth__link-text">
        {`Уже зарегистрированы? `}
        <Link to="/signin" className="form-auth__link">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
