import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ onUpdateAvatar, onClose, isOpen }) {

  const editAvatarPopupRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: editAvatarPopupRef.current.value,
    });
  }

  function handleClose() {
    onClose();
  }

  React.useEffect(() => {
    editAvatarPopupRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={handleClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-avatar"
      text="Обновить аватар"
      buttonName="Сохранить">
      <fieldset className="form__main-info">
        <input
          className="form__item form__item_type_avatar"
          ref={editAvatarPopupRef}
          name="link"
          id="avatar-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required />
        <span className="form__item-error avatar-link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;
