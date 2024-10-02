import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleLogOutClick, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt="profile image"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditProfileClick}
        >
          {" "}
          Change Profile Data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleLogOutClick}
        >
          {" "}
          Log Out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
