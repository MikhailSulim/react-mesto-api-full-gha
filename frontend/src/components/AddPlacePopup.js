import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import useFormValidate from "../hooks/useFormValidate";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, errors, onChange, resetValidation, isFormValid } =
    useFormValidate();

  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm // попап добавления карточки
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        id="input-place"
        className="popup__input popup__input_field_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        name="name"
        value={values.name || ""}
        onChange={onChange}
        required
      />
      <span id="input-place-error" className="popup__input-error">
        {errors.name}
      </span>
      <input
        type="url"
        id="input-link"
        className="popup__input popup__input_field_link"
        placeholder="Ссылка на картинку"
        name="link"
        value={values.link || ""}
        onChange={onChange}
        required
      />
      <span id="input-link-error" className="popup__input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
