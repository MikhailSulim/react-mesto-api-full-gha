function InfoTooltip({ isOpen, onClose, isValidAuth, textMessage }) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className={`popup__close `} type="button" onClick={onClose} />

        <div
          className={`popup__image-info popup__image-info_${
            isValidAuth ? "success" : "error"
          }`}
        />

        <h2
          style={{ textAlign: "center", marginBottom: "23px" }}
          className="popup__title"
        >
          {textMessage}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
