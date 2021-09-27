import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then((values) => {
        setCurrentUser(values[0]);
        setCards(values[1]);

      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api.deleteCard(card._id, isOwn)
      .then(() => {
        setCards((state) =>
          state.filter((c) =>
            c._id !== card._id ? true : false)
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.insertNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    history.push('/sign-in');
    setEmail('');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          const user = JSON.parse(localStorage.getItem('user'));
          setEmail(user.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleRegistration(values) {
    auth.register(values)
      .then((data) => {
        /*    localStorage.setItem('user', JSON.stringify(data)); */
        handleInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleLogin(values) {
    auth.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          tokenCheck(res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleInfoTooltip(success) {
    if (success) {
      setIsInfoTooltipOpen(true);
      setIsSignUpSuccess(true);
    }
    else {
      setIsInfoTooltipOpen(true);
      setIsSignUpSuccess(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          signOut={signOut}
        />
        <Switch>
          <Route
            path="/sign-in">
            <Login
              logIn={setLoggedIn}
              handleEmail={setEmail}
              tokenCheck={tokenCheck}
              handleLogin={handleLogin} />
          </Route>
          <Route
            path="/sign-up"
          >
            <Register
              handleRegistration={handleRegistration}
              handleInfoTooltip={handleInfoTooltip} />
          </Route>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          >
          </ProtectedRoute>
        </Switch>
        <Footer
          loggedIn={loggedIn} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <PopupWithForm
          name="confirm"
          text="Вы уверены?"
          formConfirm="form__confirm-text"
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSignUpSuccess={isSignUpSuccess}
          name="infotooltip"
        >
        </InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
