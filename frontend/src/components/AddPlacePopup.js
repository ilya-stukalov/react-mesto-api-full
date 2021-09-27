import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup( { onAddPlace, isOpen, onClose, } ) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    else setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-card"
      text="Новое место"
      buttonName="Сохранить">
      <fieldset className="form__main-info">
        <input
          className="form__item form__item_type_name"
          name="name"
          type="text"
          id="place-name-input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name || ''}
          onChange={handleChange} />
        <span className="form__item-error place-name-input-error"></span>
        <input
          className="form__item form__item_type_description"
          name="link" id="place-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={handleChange} />
        <span className="form__item-error place-link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
