import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="profile image" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}
export default SideBar;
