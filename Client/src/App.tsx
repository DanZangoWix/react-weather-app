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

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cityList, setCityList] = useState(["Tel Aviv", "New York", "Paris"]);
  const [city, setCity] = useState("Tel Aviv");
  const [weatherData, setWeatherData] = useState<types.weatherData | null>(
    null
  );
  // const defaultCity = "Tel Aviv";

  useEffect(() => {
    const getWeatherObject = async () => {
      await axios
        .get(`http://localhost:3001/${city}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log("ERROR: city not found");
        });
    };
    getWeatherObject();
  }, [city]);

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.siteHeadline}>
          <h1>Weather.com</h1>
        </div>
        <SearchBar setCity={setCity} setCityList={setCityList} />
      </div>

      <div className={styles.pageContent}>
        <CityMenu cityList={cityList} setCity={setCity} />
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
      </div>
    </div>
  );
}

export default App;
