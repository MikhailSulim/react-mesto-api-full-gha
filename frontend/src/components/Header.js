import { Link } from "react-router-dom";

function Header({
  loginText,
  signText,
  route,
  onClick,
  onShowMenu,
  isShowMenu,
}) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div
        className={`header__auth ${isShowMenu ? "header__auth_visible" : ""}`}
      >
        <p className="header__login">{loginText}</p>
        <Link to={route} className="header__signin" onClick={onClick}>
          {signText}
        </Link>
      </div>
      <button
        className={`header__mobileMenuBtn ${
          isShowMenu ? "header__mobileMenuBtn_close" : ""
        }`}
        onClick={onShowMenu}
      />
    </header>
  );
}

export default Header;
