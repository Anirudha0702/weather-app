export interface IWeatherData{
    success:boolean;
    place: string;
    timeStamp:string,
    temperature: number;
    WeatherDescription: string;
    weatherImg: string;
    maxtTemp: number;
    minTemp: number;
    humidity: number;
    windSpeed: number;
    realFeel: number;
    visibility: number;
    forecasts:IForeCastData[];
}
export interface IClimateNews{
    title:string;
    thumbnail:string;
    url:string;
    published:string;
    source:string;
}
export interface IWeatherInfoProps{
    place: string;
    timeStamp:string,
    temperature: number;
    WeatherDescription: string;
    weatherImg: string;
}
export interface IForeCastData{
    time:string;
    temperature:number;
    weatherImg:string;
}
export interface IAirConditionProps{
    maxtTemp: number;
    minTemp: number;
    humidity: number;
    windSpeed: number;
    realFeel: number;
    visibility: number;
}