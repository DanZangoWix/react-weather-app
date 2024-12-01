import styles from "./WeeklyForecast.module.css";
import { forecastData } from "../../assets/types";
import { useContext } from "react";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function WeeklyForecast(props: { forecastData: forecastData }) {
  const { isLightMode, defaultDegree } = useContext(SettingsContext);

  return (
    <div className={`${styles.weeklyForecast} ${isLightMode && styles.light}`}>
      <h5>3-DAY FORECAST</h5>
      <ul className={styles.weeklyForecastList}>
        {props.forecastData.dates.map((date, index) => (
          <li key={index}>
            <div className={styles.weekdayForecast}>
              <p className={styles.weekday}>{date}</p>
              <img src={props.forecastData.icons[index]} alt="weekday icon" />
              <p className={styles.tempRange}>
                <span className={styles.minTemp}>
                  {`${
                    defaultDegree === "C"
                      ? props.forecastData.minMaxTempC[index].minTemp
                      : props.forecastData.minMaxTempF[index].minTemp
                  }° ${defaultDegree}`}
                </span>
                {` / `}
                <span className={styles.maxTemp}>
                  {`${
                    defaultDegree === "C"
                      ? props.forecastData.minMaxTempC[index].maxTemp
                      : props.forecastData.minMaxTempF[index].maxTemp
                  }° ${defaultDegree}`}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
