import { IClimateNews } from "../types";
import { GetClimatenews } from "../useHooks";
const ClimateNews = () => {
    const res = GetClimatenews();
    const news = res?.news;
  return (
    <div className="min-w-40  bg-gray-700 grow p-2 rounded-md">
       <h1 className="mb-2 text-xl font-bold">Climate News</h1>
       <div className="flex gap-2 flex-col relative">
        {
            news?.map((article:IClimateNews)=>{
                return(
                    <div className="w-full relative h-20 rounded-lg">
                        <img src={article.thumbnail} alt="" className="rounded-lg opacity-60 absolute w-full h-full object-cover"/>
                        <div className="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <a href={article.url} target="_blank" rel="noreferrer" className="text-gray-300">{article.title}</a>
                        </div>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default ClimateNews