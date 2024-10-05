import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import liked from "../../assets/LikedHeart.svg";
import unliked from "../../assets/UnlikedHeart.svg";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike, isLoggedin }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.preventDefault();
    onCardLike({ item, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedin && (
          <img
            className="card__like-button"
            onClick={handleLike}
            alt={isLiked ? "Unlike" : "Like"}
            src={isLiked ? liked : unliked}
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
