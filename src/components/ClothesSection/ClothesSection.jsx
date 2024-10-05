import "./ClothesSection.css";
import React, { useContext } from "react";

import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ClothesSection({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="clothes-section">
      <div className="section__header">
        <p>Your Items</p>
        <button onClick={handleAddClick} className="section__add-button">
          {" "}
          + Add item{" "}
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => currentUser && item.owner === currentUser?._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              isLoggedin={isLoggedIn}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
