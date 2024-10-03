import "./ItemModal.css";
import closeBtn from "../../assets/cls-btn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, handleCloseClick, card, openDeleteModal }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const modalDeleteClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close button" className="modal__close-btn" />
        </button>
        <img src={card.imageUrl} alt="Image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {currentUser && (
          <button
            onClick={() => {
              openDeleteModal();
            }}
            className="card-item__delete-btn"
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
