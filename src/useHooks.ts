import axios from "axios";
import { IClimateNews, IWeatherData } from "./types";
import { useEffect, useState } from "react";
export const requestHandler = async (
  url: string,
  option = {}
): Promise<IWeatherData> => {
  const info: IWeatherData = {
    success: false,
    place: "",
    timeStamp: "",
    temperature: 0,
    WeatherDescription: "",
    weatherImg: "",
    maxtTemp: 0,
    minTemp: 0,
    humidity: 0,
    windSpeed: 0,
    realFeel: 0,
    visibility: 0,
    forecasts: [],
  };
  try {
    const { data } = await axios.get(url, option);
    const date = new Date();
    const forecast = [] as IWeatherData["forecasts"];
    const tomorrowIndex = 9 - Math.floor(date.getHours() / 3);
    for (let i = 0; i < 8; ++i) {
      const forecastData = {
        time: `${
          data.list[i + tomorrowIndex].dt_txt.split(" ")[1].split(":")[0]
        }:00`,
        temperature: Math.round(data.list[i + tomorrowIndex].main.temp),
        weatherImg: `https://openweathermap.org/img/wn/${
          data.list[i + tomorrowIndex].weather[0].icon
        }.png`,
      };
      forecast.push(forecastData);
    }
    info.place = `${data.city.name},${data.city.country}`;
    info.timeStamp = `${date.toLocaleDateString("en-US", {
      weekday: "long",
    })}, ${date.toLocaleDateString("en-US", {
      month: "long",
    })}  ${date.getDate()} ${date.getFullYear()}`;
    info.temperature = Math.round(data.list[1].main.temp);
    info.WeatherDescription = `${data.list[1].weather[0].description}`;
    info.weatherImg = `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png`;
    info.maxtTemp = Math.round(data.list[1].main.temp_max);
    info.minTemp = Math.round(data.list[1].main.temp_min);
    info.humidity = data.list[1].main.humidity;
    info.windSpeed = data.list[1].wind.speed;
    info.realFeel = Math.round(data.list[1].main.feels_like);
    info.visibility = data.list[1].visibility / 1000;
    info.success = true;
    info.forecasts = forecast;
  } catch (error) {
    window.alert("Geo Location not available or Invalid City Name");
    console.log(error)
  }
  return info;
};

export const GetWeatherDataByCoords = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherData({
        success: false,
        place: "",
        timeStamp: "",
        temperature: 0,
        WeatherDescription: "",
        weatherImg: "",
        maxtTemp: 0,
        minTemp: 0,
        humidity: 0,
        windSpeed: 0,
        realFeel: 0,
        visibility: 0,
        forecasts: [],
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${
          position.coords.latitude
        }&lon=${position.coords.longitude}&units=metric&appid=${
          import.meta.env.VITE_api_key
        }`;
        requestHandler(url)
          .then((data: IWeatherData) => {
            setWeatherData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, []);
  return weatherData;
};
interface T{
  success:boolean;
  news:IClimateNews[];
}
export const GetClimatenews = () => {
  const [climateNews, setClimateNews] = useState<T>();
  useEffect(() => {
    const url = "https://climate-news-feed.p.rapidapi.com/page/1?limit=7";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
        "X-RapidAPI-Host": import.meta.env.VITE_X_RapidAPI_Host,
      },
    };
    axios
      .get(url, options)
      .then((response) => {
        const data = {
          success: true,
          news: response.data.articles.map((article: IClimateNews) => {
            return article;
          }),
        };
        setClimateNews(data);
      })
      .catch((error) => {
        console.log(error);
        setClimateNews({
          success: false,
          news: [],
        });
      });
  }, []);

  return climateNews;
};
