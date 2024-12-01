import { useContext, useEffect, useState } from "react";
import styles from "./SettingsButton.module.css";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";
import SwitchToggle from "./SwitchToggle/SwitchToggle";

export default function SettingsButton() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleIconClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const { isLightMode, defaultDegree, setDefaultSettings } =
    useContext(SettingsContext);

  useEffect(() => {
    const currStorage = JSON.parse(
      localStorage.getItem("defaultSettings") || "{}"
    );
    localStorage.setItem(
      "defaultSettings",
      JSON.stringify({
        ...currStorage,
        defaultMode: isLightMode ? "light" : "dark",
        defaultDegree,
      })
    );
  }, [isLightMode, defaultDegree]);

  const handleSwitchMode = () =>
    setDefaultSettings((prev) => ({
      ...prev,
      defaultMode: isLightMode ? "dark" : "light",
    }));

  const handleConvertTemp = () =>
    setDefaultSettings((prev) => ({
      ...prev,
      defaultDegree: defaultDegree === "C" ? "F" : "C",
    }));

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.iconContainer}>
        <img
          className={styles.settingsIcon}
          src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-settings-ui-dreamstale-lineal-dreamstale-3.png"
          alt="settings icon"
          onClick={handleIconClick}
        />
      </div>

      <div
        className={`${styles.settingsMenuContainer} ${
          isMenuVisible ? styles.shown : ""
        }`}>
        <button
          className={styles.closeButton}
          onClick={() => setIsMenuVisible((prev) => !prev)}>
          x
        </button>
        <ul className={styles.settingsMenu}>
          <li className={styles.settingsItem}>
            <span>Toggle Display Mode</span>
            <SwitchToggle handleSwitchPress={handleSwitchMode} />
          </li>
          <li className={styles.settingsItem}>
            <span>Fahrenheit / Celsius</span>
            <SwitchToggle handleSwitchPress={handleConvertTemp} />
          </li>
        </ul>
      </div>
    </div>
  );
}
