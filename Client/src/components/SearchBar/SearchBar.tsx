import { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import SearchSvg from "./assets/SearchSvg";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import axios from "axios";
import { cityObj } from "../../assets/types";
import SettingsButton from "../SettingsButton/SettingsButton";
import { SettingsContext } from "../../assets/SettingsContext/settingsContext";

export default function SearchBar(props: {
  setcurrentCity: (city: cityObj) => void;
  setCityList: React.Dispatch<React.SetStateAction<cityObj[]>>;
  cityList: cityObj[];
}) {
  const [searchInput, setSearchInput] = useState("");
  const [cityOptions, setCityOptions] = useState<cityObj[]>([]);

  const { isLightMode } = useContext(SettingsContext);

  const handleSearch = (cityToSearch: cityObj) => {
    props.setcurrentCity(cityToSearch);

    if (
      !props.cityList.some(
        (city: cityObj) =>
          city.city === cityToSearch.city &&
          city.country === cityToSearch.country
      )
    ) {
      props.setCityList((prevCityList: cityObj[]) => [
        ...prevCityList,
        cityToSearch,
      ]);
    }
    setCityOptions([]);
    setSearchInput("");
  };

  const handleChange = async (value: string) => {
    setSearchInput(value);
    createAutoCompleteOptions(value);
  };

  const createAutoCompleteOptions = (prefix: string) => {
    axios
      .get(`http://localhost:3001/complete/${prefix}`)
      .then((response) => {
        setCityOptions(response.data);
      })
      .catch(() => []);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        id="fname"
        name="fname"
        className={`${styles.inputText} ${isLightMode && styles.light}`}
        value={searchInput}
        onChange={(e) => handleChange(e.target.value)}
        autoComplete="off"></input>
      <button
        type="submit"
        value=""
        className={`${styles.inputBtn} ${isLightMode && styles.light}`}
        onClick={() => handleSearch({ city: searchInput, country: "" })}>
        <SearchSvg />
      </button>
      <SearchSuggestions
        cityOptions={cityOptions}
        handleSearch={handleSearch}
      />
      <SettingsButton />
    </div>
  );
}
