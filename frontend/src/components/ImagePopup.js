function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.link ? "popup_is-opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__close popup__close_type_image"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__image-figure">
          <img src={card.link} alt={`На фото - ${card.name}`} className="popup__image" />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
