import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import "./Profile.css";

function Profile({ onCardClick, clothingItems, weatherData, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}
export default Profile;
