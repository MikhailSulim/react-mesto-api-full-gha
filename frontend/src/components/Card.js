import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_is-liked"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={`На фото - ${card.name}`}
        onClick={handleClick}
        className="element__img"
      />
      {isOwn && (
        <button
          type="button"
          className="element__delete"
          onClick={handleDeleteClick}
        />
      )}
      {/* <button className="element__delete" type="button" /> */}
      <div className="element__line-container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
