import { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchSvg from "./assets/SearchSvg";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import axios from "axios";

export default function SearchBar(props: {
  setCity: (city: string) => void;
  setCityList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const handleSearch = (cityToSearch: string) => {
    props.setCity(cityToSearch);
    props.setCityList((prevCityList: string[]) => [
      ...prevCityList,
      cityToSearch,
    ]);
    setCityOptions([]);
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
        onClick={() => handleSearch(searchInput)}>
        <SearchSvg />
      </button>
      <SearchSuggestions
        cityOptions={cityOptions}
        handleSearch={handleSearch}
      />
    </div>
  );
}
