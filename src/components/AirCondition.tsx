import { IAirConditionProps } from "../types";

const AirCondition = ({
  airCondition,
}: {
  airCondition: IAirConditionProps;
}) => {
  return (
    <div className=" bg-gray-700 w-full rounded-md  p-2 ">
      <h1 className="mb-2 text-xl font-bold">Air Conditions</h1>
      <div className=" grid md:grid-cols-3 p-2 grid-cols-2 gap-2 place-items-center">
        <div className="">
          <h1 className="text-lg font-bold">Max Temp</h1>
          <span>{airCondition.maxtTemp} °C</span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Min Temp</h1>
          <span>{airCondition.minTemp} °C</span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Humidity</h1>
          <span>{airCondition.humidity} %</span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Wind Speed</h1>
          <span>{airCondition.windSpeed} km/h</span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Real Feel</h1>
          <span>{airCondition.realFeel} °C</span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Visibility</h1>
          <span>{airCondition.visibility} km</span>
        </div>
      </div>
    </div>
  );
};

export default AirCondition;
