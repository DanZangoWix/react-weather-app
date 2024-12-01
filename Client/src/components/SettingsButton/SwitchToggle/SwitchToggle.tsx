import styles from "./SwitchToggle.module.css";

export default function SwtichToggle(props: { handleSwitchPress: () => void }) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.switchToggle}
        onClick={props.handleSwitchPress}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
