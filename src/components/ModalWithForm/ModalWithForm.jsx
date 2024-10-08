import "./ModalWithForm.css";
import closeBtn from "../../assets/cls-btn.svg";
function ModalWithForm({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
  switchButtonClick,
  switchButtonText,
}) {
  function getModalClass() {
    if (isOpen) {
      return "modal_opened";
    } else {
      return "";
    }
  }

  return (
    <div className={`modal  ${getModalClass()}`}>
      <div className="modal__content">
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img
              src={closeBtn}
              alt="close button"
              className="modal__close-btn"
            />
          </button>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
