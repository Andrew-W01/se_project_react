import "./ItemModal.css";
import closeBtn from "../../assets/cls-btn.svg";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function ItemModal({
  activeModal,
  handleCloseClick,
  card,
  handleDeleteItem,
  isOpen,
  deleteModal,
  handleDeleteClose,
}) {
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
        <button
          onClick={() => {
            handleDeleteItem(card._id);
          }}
          className="card-item__delete-btn"
        >
          Delete Item
        </button>
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        activeModal={deleteModal === "delete"}
        handleCloseClick={handleDeleteClose}
        handleDeleteItem={handleDeleteItem}
        handleDeleteClose={handleDeleteClose}
      />
    </div>
  );
}

export default ItemModal;
