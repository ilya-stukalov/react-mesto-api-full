import React from 'react';
function PopupWithForm({ name, isOpen, formConfirm, text, buttonName, children, onSubmit, onClose, isDisabled, noValidate }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id={`popup__${name}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          onClick={onClose}
        ></button>
        <div className="form">
          <h2 className={`form__text ${formConfirm}`}>{text}</h2>
          <form
            noValidate={noValidate}
            onSubmit={onSubmit}
            className="form__container"
            name={`popup__${name}`} >
            {children}
            <button
              className={isDisabled ? "form__button form__button_inactive" : "form__button"}
              type="submit"
              disabled={isDisabled}>
              {buttonName}

            </button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default PopupWithForm;
