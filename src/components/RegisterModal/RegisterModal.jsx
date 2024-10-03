import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import React, { useState, useEffect } from "react";

const Register = ({
  isOpen,
  handleRegistration,
  onClose,
  handleSignUpClick,
  setActiveModal,
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  if (!isOpen) {
    return null;
  }

  const isFormValid = () => {
    return data.name && data.email && data.password && data.avatar;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    handleRegistration(data);

    setData({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  };
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="text"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
      <div className="register__button-container">
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Sign up
        </button>
        <button
          type="button"
          to="login"
          className="register__login-link"
          onClick={() => setActiveModal("login")}
        >
          Or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default Register;
