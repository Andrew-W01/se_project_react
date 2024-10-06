import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import ModalWithForm from "./ModalWithForm/ModalWithForm";
function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatarUrl });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name || "");
      setAvatarUrl(currentUser?.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      modalClass="modal__content modal__content_type_form_small"
    >
      {" "}
      <label htmlFor="edit-name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="edit-avatarUrl" className="modal__label">
        Avatar *{" "}
        <input
          type="url"
          className="modal__input"
          id="edit-avatarurl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          required
        />
      </label>
      <button type="submit" className="modal__submit-btn ">
        submit
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
