var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function createJson(cityName) {
    return __awaiter(this, void 0, void 0, function* () {
        const cityData = yield (yield fetch(`http://api.weatherapi.com/v1/forecast.json?key=fe56794dc68c439dac4120220241111&q=${cityName}&days=7&aqi=no&alerts=no`)).json();
        const feelsLikeC = cityData.current.feelslike_c;
        const feelsLikeF = cityData.current.feelslike_f;
        const currTempC = cityData.current.temp_c;
        const currTempF = cityData.current.temp_f;
        const currentIcon = cityData.current.condition.icon;
        const currentWeatherDataObj = {
            cityName,
            feelsLikeC,
            feelsLikeF,
            currTempC,
            currTempF,
            currentIcon,
        };
        const minMaxTempC = [];
        const minMaxTempF = [];
        const dates = [];
        const icons = [];
        cityData.forecast.forecastday.map((weekday) => {
            minMaxTempC.push({
                minTemp: weekday.day.mintemp_c,
                maxTemp: weekday.day.maxtemp_c,
            });
            minMaxTempF.push({
                minTemp: weekday.day.mintemp_f,
                maxTemp: weekday.day.maxtemp_f,
            });
            const dateObj = new Date(weekday.date);
            dates.push(dateObj.toLocaleDateString("en-US", {
                weekday: "long",
            }));
            icons.push(weekday.day.condition.icon);
        });
        const forecastDataObj = {
            minMaxTempC,
            minMaxTempF,
            dates,
            icons,
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
        const todayForecastDataObj = {
            tempByHourC,
            tempByHourF,
            incons,
        };
        const humidity = cityData.current.humidity;
        const windKph = cityData.current.wind_kph;
        const uv = cityData.current.uv;
        const chanceOfRain = cityData.forecast.forecastday[0].day.daily_chance_of_rain;
        const sunrise = cityData.forecast.forecastday[0].astro.sunrise;
        const sunset = cityData.forecast.forecastday[0].astro.sunset;
        const visibility = cityData.current.vis_km;
        const infoDataObj = {
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
    });
}