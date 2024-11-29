import { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchSvg from "./assets/SearchSvg";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import axios from "axios";
import { cityObj } from "../../assets/types";

export default function SearchBar(props: {
  setcurrentCity: (city: cityObj) => void;
  setCityList: React.Dispatch<React.SetStateAction<cityObj[]>>;
  cityList: cityObj[];
}) {
  const [searchInput, setSearchInput] = useState("");
  const [cityOptions, setCityOptions] = useState<cityObj[]>([]);

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
        className={styles.inputText}
        value={searchInput}
        onChange={(e) => handleChange(e.target.value)}
        autoComplete="off"></input>
      <button
        type="submit"
        value=""
        className={styles.inputBtn}
        onClick={() => handleSearch({ city: searchInput, country: "" })}>
        <SearchSvg />
      </button>
      <SearchSuggestions
        cityOptions={cityOptions}
        handleSearch={handleSearch}
      />
    </div>
  );
}
