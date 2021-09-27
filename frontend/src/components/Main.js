import React from 'react';
import Card from './Card.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-overlay">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
            <button
              onClick={onEditAvatar}
              className="profile__button-avatar-change">
            </button>
          </div>
          <div className="profile__container-text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button button-call-popup"
              type="button">
            </button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button button-call-popup"
          type="button">
        </button>
      </section>
      <div className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />)
        )}
      </div>
    </main>
  );
}

export default Main;


