import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup({
  isOpen,
  onClose,
  onCardDelete,
  cardId,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm // попап подверждения удаленя карточки
      name="delete-photo"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Удаление..." : "Да"}
      isFormValid={true}
    />
  );
}

export default ConfirmDeleteCardPopup;
