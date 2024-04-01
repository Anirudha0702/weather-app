import WeatherInfo from "./components/WeatherInfo";
import { IWeatherData } from "./types";
import { GetWeatherDataByCoords } from "./useHooks";
import { GetWeatherDataByPlace } from "./GetWeatherDataByPlace";
import { useState, useEffect } from "react";
import ForeCast from "./components/ForeCast";
import AirCondition from "./components/AirCondition";
import ClimateNews from "./components/ClimateNews";

function App() {
  const wetherData = GetWeatherDataByCoords();
  const [place, setPlace] = useState<string>("");
  const [display, setDisplay] = useState<IWeatherData>();
  useEffect(() => {
    setDisplay(wetherData);
  }, [wetherData]);
  const handleSearch = async () => {
    const data = await GetWeatherDataByPlace(place);
    setDisplay(data);
  };
  return (
    <div className="flex flex-wrap gap-2 p-2">
      <div className="gap-2 flex flex-col md:w-2/3  w-full rounded-lg">
        <div className="bg-base-200 flex gap-2 p-2 ">
          <input
            type="text"
            placeholder="Enter City name"
            className="input input-bordered w-full "
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="btn btn-active btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <WeatherInfo
          info={{
            place: display?.place ? display.place : "",
            timeStamp: display?.timeStamp ? display.timeStamp : "",
            temperature: display?.temperature ? display.temperature : 0,
            WeatherDescription: display?.WeatherDescription
              ? display.WeatherDescription
              : "",
            weatherImg: display?.weatherImg ? display?.weatherImg : "",
          }}
        />
        <ForeCast foreCasts={display?.forecasts} />
        <AirCondition
          airCondition={{
            maxtTemp: display?.maxtTemp ? display.maxtTemp : 0,
            minTemp: display?.minTemp ? display.minTemp : 0,
            humidity: display?.humidity ? display.humidity : 0,
            windSpeed: display?.windSpeed ? display.windSpeed : 0,
            realFeel: display?.realFeel ? display.realFeel : 0,
            visibility: display?.visibility ? display.visibility : 0,
          }}
        />
      </div>
      <ClimateNews/>
    </div>
  );
}

export default App;
