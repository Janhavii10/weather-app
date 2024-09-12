import React, { useState } from 'react'
import './weather.css'
import { BsWater } from "react-icons/bs";
import { TbWind } from "react-icons/tb";

const Weather = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    async function searchCity(city) {
        if (city === '') {
            alert('Enter city name')
        }
        else {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=490e1724f014230e6fd233eb02750125`);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const data = await response.json();
                setWeatherData(data)
            } catch (error) {
                console.log('Some error occurred')
            }
        }
    }

    const handleSearch = () => {
        searchCity(city);
        setCity('')
    };

    return (
        <>
            <div className='parent'>
                <div>
                    <input type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {weatherData && (<div className='up'>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='Weather icon' />
                    <h1>{Math.round(weatherData.main.temp - 273.15)} °C</h1>
                    <h2>{weatherData.name}</h2>
                    <p>Feels Like : {Math.round(weatherData.main.feels_like - 273.15)} °C</p>
                </div>)}
                {weatherData && (<div className='down'>
                    <div className='left'>
                        <BsWater className='icon' />
                        <div className='leftr'>
                            <h4>{weatherData.main.humidity} %</h4>
                            <h5>Humidity</h5>
                        </div>
                    </div>
                    <div className='right'>
                        <TbWind className='icon' />
                        <div className='leftr'>
                            <h4>{weatherData.wind.speed} Km/h</h4>
                            <h5>Wind Speed</h5>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default Weather