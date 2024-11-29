import styles from "./CurrentWeather.module.css";
import { currentWeatherData } from "../../assets/types";

export default function CurrentWeather(props: {
  currentWeather: currentWeatherData;
}) {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentData}>
        <h1 className="currentCity">{props.currentWeather.cityObj.city}</h1>
        <p>
          {" "}
          Feels Like:{" "}
          <span className="feelsLikeTemp">
            {props.currentWeather.feelsLikeC}
          </span>
          °
        </p>
        <p className={styles.currentTemp}>
          <span> {props.currentWeather.currTempC}</span>°
        </p>
      </div>
      <img src={props.currentWeather.currentIcon} alt="current weather icon" />
    </div>
  );
}
