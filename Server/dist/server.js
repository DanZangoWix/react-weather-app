var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import createJson from "./createJson.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
app.get("/:cityName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityName = req.params.cityName;
    try {
        const weatherObject = yield createJson(cityName);
        res.send(weatherObject);
    }
    catch (err) {
        res.send("Error: City not found");
    }
}));
app.get("/complete/:prefix", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cityPrefix = req.params.prefix;
    const cityOptions = yield (yield fetch(`http://api.weatherapi.com/v1/search.json?key=fe56794dc68c439dac4120220241111&q=${cityPrefix}`)).json();
    res.send(cityOptions.length
        ? cityOptions.map((city) => {
            return {
                cityName: city.name,
                country: city.country,
            };
        })
        : []);
}));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
