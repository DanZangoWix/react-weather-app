import styles from "./TodayForecast.module.css";
import { todayForecastData } from "../../assets/types";

export default function TodayForecast(props: {
  todayForecast: todayForecastData;
}) {
  return (
    <div className={styles.todayForecast}>
      <h3 className={styles.todayForecastHeader}>Today's forecast</h3>
      <ul className={styles.hourForecastList}>
        {[
          "6:00 AM",
          "9:00 AM",
          "12:00 AM",
          "3:00 PM",
          "6:00 PM",
          "12:00 PM",
        ].map((hour, index) => (
          <div className={styles.hourForecast} key={index}>
            <h5>{hour}</h5>
            <img src={props.todayForecast.incons[index]} alt="weather icon" />
            <p>
              <span className={styles.hourTemp}>
                {props.todayForecast.tempByHourC[index]}
              </span>
              °
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
