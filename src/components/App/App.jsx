import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import Register from "../RegisterModal/RegisterModal";
import Login from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal";
import {
  getItems,
  likeCard,
  unlikeCard,
  postItem,
  deleteItem,
} from "../../utils/api";
import * as auth from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({ email, password, name, avatar }) => {
    return auth
      .register(name, password, email, avatar)
      .then(() => {
        handleLogin({ email, password });
      })
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .authorize(email, password)
      .then((data) => {
        auth.checkToken(data.token).then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);

          localStorage.setItem("jwt", data.token);
          closeActiveModal();
          navigate("/profile");
        });
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

  function onAddItem({ name, weather, link }) {
    const token = localStorage.getItem("jwt");

    postItem(name, link, weather, token)
      .then((data) => {
        setClothingItems((prev) => [data.data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem() {
    const token = localStorage.getItem("jwt");

    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleEditProfile = (data) => {
    const token = localStorage.getItem("jwt");

    auth
      .editProfile(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ item, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? likeCard(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === item._id ? updatedCard.data : card
              )
            );
          })
          .catch(console.error)
      : unlikeCard(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === item._id ? updatedCard.data : card
              )
            );
          })
          .catch(console.error);
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                //and here aswell
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOutClick={handleLogOutClick}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <Login
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLoginClick}
            handleLogin={handleLogin}
            setActiveModal={setActiveModal}
          />
          <Register
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSignup={handleSignUpClick}
            handleRegistration={handleRegistration}
            setActiveModal={setActiveModal}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onClose={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            openDeleteModal={openDeleteModal}
            handleCloseClick={closeActiveModal}
            isLoggedIn={isLoggedIn}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            onEditProfile={handleEditProfile}
          />
          <ConfirmDeleteModal
            activeModal={activeModal === "delete"}
            handleDeleteItem={handleDeleteItem}
            closeActiveModal={closeActiveModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
