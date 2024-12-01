import styles from "./InfoBoxes.module.css";
import { infoData } from "../../assets/types";
import { useContext } from "react";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

type InfoBox = {
  name: string;
  class: string;
  scale: string;
};

export default function InfoBoxes(props: { infoData: infoData }) {
  const infoBoxes: InfoBox[] = [
    { name: "Humidity", class: "humidity", scale: "%" },
    { name: "Wind Speed", class: "windKph", scale: "kmp" },
    { name: "UV", class: "uv", scale: "%" },
    { name: "Rain Chances", class: "chanceOfRain", scale: "%" },
    { name: "Sunrise", class: "sunrise", scale: "" },
    { name: "Sunset", class: "sunset", scale: "" },
    { name: "Visibility", class: "visibility", scale: "km" },
  ];

  const { isLightMode } = useContext(SettingsContext);

  return (
    <>
      {infoBoxes.map((box: InfoBox, index: number) => (
        <div
          className={`${styles[box.class]} ${styles.info} ${
            isLightMode && styles.light
          }`}
          key={index}>
          <h3>{box.name}</h3>
          <p>
            <span className={styles.infoData}>
              {props.infoData[`${box.class}`]}
            </span>
            {` ${box.scale}`}
          </p>
        </div>
      ))}
    </>
  );
}
