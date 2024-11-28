import styles from "./SearchSuggestions.module.css";

export default function SearchSuggestions(props: {
  cityOptions: { cityName: string; country: string }[];
  handleSearch: (city: string) => void;
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
          props.cityOptions.map(
            (
              cityOption: { cityName: string; country: string },
              index: number
            ) => {
              return (
                <li
                  key={index}
                  className={styles.suggestion}
                  onClick={() => props.handleSearch(cityOption.cityName)}>
                  <div className={styles.suggestionContainer}>
                    <span className={styles.optionCityName}>
                      {cityOption.cityName}
                    </span>
                    <br />
                    <span className={styles.optionCountryName}>
                      {cityOption.country}
                    </span>
                  </div>
                </li>
              );
            }
          )
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
