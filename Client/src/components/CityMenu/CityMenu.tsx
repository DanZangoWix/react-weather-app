import styles from "./CityMenu.module.css";

export default function CityMenu(props: {
  setCity: (city: string) => void;
  cityList: string[];
}) {
  const handleClick = (city: string) => {
    props.setCity(city);
  };

  return (
    <div className={styles.citiesMenuContainer}>
      <ul className={styles.citiesMenu}>
        {props.cityList.map((city: string, index: number) => (
          <li
            className={styles.cityOption}
            key={index}
            onClick={() => handleClick(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
