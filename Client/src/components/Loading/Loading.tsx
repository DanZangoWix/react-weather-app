import { useContext } from "react";
import styles from "./Loading.module.css";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function Loading() {
  const { isLightMode } = useContext(SettingsContext);
  return (
    <div className={`${styles.loading} ${isLightMode && styles.light}`}>
      <ul className={styles.dotsList}>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
      </ul>
    </div>
  );
}
