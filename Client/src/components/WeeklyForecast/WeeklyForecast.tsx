import styles from "./WeeklyForecast.module.css";
import { forecastData } from "../../assets/types";

export default function WeeklyForecast(props: { forecastData: forecastData }) {
  return (
    <div className={styles.weeklyForecast}>
      <h5>3-DAY FORECAST</h5>
      <ul className={styles.weeklyForecastList}>
        {props.forecastData.dates.map((date, index) => (
          <li key={index}>
            <div className={styles.weekdayForecast}>
              <p className={styles.weekday}>{date}</p>
              <img src={props.forecastData.icons[index]} alt="weekday icon" />
              <p className={styles.tempRange}>
                <span className={styles.minTemp}>
                  {props.forecastData.minMaxTempC[index].minTemp}°
                </span>
                {` - `}
                <span className={styles.maxTemp}>
                  {props.forecastData.minMaxTempC[index].maxTemp}°
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
