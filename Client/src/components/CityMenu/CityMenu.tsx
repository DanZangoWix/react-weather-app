import styles from "./CityMenu.module.css";
import { cityObj } from "../../assets/types";
import { MouseEvent, useContext, useState } from "react";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function CityMenu(props: {
  setcurrentCity: (currentCity: cityObj) => void;
  cityList: cityObj[];
  setCityList: React.Dispatch<React.SetStateAction<cityObj[]>>;
}) {
  const handleClick = (chosenCity: cityObj) => {
    props.setcurrentCity(chosenCity);
  };

  const [showDelete, setShowDelete] = useState(-1);
  const handleContextClick = (e: MouseEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    showDelete === index ? setShowDelete(-1) : setShowDelete(index);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const temp = props.cityList.filter((_, i) => i !== index);
    props.setCityList(temp);
    setShowDelete(-1);
  };

  const { isLightMode } = useContext(SettingsContext);

  return (
    <div
      className={`${styles.citiesMenuContainer} ${
        isLightMode && styles.light
      }`}>
      <ul className={styles.citiesMenu}>
        {props.cityList.map((cityItem: cityObj, index: number) => (
          <li
            className={`${styles.cityOption} ${isLightMode && styles.light}`}
            key={index}
            onClick={() => handleClick(cityItem)}
            onContextMenu={(e) => handleContextClick(e, index)}>
            <>
              <span className={styles.cityNameDisplay}>{cityItem.city}</span>
              <br />
              <span className={styles.countryNameDisplay}>
                {cityItem.country}
              </span>
            </>
            {showDelete === index && (
              <button
                className={styles.deleteBtn}
                onClick={(e) => handleDelete(e, index)}>
                DELETE
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
