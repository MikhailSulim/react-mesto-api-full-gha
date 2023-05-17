import { useEffect } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  buttonText,
  onSubmit,
  isFormValid,
  onCloseEsc,
  onCloseOverlay,
}) {
  useEffect(() => {
    isOpen
      ? document.addEventListener("keydown", onCloseEsc)
      : document.removeEventListener("keydown", onCloseEsc);
  }, [isOpen]);

  useEffect(() => {
    isOpen
      ? document.addEventListener("mousedown", onCloseOverlay)
      : document.removeEventListener("mousedown", onCloseOverlay);
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className={`popup__close popup__close_type_${name}`}
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}`} className="popup__content" onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__save popup__save_type_${name} ${
              !isFormValid ? "popup__save_type_disabled" : ""
            }`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
