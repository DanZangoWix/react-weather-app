import styles from "./SearchSuggestions.module.css";
import * as types from "../../assets/types";

export default function SearchSuggestions(props: {
  cityOptions: types.cityObj[];
  handleSearch: (city: types.cityObj) => void;
}) {
  return (
    <div
      className={`${
        props.cityOptions.length
          ? styles.searchSuggestionsContainer
          : styles.hidden
      }`}>
      <ul className={styles.suggestionList}>
        {props.cityOptions.length ? (
          props.cityOptions.map((cityOption: types.cityObj, index: number) => {
            return (
              <li
                key={index}
                className={styles.suggestion}
                onClick={() => {
                  props.handleSearch(cityOption);
                }}>
                <div className={styles.suggestionContainer}>
                  <span className={styles.optionCityName}>
                    {cityOption.city}
                  </span>
                  <br />
                  <span className={styles.optionCountryName}>
                    {cityOption.country}
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
