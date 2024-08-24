import { APIKEY } from "./config.js";

//Función para obtener las coordenadas de una ciudad
export const getCoordinates = async (city,country) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&lang=es&appid=${APIKEY}`;
    try {
        const response = await fetch(geoUrl);
        if (!response.ok){
            throw new Error('ciudad no encontrada');
        }
        const [locationData] = await response.json();
        if (!locationData){
            throw new Error('Localización no encontrada');
        }
        
        return{
            lat:locationData.lat,
            lon:locationData.lon
        }
        
        
    }catch (error){
        console.error('Error:', error.message);
        throw error;
    }
};

//Función para obtener los datos climaticos 
export const getWeatherData = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=es&appid=${APIKEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const weatherData = await response.json();
        //console.log(weatherData);
        return weatherData
    } catch (error) {
        console.error('Error:', error.message);
    }
};