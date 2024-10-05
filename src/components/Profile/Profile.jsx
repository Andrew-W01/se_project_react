import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  onCardLike,
  handleLogOutClick,
  handleEditProfileClick,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOutClick={handleLogOutClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          weatherData={weatherData}
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
export default Profile;
