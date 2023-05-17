import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api
      .getAllData()
      .then((res) => {
        const [initialCards, userData] = res;
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => console.error("error", error));
  }, []);

  // функции открытия/закрытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    // resetValidation();
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    // записать очищение
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeleteCardPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error("error", error));
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleCardDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeleteCardPopupOpen(!isConfirmDeleteCardPopupOpen);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(newAvatar)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .createCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardId={deletedCard}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*   
Не хватает закрытия модальных окон по Esc и оверлей. Лучший способ реализации это описать еще один компонент Popup, 
который будет возвращать обертку div className='.popup ...' В этот компонент передавать children isOpen и функцию закрытия onClose. 
С помощью хука useEffect обхявить обработчик закрытия по Esc и описать проверку, что Если стейт isOpen в истине, 
тогда вешать слушатель на document. Из хука, вне проверки нужно будет вернуть колбэком удаление слушателя 
return () => {document.remove...}. 
В массив зависимостей записать также isOpen, чтобы реакт понимал когда нужно вешать и когда удалять обработчик. 
Также в этом компоненте можно описать функцию клика по overlay. Проверку осуществить через event.target и event.currentTarget. 
Повесить этот обработчик на сам div на событие onClick. Компонент использовать в PopupWithForm и ImagePopup вместо div
*/
