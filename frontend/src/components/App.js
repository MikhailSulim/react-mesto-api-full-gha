import React, { useState } from 'react';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import * as ApiAuth from '../utils/ApiAuth.js';
import { register, authorize, getTokenData } from '../utils/ApiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';

function App() {
  const ERR_MESSAGE = 'Что-то пошло не так! Попробуйте ещё раз.';
  // переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [textMessageInfoTooltip, setTextMessageInfoTooltip] = useState('');

  // переменные состояния, отвечающие за карточки
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);

  // переменные состояния, отвечающие за данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // переменные состояния, твечающие за лоадеры
  const [isLoading, setIsLoading] = useState(false);

  // // переменные состояния, отвечающие за авторизацию
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogin, setUserLogin] = useState(null);
  const [isValidAuth, setIsValidAuth] = useState(false);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const navigate = useNavigate();

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
    setIsInfoTooltipOpen(false);
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
      .catch((error) => console.error('error', error));
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.error('error', error))
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

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api
      .setUserInfo({name, about})
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => console.error('error', error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }
  // function handleUpdateUser(newUserInfo) {
  //   setIsLoading(true);
  //   api
  //     .setUserInfo(newUserInfo)
  //     .then((newUserData) => {
  //       setCurrentUser(newUserData);
  //       closeAllPopups();
  //     })
  //     .catch((error) => console.error('error', error))
  //     .finally(() => {
  //       setTimeout(() => {
  //         // чтобы не было видно процесса обратной замены надписи
  //         setIsLoading(false);
  //       }, 500);
  //     });
  // }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(newAvatar)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((error) => console.error('error', error))
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
      .catch((error) => console.error('error', error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  // функции для аутентификации на сайте

  function cbLogin({ email, password }) {
    // функция авторизации
    authorize(email, password)
      .then((res) => {
        // localStorage.setItem("jwt", res.token);
        localStorage.setItem('isAuthorized', 'true');
        setIsLoggedIn(true);
        setUserLogin(email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setIsValidAuth(false);
        setTextMessageInfoTooltip(ERR_MESSAGE);
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
      });
  }

  function cbRegister({ email, password }) {
    register(email, password)
      .then((res) => {
        setIsValidAuth(true);
        setTextMessageInfoTooltip('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
        navigate('/signin', { replace: true });
      })
      .catch(() => {
        setIsValidAuth(false);
        setTextMessageInfoTooltip(ERR_MESSAGE);
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
      });
  }

  function cbLogOut() {
    setIsLoggedIn(false);
    setUserLogin(null);
    // localStorage.removeItem("jwt");
    localStorage.removeItem('isAuthorized');
  }

  // старое нерабочее с моим api
  // React.useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   getTokenData(jwt)
  //     .then((res) => {
  //       setUserLogin(res.data.email);
  //       console.log(res.data);
  //       setIsLoggedIn(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     api
  //       .getAllData()
  //       .then((res) => {
  //         const [initialCards, userData] = res;
  //         setCurrentUser(userData);
  //         setCards(initialCards);
  //         navigate('/', {replace: true}); // чтобы переходил после авторизации
  //       })
  //       .catch((error) => console.error("error", error));
  //   }
  // }, [isLoggedIn, navigate]);

  ///////////////////
  const checkToken = React.useCallback(() => {
    // если пользователь авторизован,
    // эта функция проверит, есть ли данные в req.user._id на сервере
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized) {
      // проверим, есть ли данные в req.user._id
      ApiAuth.getContent()
        .then((userData) => {
          if (userData.email) {
            // авторизуем пользователя
            setIsLoggedIn(true);
            setUserLogin(userData.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  React.useEffect(() => {
    checkToken();
    isLoggedIn &&
      api
        .getAllData()
        .then((res) => {
          const [initialCards, userData] = res;
          setCurrentUser(userData);
          setCards(initialCards.reverse());
        })
        .catch((error) => console.error('error', error));
  }, [checkToken, isLoggedIn]);

  ///////////////////////////////////

  function closePopupByEsc(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closePopupByClickOverlay(event) {
    if (event.target.classList.contains('popup_is-opened')) {
      closeAllPopups();
    }
  }

  function handleShowMenu() {
    // функция для раскрытия/закрытия меню в мобильной версии
    setIsShowMenu(!isShowMenu);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  loginText={userLogin}
                  signText="Выйти"
                  onClick={cbLogOut}
                  route=""
                  onShowMenu={handleShowMenu}
                  isShowMenu={isShowMenu}
                />
                <ProtectedRouteElement
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header
                  loginText=""
                  signText="Регистрация"
                  route="/signup"
                  onShowMenu={handleShowMenu}
                  isShowMenu={isShowMenu}
                />
                <Login isLoggedIn={isLoggedIn} onLogin={cbLogin} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header
                  loginText=""
                  signText="Войти"
                  route="/signin"
                  onShowMenu={handleShowMenu}
                  isShowMenu={isShowMenu}
                />
                <Register isLoggedIn={isLoggedIn} onRegister={cbRegister} />
              </>
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isValidAuth={isValidAuth}
          textMessage={textMessageInfoTooltip}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onCloseEsc={closePopupByEsc}
          onCloseOverlay={closePopupByClickOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          onCloseEsc={closePopupByEsc}
          onCloseOverlay={closePopupByClickOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          onCloseEsc={closePopupByEsc}
          onCloseOverlay={closePopupByClickOverlay}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardId={deletedCard}
          isLoading={isLoading}
          onCloseEsc={closePopupByEsc}
          onCloseOverlay={closePopupByClickOverlay}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
