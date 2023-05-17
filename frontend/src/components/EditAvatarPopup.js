import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import useFormValidate from "../hooks/useFormValidate";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  const { values, errors, onChange, resetValidation, isFormValid } =
    useFormValidate();

  useEffect(() => {
    resetValidation();
    avatarRef.current.value = "";
  }, [isOpen, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm // попап смены аватара
      name="new-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="url"
        id="input-link-avatar"
        className="popup__input popup__input_field_link-avatar"
        placeholder="Ссылка на аватар"
        name="avatar"
        required
        onChange={onChange}
        ref={avatarRef}
        value={values.avatar || ""}
      />
      <span id="input-link-avatar-error" className="popup__input-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
