import styles from "./SettingsButton.module.css";

export default function SettingsButton() {
  return (
    <div className={styles.settingsContainer}>
      <img
        className={styles.settingsIcon}
        src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-settings-ui-dreamstale-lineal-dreamstale-3.png"
        alt="external-settings-ui-dreamstale-lineal-dreamstale-3"
      />
    </div>
  );
}
