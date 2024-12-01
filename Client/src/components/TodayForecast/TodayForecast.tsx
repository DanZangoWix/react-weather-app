import styles from "./TodayForecast.module.css";
import { todayForecastData } from "../../assets/types";
import { useContext } from "react";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function TodayForecast(props: {
  todayForecast: todayForecastData;
}) {
  const { isLightMode, defaultDegree } = useContext(SettingsContext);

  return (
    <div className={`${styles.todayForecast} ${isLightMode && styles.light}`}>
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
          <div
            className={`${styles.hourForecast} ${isLightMode && styles.light}`}
            key={index}>
            <h5>{hour}</h5>
            <img src={props.todayForecast.incons[index]} alt="weather icon" />
            <p>
              <span className={styles.hourTemp}>
                {`${
                  defaultDegree === "C"
                    ? props.todayForecast.tempByHourC[index]
                    : props.todayForecast.tempByHourF[index]
                }° ${defaultDegree}`}
              </span>
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
