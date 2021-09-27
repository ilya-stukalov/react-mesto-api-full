import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


import { useFormValidation } from './useFormValidation';

function EditProfilePopup({ onUpdateUser, onClose, isOpen }) {

    const {
        handleChange,
        values,
        errors,
        isValid,
        resetForm,

    } = useFormValidation({});

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        resetForm(currentUser);
    }, [currentUser, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            noValidate={true}
            onClose={onClose}
            isOpen={isOpen}
            name="edit-profile"
            text="Редактировать профиль"
            onSubmit={handleSubmit}
            buttonName="Сохранить"
            isDisabled={!isValid}>
            <fieldset className="form__main-info">
                <input
                    className="form__item form__item_type_name"
                    name="name"
                    onChange={handleChange}
                    id="profile-name-input"
                    type="text"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="40"
                    value={values.name || ''}
                />
                <span className="form__item-error form__item-error_active profile-name-input-error">{errors.name}</span>
                <input
                    className="form__item form__item_type_description"
                    name="about"
                    onChange={handleChange}
                    id="profile-description-input"
                    type="text"
                    placeholder="Описание"
                    required
                    minLength="2"
                    maxLength="200"
                    value={values.about || ''} />
                <span className="form__item-error form__item-error_active profile-description-input-error">{errors.about}</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
