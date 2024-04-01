import { IWeatherInfoProps } from "../types";

const WeatherInfo = ({ info }: { info: IWeatherInfoProps |undefined}) => {
    return (
        <div className="flex justify-between p-2 items-center w-full ">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold sm:text-4xl">{info?.place}</h1>
                <p>{info?.timeStamp}</p>
                <p className="text-4xl">{info?.temperature}°C</p>
                <p>{info?.WeatherDescription}</p>
            </div>
            <div className="relative w-56 aspect-square ">
            <img src={info?.weatherImg} alt="weather" className="w-full h-full absolute object-cover" />
            </div>
        </div>
    )
};

export default WeatherInfo;
