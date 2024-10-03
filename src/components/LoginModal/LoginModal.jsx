import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./LoginModal.css";

const Login = ({
  handleLogin,
  isOpen,
  onClose,
  handleLoginClick,
  setActiveModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    return data.email && data.password;
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
    handleLogin(data);

    setData({
      email: "",
      password: "",
    });
  };

  return (
    <ModalWithForm
      title="Login"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      switchButtonClick={() => setActiveModal("register")}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="text"
          className="modal__input"
          id="email"
          required
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
          required
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <div className="login__button-container">
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Login
        </button>
        <button
          className="login__login-link"
          type="button"
          to="login"
          onClick={() => setActiveModal("register")}
        >
          Or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default Login;
