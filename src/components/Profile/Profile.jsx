import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import "./Profile.css";

function Profile({ onCardClick, setClothingItems, weatherData }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          setClothingItems={setClothingItems}
          weatherData={weatherData}
        />
      </section>
    </div>
  );
}
export default Profile;
