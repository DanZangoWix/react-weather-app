import express from "express";
import cors from "cors";
import createJson from "./createJson.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.get("/:cityName", async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const weatherObject = await createJson(cityName);
    res.send(weatherObject);
  } catch (err) {
    res.send("Error: City not found");
  }
});

app.get("/complete/:prefix", async (req, res) => {
  const cityPrefix = req.params.prefix;
  const cityOptions = await (
    await fetch(
      `http://api.weatherapi.com/v1/search.json?key=fe56794dc68c439dac4120220241111&q=${cityPrefix}`
    )
  ).json();

  res.send(
    cityOptions.length
      ? cityOptions.map((city: any) => {
          return {
            cityName: city.name,
            country: city.country,
          };
        })
      : []
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
