import { CurrentUserContext } from '../contexts/CurrentUserContext';

import React from 'react';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__trash-button ${isOwn ? 'element__trash-button_active' : 'element__trash-button_inactive'}`
  );

  const cardLikeButtonClassName = `element__button_active`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div
      className="element">
      <img className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleCardDelete}>
      </button>
      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-group">
          <button
            className={`element__button ${isLiked ? cardLikeButtonClassName : ''}`}
            type="button"
            onClick={handleCardLike}>

          </button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
