import { api_key ,X_RapidAPI_Host,X_RapidAPI_Key} from "./Keys.js";
const Place = document.querySelector(".place")
const TimeStamp = document.querySelector(".timestamp")
const Temperature = document.querySelector("#temperature")
const WeatherDescription = document.querySelector("#weather_descp")
const InputBox=document.querySelector(".search_box")
const SearchBtn=document.querySelector(".search_btn")
const WeatherImg=document.querySelector(".weather_img")
const ForeCastTime=document.querySelectorAll(".time");
const ForeCastTemp=document.querySelectorAll(".forecast_temparature");
const ForecastImage=document.querySelectorAll(".forecast-cloud");
const cloudType=document.querySelectorAll(".cloud_type")
const RealFeel=document.querySelector(".real-feel + .value")
const MaxTemp=document.querySelector(".Max + .value")
const MinTemp=document.querySelector(".Min + .value")
const WindSpeed=document.querySelector(".wind + .value")
const Humidity=document.querySelector(".humidity + .value")
const Visibility=document.querySelector(".Visibility + .value")
const NewsWrapper=document.querySelector(".weather_news")
const Loader=document.querySelector(".loader")






const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=7';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': X_RapidAPI_Key,
		'X-RapidAPI-Host':X_RapidAPI_Host
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  setWeatherNews(result.articles)
} catch (error) {
	console.error(error);
}







if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=> {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      getWeatherByCoordinates(latitude,longitude)
      .then(data=>{
        setValuesToHTML(data)
        Loader.style.display="none";
      })
      .catch(err=>{
            console.log(err)
      })
    }, function(error) {
      Place.innerHTML=`Delhi ,IN`
    TimeStamp.innerHTML=`42°`
    WeatherDescription.innerHTML=`Hazy`
    });
  } 
  else {
    Place.innerHTML = "Geolocation is not available in this browser.";
    console.error("Geolocation is not available in this browser.");
  }



async function getWeatherByCoordinates(lat,lon) {
    const url=`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`
    const resp = await fetch(url)
    const respData = await resp.json()
   return respData;
}
async function getWeatherByCity(city) {
  Loader.style.display="flex";
  const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`
  const resp = await fetch(url)
  const respData = await resp.json()
  setValuesToHTML(respData)
  Loader.style.display="none";
}
function setWeatherNews(articles){
  console.log(articles)
  for(let i=0;i<articles.length;i++){
    NewsWrapper.innerHTML+=`
    <a href="${articles[i].url}">
      <div class="news">
        <div class="news_img">
          <img src="${articles[i].thumbnail}" alt="" class="img">
        </div>
        <p class="news_content">
          ${articles[i].title}

        </p>
      </div>
    </a>
    `;
  }
}






















function setValuesToHTML(data){
    const date=new Date()
    const tomorrowIndex=9-Math.floor(date.getHours()/3);
    console.log(data.list[tomorrowIndex].dt_txt,tomorrowIndex);
    Place.innerHTML=`${data.city.name},${data.city.country}`
    TimeStamp.innerHTML=`${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'long' })}  ${date.getDate()} ${date.getFullYear()}`
    Temperature.innerHTML=`${Math.round(data.list[1].main.temp)}°`
    WeatherDescription.innerHTML=`${data.list[1].weather[0].description}`
    WeatherImg.src=`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png`;
    MaxTemp.innerHTML=`${Math.round(data.list[1].main.temp_max)}°`
    MinTemp.innerHTML=`${Math.round(data.list[1].main.temp_min)}°`
    RealFeel.innerHTML=`${Math.round(data.list[1].main.feels_like)}°`
    WindSpeed.innerHTML=`${Math.round(data.list[1].wind.speed)} km/h`
    Humidity.innerHTML=`${Math.round(data.list[1].main.humidity)}%`
    Visibility.innerHTML=`${Math.round(data.list[1].visibility/1000)} km`


    for(let i=0;i<ForeCastTime.length;i++){
      ForeCastTime[i].innerHTML=`${data.list[i+tomorrowIndex].dt_txt.split(" ")[1].split(":")[0]}:00`
      ForeCastTemp[i].innerHTML=`${Math.round(data.list[i+tomorrowIndex].main.temp)}°`
      ForecastImage[i].src=`https://openweathermap.org/img/wn/${data.list[i+tomorrowIndex].weather[0].icon}.png`;
      cloudType[i].dataset.description=`${data.list[i+tomorrowIndex].weather[0].description}`
    }
}













SearchBtn.addEventListener("click",()=>{
  getWeatherByCity(InputBox.value)
})
InputBox.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
     getWeatherByCity(event.target.value)
  }
});