import React from 'react';
import success from '../images/success.png';
import failed from '../images/failed.png';
import { useHistory } from 'react-router-dom';

function InfoTooltip({ isOpen, onClose, isSignUpSuccess, name }) {
  const history = useHistory();

  function handleClose() {
    onClose();
    if (isSignUpSuccess) {
      history.push('/sign-in');
    }
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id={`popup__${name}`}>
      <div className="popup__container popup__container_info">
        <button
          className="popup__close-icon"
          type="button"
          onClick={handleClose}
        ></button>
        {isSignUpSuccess && (<>
            <img
              className="popup__icon"
              src={success}
              alt="иконка: регистрация успешна"
            />
            <p className="popup__text">Вы успешно зарегистрировались!</p>
          </>)}
        {!isSignUpSuccess && (
          <>
            <img
              className="popup__icon"
              src={failed}
              alt="иконка: что-то пошло не так"
            />
            <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
          </>)}


      </div>
    </div>
  )
}

export default InfoTooltip;
