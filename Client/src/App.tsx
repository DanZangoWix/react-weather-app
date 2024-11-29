import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import CityMenu from "./components/CityMenu/CityMenu";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TodayForecast from "./components/TodayForecast/TodayForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import InfoBoxes from "./components/InfoBoxes/InfoBoxes";
import * as types from "./assets/types";
import defaultSettingsJson from "./assets/defaultSettings.json";
import SettingsButton from "./components/SettingsButton/SettingsButton";
import { writeFileSync } from "fs";

function App() {
  const [defaultSettings, setDefaultSettings] =
    useState<types.defaultSettings>(defaultSettingsJson);

  const [cityList, setCityList] = useState([defaultSettings.defaultCity]);
  const [currentCity, setcurrentCity] = useState(defaultSettings.defaultCity);
  const [weatherData, setWeatherData] = useState<types.weatherData | null>(
    null
  );

  useEffect(() => {
    const getWeatherObject = async () => {
      try {
        const searchCityBy = currentCity.url
          ? currentCity.url
          : currentCity.city;
        const response = await axios.get(
          `http://localhost:3001/${searchCityBy}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("ERROR: city not found");
      }
    };
    getWeatherObject();
  }, [currentCity]);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.siteHeadline}>
          <h1>Weather.com</h1>
        </div>
        <SearchBar
          setcurrentCity={setcurrentCity}
          setCityList={setCityList}
          cityList={cityList}
        />
        <SettingsButton />
      </header>

      <main className={styles.pageContent}>
        <CityMenu cityList={cityList} setcurrentCity={setcurrentCity} />
        {weatherData && (
          <>
            <CurrentWeather
              currentWeather={weatherData.currentWeatherDataObj}
            />
            <TodayForecast todayForecast={weatherData.todayForecastDataObj} />
            <WeeklyForecast forecastData={weatherData.forecastDataObj} />
            <InfoBoxes infoData={weatherData.infoDataObj} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
