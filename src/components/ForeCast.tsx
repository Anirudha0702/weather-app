import { IForeCastData } from "../types"

const ForeCast = ({foreCasts}:{foreCasts:IForeCastData[]|undefined}) => {
  return (
    <div className=" bg-gray-700 w-full rounded-md  p-2 ">
        <h1 className="mb-2 text-xl font-bold">Tomorrow's forecast</h1>
        <div className=" pb-4 gap-3 flex  overflow-x-scroll overflow-y-hidden [&>*:nth-child(8)]:border-r-0">
        {
            foreCasts?.map((data,index)=>{
                return(
                    <div key={index} className=" w-28  shrink-0 flex flex-col justify-center items-center border-gray-50 border-r-2">
                        <h1 className="text-2xl font-bold ">{data.time}</h1>
                        <div className="relative w-16 aspect-square ">
                            <img src={data.weatherImg} alt="weather" className="w-full h-full absolute object-cover" />
                        </div>
                        <span>{data.temperature} °C</span>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default ForeCast