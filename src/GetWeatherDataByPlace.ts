import { IWeatherData } from "./types";
import { requestHandler } from "./useHooks";
export const GetWeatherDataByPlace = async(place: string):Promise<IWeatherData>=> {
 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${
        import.meta.env.VITE_api_key
    }`;
        const res = await requestHandler(url); 
        if(!res.success){
            // window.alert("Invalid City Name");
        }
        return res;
};
