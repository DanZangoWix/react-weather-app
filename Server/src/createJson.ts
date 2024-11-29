import * as types from "./assets/types";

type minMaxTemp = {
  minTemp: number;
  maxTemp: number;
};

export default async function createJson(cityName: string) {
  const cityData = await (
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe56794dc68c439dac4120220241111&q=${cityName}&days=7&aqi=no&alerts=no`
    )
  ).json();

  // current weather data
  type currentWeatherData = {
    cityObj: types.cityObj;
    feelsLikeC: number;
    feelsLikeF: number;
    currTempC: number;
    currTempF: number;
    currentIcon: string;
  };

  const feelsLikeC = cityData.current.feelslike_c;
  const feelsLikeF = cityData.current.feelslike_f;
  const currTempC = cityData.current.temp_c;
  const currTempF = cityData.current.temp_f;
  const currentIcon = cityData.current.condition.icon;
  const cityObj = {
    city: cityData.location.name,
    country: cityData.location.country,
    url: undefined,
  };
  const currentWeatherDataObj: currentWeatherData = {
    cityObj,
    feelsLikeC,
    feelsLikeF,
    currTempC,
    currTempF,
    currentIcon,
  };

  // 3 days forecast data
  type forecastData = {
    minMaxTempC: minMaxTemp[];
    minMaxTempF: minMaxTemp[];
    dates: string[];
    icons: string[];
  };
  const minMaxTempC: minMaxTemp[] = [];
  const minMaxTempF: minMaxTemp[] = [];
  const dates: string[] = [];
  const icons: string[] = [];

  cityData.forecast.forecastday.map((weekday: any) => {
    minMaxTempC.push({
      minTemp: weekday.day.mintemp_c,
      maxTemp: weekday.day.maxtemp_c,
    });
    minMaxTempF.push({
      minTemp: weekday.day.mintemp_f,
      maxTemp: weekday.day.maxtemp_f,
    });

    const dateObj = new Date(weekday.date);
    dates.push(
      dateObj.toLocaleDateString("en-US", {
        weekday: "long",
      })
    );

    icons.push(weekday.day.condition.icon);
  });

  const forecastDataObj: forecastData = {
    minMaxTempC,
    minMaxTempF,
    dates,
    icons,
  };

  // today forecast data
  type todayForecastData = {
    tempByHourC: number[];
    tempByHourF: number[];
    incons: string[];
  };
  const tempByHourC = [];
  const tempByHourF = [];
  const incons = [];
  for (let i = 6; i < 24; i += 3) {
    const tempc = cityData.forecast.forecastday[0].hour[i].temp_c;
    const tempf = cityData.forecast.forecastday[0].hour[i].temp_f;
    const icon = cityData.forecast.forecastday[0].hour[i].condition.icon;
    tempByHourC.push(tempc);
    tempByHourF.push(tempf);
    incons.push(icon);
  }
  const todayForecastDataObj: todayForecastData = {
    tempByHourC,
    tempByHourF,
    incons,
  };

  // info square data
  type infoData = {
    humidity: number;
    windKph: number;
    uv: number;
    chanceOfRain: number;
    sunrise: string;
    sunset: string;
    visibility: number;
  };
  const humidity = cityData.current.humidity;
  const windKph = cityData.current.wind_kph;
  const uv = cityData.current.uv;
  const chanceOfRain =
    cityData.forecast.forecastday[0].day.daily_chance_of_rain;
  const sunrise = cityData.forecast.forecastday[0].astro.sunrise;
  const sunset = cityData.forecast.forecastday[0].astro.sunset;
  const visibility = cityData.current.vis_km;
  const infoDataObj: infoData = {
    humidity,
    windKph,
    uv,
    chanceOfRain,
    sunrise,
    sunset,
    visibility,
  };

  const weatherObject = {
    currentWeatherDataObj,
    forecastDataObj,
    todayForecastDataObj,
    infoDataObj,
  };

  return weatherObject;
}
