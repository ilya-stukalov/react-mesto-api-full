import React from 'react';
function ImagePopup({ isOpen, onClose, card }) {

  return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popup-photo">
        <div className="popup__container">
          <button
            className="popup__close-icon"
            type="button"
            onClick={onClose}></button>
          <img
            className="popup__img"
            src={card.link}
            alt="всплывающее фото" />
          <p className="popup__description">{card.name}</p>
        </div>
      </div>
  );
}

export default ImagePopup;
