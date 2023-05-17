import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img
              src={avatar}
              alt="Аватар пользователя"
              className="profile__avatar-img"
            />
            <button
              type="button"
              className="profile__avatar-btn"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button className="add-button" type="button" onClick={onAddPlace} />
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
