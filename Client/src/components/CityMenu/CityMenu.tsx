import styles from "./CityMenu.module.css";
import { cityObj } from "../../assets/types";

export default function CityMenu(props: {
  setcurrentCity: (currentCity: cityObj) => void;
  cityList: cityObj[];
}) {
  const handleClick = (chosenCity: cityObj) => {
    props.setcurrentCity(chosenCity);
  };

  return (
    <div className={styles.citiesMenuContainer}>
      <ul className={styles.citiesMenu}>
        {props.cityList.map((cityItem: cityObj, index: number) => (
          <li
            className={styles.cityOption}
            key={index}
            onClick={() => handleClick(cityItem)}>
            <span className={styles.cityNameDisplay}>{cityItem.city}</span>
            <br />
            <span className={styles.countryNameDisplay}>
              {cityItem.country}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
