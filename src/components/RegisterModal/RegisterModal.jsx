import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import React, { useState, useEffect } from "react";

const Register = ({ isOpen, handleRegistration, onClose, navigateToLogin }) => {
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
    handleRegistration(data);
  };
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></ModalWithForm>
  );
};

export default Register;
