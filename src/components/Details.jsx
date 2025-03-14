import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { TiWeatherWindyCloudy } from "react-icons/ti";

const Details = ({ weather }) => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-2">
      <div className="w-full bg-[#EEEAF8] p-2 rounded-md flex items-center justify-center font-poppins font-semibold text-[#131222] text-sm  gap-1 border border-gray-200">
        <WiHumidity size={15} />
        {weather.main?.humidity}
      </div>
      <div className="w-full bg-[#EEEAF8] p-2 rounded-md flex items-center justify-center font-poppins font-semibold text-[#131222] text-sm gap-1 border border-gray-200">
        <FaWind />
        {weather.wind?.speed}
      </div>
      <div className="w-full h-full bg-[#EEEAF8] p-2 rounded-md flex flex-col items-center justify-center font-poppins font-semibold text-[#131222] text-sm gap-1 border border-gray-200 row-span-2">
        <div className="flex items-center gap-2">
          <TiWeatherWindyCloudy />
          {weather.main?.feels_like} °c
        </div>
        <p className="font-geist font-medium text-xs">Feels like</p>
      </div>
      <div className="w-full bg-[#EEEAF8] p-2 rounded-md  justify-center font-poppins font-semibold text-[#131222] text-sm flex items-center gap-1 border border-gray-200">
        <TiWeatherWindyCloudy />
        {weather.main?.feels_like}
      </div>
      <div className="w-full bg-[#EEEAF8] p-2 rounded-md  justify-center font-poppins font-semibold text-[#131222] text-sm flex items-center gap-1 border border-gray-200">
        <TiWeatherWindyCloudy />
        {weather.main?.feels_like}
      </div>
    </div>
  );
};

export default Details;
