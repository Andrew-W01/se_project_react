import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";

const AddItemModal = ({
  onClose,
  isOpen,
  onAddItem,
  buttonText,
  isLoggedIn,
}) => {
  //name

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);

    setName(e.target.value);
  };
  //link
  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  //submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !link || !weather) {
      alert("All fields are required");
      return;
    }
    onAddItem({ name, link, weather });
  };
  //clear inputs
  useEffect(() => {
    setName("");
    setUrl("");
    setWeather("");
  }, [isOpen]);

  //weather
  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onChange={handleWeatherChange}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
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
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="input"
            id="hot"
            type="radio"
            value="hot"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="input"
            id="warm"
            value="warm"
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
            value="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>

        <button type="submit" className="modal__submit-btn ">
          Add garment
        </button>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
