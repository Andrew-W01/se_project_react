import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({ onClose, isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    setName("");
    setImageURL("");
    setWeather("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem(name, weather, imageURL);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleImageURLChange(e) {
    setImageURL(e.target.value);
  }
  function handleWeatherChange(e) {
    setWeather(e.target.value);
  }

  return AddItemModal(
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="image Url"
          onChange={handleImageURLChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="input"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="input"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="input"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
