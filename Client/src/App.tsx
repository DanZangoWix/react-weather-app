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
import { SettingsContext } from "./assets/SettingsContext/settingsContext";
import Loading from "./components/Loading/Loading";

function App() {
  const savedDefaultSettings = localStorage.getItem("defaultSettings");
  let initialDefaultSettings;
  if (!savedDefaultSettings) {
    localStorage.setItem(
      "defaultSettings",
      JSON.stringify(defaultSettingsJson)
    );
    initialDefaultSettings = defaultSettingsJson;
  } else {
    initialDefaultSettings = JSON.parse(savedDefaultSettings);
  }

  const [defaultSettings, setDefaultSettings] = useState<types.defaultSettings>(
    initialDefaultSettings
  );
  const [cityList, setCityList] = useState(
    initialDefaultSettings.defaultCityList
  );

  useEffect(() => {
    localStorage.setItem(
      "defaultSettings",
      JSON.stringify({
        ...defaultSettings,
        defaultCityList: cityList,
      })
    );
    if (cityList[0]) {
      setcurrentCity(cityList[0]);
    }
  }, [cityList]);

  const [currentCity, setcurrentCity] = useState(
    initialDefaultSettings.defaultCity
  );
  const [weatherData, setWeatherData] = useState<types.weatherData | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherObject = async () => {
      try {
        const searchCityBy = currentCity.url
          ? currentCity.url
          : currentCity.city;
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/${searchCityBy}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("ERROR: city not found");
      }
    };
    getWeatherObject();
  }, [currentCity]);

  return (
    <div className={styles.background}>
      <div
        className={`${styles.App} ${
          defaultSettings.defaultMode === "light" && styles.light
        }`}>
        <SettingsContext.Provider
          value={{
            isLightMode: defaultSettings.defaultMode === "light",
            defaultDegree: defaultSettings.defaultDegree,
            setDefaultSettings: setDefaultSettings,
          }}>
          <header className={styles.header}>
            <div className={styles.siteHeadline}>
              <h2>Weather.com</h2>
            </div>
            <SearchBar
              setcurrentCity={setcurrentCity}
              setCityList={setCityList}
              cityList={cityList}
            />
          </header>
          {loading ? (
            <Loading />
          ) : (
            <main className={styles.pageContent}>
              <CityMenu
                cityList={cityList}
                setcurrentCity={setcurrentCity}
                setCityList={setCityList}
              />
              {weatherData && (
                <>
                  <CurrentWeather
                    currentWeather={weatherData.currentWeatherDataObj}
                  />
                  <TodayForecast
                    todayForecast={weatherData.todayForecastDataObj}
                  />
                  <WeeklyForecast forecastData={weatherData.forecastDataObj} />
                  <InfoBoxes infoData={weatherData.infoDataObj} />
                </>
              )}
            </main>
          )}
        </SettingsContext.Provider>
      </div>
    </div>
  );
}

export default App;
