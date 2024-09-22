"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=a6bd2baf1e5f4f2f934172658242209&q=${location}&days=5&aqi=yes&alerts=yes`);
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      fetchData();
    }

  }, [location]);

  return (
    <div className="container">
      <h1 className='flex text-[25px] justify-center mt-10 mb-10'> 5 Günlük Hava Durumu</h1>
      <div className='flex justify-center' >
        <input
          className='border-2 bg-gray-400 outline-none p-3 w-10/12  rounded-[20px] capitalize mb-10 placeholder:text-black'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          type="text"
          placeholder='Şehir adı giriniz..'
        />
      </div>

      <div>
        {weatherData && weatherData.forecast && (
          <div>
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date}>
                <h2 className='flex justify-center text-[18px]'>Tarih : {day.date}</h2>
                <div className='flex justify-center gap-5'>
                  <img
                    className='size-[40px]'
                    src={day.day.condition.icon} alt="" />
                  <p className='text-[18px] mt-3'> {day.day.avgtemp_c} C </p>
                  <p className='text-[18px] mt-3'> {day.day.condition.text} </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <hr className='w-10/12 flex justify-center ml-[80px] border-black' />
        <p className='flex justify-center mt-[20px]'>Created by : Atakan</p>
      </div>
    </div>
  );
};

export default Page;
