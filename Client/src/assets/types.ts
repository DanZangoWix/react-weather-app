export type minMaxTemp = {
  minTemp: number;
  maxTemp: number;
};

export type currentWeatherData = {
  cityName: string;
  feelsLikeC: number;
  feelsLikeF: number;
  currTempC: number;
  currTempF: number;
  currentIcon: string;
};

export type forecastData = {
  minMaxTempC: minMaxTemp[];
  minMaxTempF: minMaxTemp[];
  dates: string[];
  icons: string[];
};

export type todayForecastData = {
  tempByHourC: number[];
  tempByHourF: number[];
  incons: string[];
};

export type infoData = {
  humidity: number;
  windKph: number;
  uv: number;
  chanceOfRain: number;
  sunrise: string;
  sunset: string;
  visibility: number;
  [key: string]: string | number;
};

export type weatherData = {
  currentWeatherDataObj: currentWeatherData;
  forecastDataObj: forecastData;
  todayForecastDataObj: todayForecastData;
  infoDataObj: infoData;
};
