import { useState } from "react";
import AsyncSelect from "react-select/async";
import { TiWeatherSnow } from "react-icons/ti";
import { MdDarkMode } from "react-icons/md";
import Details from "./Details";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

const Home = () => {
  const [weather, setWeather] = useState(null);

  // Fungsi fetch daftar kota (autocomplete)
  const fetchCities = async (input) => {
    if (!input) return [];

    try {
      const res = await fetch(`${GEO_URL}?q=${input}&limit=5&appid=${API_KEY}`);
      const data = await res.json();

      return data.map((city) => ({
        value: { lat: city.lat, lon: city.lon },
        label: `${city.name}, ${city.country}`,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  // Fetch cuaca berdasarkan lat & lon
  const fetchWeather = async (selected) => {
    if (!selected) return;
    try {
      const { lat, lon } = selected.value;
      const res = await fetch(
        `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center font-geist py-2 px-4">
      <title>Weathery | Zaychik</title>
      <div className="bg-white border border-gray-300 shadow-gray-600 shadow-md md:p-4 p-2 rounded-lg relative">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TiWeatherSnow size={25} className="text-yellow-400" />
              <h1 className="font-poppins font-semibold text-lg text-[#131222]">
                Weathery
              </h1>
            </div>
            <MdDarkMode
              size={30}
              className="text-[#131222] p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            />
          </div>
          <AsyncSelect
            cacheOptions
            loadOptions={fetchCities}
            onChange={fetchWeather}
            placeholder="Cari kota..."
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "7px",
                padding: "0px 8px 0px 8px",
                backgroundColor: "#EEEAF8FF",
                border: "1px solid white",
              }),
            }}
            className="text-sm min-w-[20em] w-full relative z-10"
          />
        </div>

        {weather && (
          <div className="flex flex-col items-center pt-4 overflow-hidden relative p-2 mt-2 bg-[#EEEAF8FF] rounded-md text-[#131222]">
            {/* <div id="radial" className="z-1 right-[75px] top-[40px]"></div> */}
            <h2 className="relative z-2 font-poppins text-xl font-bold uppercase">
              {weather.name}, {weather.sys?.country}
            </h2>
            <div className="bg-[#131222] rounded-lg my-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
                className="relative z-2"
              />
            </div>
            <h2 className="relative z-2 font-poppins font-bold text-xl">
              {weather.main?.temp} °c
            </h2>
            <h2 className="relative z-2">
              {weather.weather?.[0]?.description}
            </h2>
            <div className="w-full bg-[#131222] md:p-4 p-2 rounded-md mt-2">
              {weather && <Details weather={weather} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
