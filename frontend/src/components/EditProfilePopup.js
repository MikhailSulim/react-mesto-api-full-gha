import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidate from "./../hooks/useFormValidate";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, errors, onChange, resetValidation, isFormValid } =
    useFormValidate();

  // подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    resetValidation(
      { name: currentUser.name, about: currentUser.about },
      {},
      true
    );
  }, [currentUser, resetValidation]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
    resetValidation();
  }

  return (
    <PopupWithForm // попап редактирования профиля пользователя
      name="description"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        id="input-name"
        type="text"
        className="popup__input popup__input_field_name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        name="name"
        required
        value={values.name || ""}
        onChange={onChange}
      />
      <span id="input-name-error" className="popup__input-error">
        {errors.name}
      </span>
      <input
        id="input-subtitle"
        type="text"
        className="popup__input popup__input_field_subtitle"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        name="about"
        value={values.about || ""}
        onChange={onChange}
        required
      />
      <span id="input-subtitle-error" className="popup__input-error">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
