import styles from "./CurrentWeather.module.css";
import { currentWeatherData } from "../../assets/types";
import { useContext } from "react";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function CurrentWeather(props: {
  currentWeather: currentWeatherData;
}) {
  const { defaultDegree } = useContext(SettingsContext);

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentData}>
        <h1 className="currentCity">{props.currentWeather.cityObj.city}</h1>
        <p>
          {" "}
          Feels Like:{" "}
          <span className="feelsLikeTemp">
            {`${
              defaultDegree === "C"
                ? props.currentWeather.feelsLikeC
                : props.currentWeather.feelsLikeF
            }° ${defaultDegree}`}
          </span>
        </p>
        <p className={styles.currentTemp}>
          <span>
            {" "}
            {`${
              defaultDegree === "C"
                ? props.currentWeather.currTempC
                : props.currentWeather.currTempF
            }° ${defaultDegree}`}
          </span>
        </p>
      </div>
      <img src={props.currentWeather.currentIcon} alt="current weather icon" />
    </div>
  );
}
