import { getCoordinates,getWeatherData } from "./apiCalls.js";
import { days, weatherImages, convertUnixToTime, updateDateTime } from "./utils.js";


const locationInput = document.getElementById('locationInput');
const cityNameElement = document.querySelector('.city-name');


//Función para mostrar los datos del tiempo del día de consulta
const currentWatherData = (weatherData) =>{
    const temp = document.querySelector('.temp');
    const currentMin = document.querySelector('.currentMin');
    const currentMax = document.querySelector('.currentMax');
    const weatherImg = document.querySelector('.weather-img');
    const condition = document.querySelector('.condition')
    const currentAmanecer = document.querySelector('.currentAmanecer');
    const currentAtardecer = document.querySelector('.currentAtardecer');
    const cloud = document.querySelector('.cloud');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');

    const day = weatherData.current;
    const temperatura = Math.round(day.temp);
    const minTemp = Math.round(weatherData.daily[0].temp.min);
    const maxTemp = Math.round(weatherData.daily[0].temp.max);
    const description = day.weather[0].description;
    const image = weatherImages[description];
    const sunriseTime = convertUnixToTime(day.sunrise);
    const sunsetTime = convertUnixToTime(day.sunset);
    const cloudDay = day.clouds;
    const humidityDay = day.humidity;
    const windDay = day.wind_speed

    
    
    temp.textContent = `${temperatura}°C`;
    currentMin.textContent = `Mín: ${minTemp}°C`;
    currentMax.textContent = `Máx: ${maxTemp}°C`;
    condition.textContent = description;
    weatherImg.innerHTML = `<img src="assets/img/icons/${image}" alt="icono-amanecer" width="60" height="60">`
    currentAmanecer.textContent = `${sunriseTime}`;
    currentAtardecer.textContent = `${sunsetTime}`;
    cloud.textContent = `${cloudDay}%`;
    humidity.textContent = `${humidityDay}%`;
    wind.textContent = `${windDay} km/h`
}


//Función que toma los datos de los días de la semana
const otherDaysWatherData = (weatherData) => {
    
    const daysOfTheWeek = document.querySelector('.days-info')
    let card = ''

    const data = weatherData.daily.map(day => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = days[date.getDay()];
        const image = weatherImages[day.weather[0].description];
        const minTemp = Math.round(day.temp.min);
        const maxTemp = Math.round(day.temp.max);
        const description = day.weather[0].description;
        return { dayOfWeek, image, minTemp, maxTemp,description};
    });
    data.forEach(element => {
        card +=`
        <div class="days">
            <h5>${element.dayOfWeek}</h5>
            <div class="days-info">
                <img src="assets/img/icons/${element.image}" alt="icono-tiempo" width="60" height="60">
                <p>Min: <span class="day-min">${element.minTemp}&#176;C</span></p>
                <p>Max <span class="day-max">${element.maxTemp}&#176;C</span></p>
            </div>
        </div>
        `
    });
    daysOfTheWeek.innerHTML = card;
}


//alerta para mostrar los erroes al usuario
const showError = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
};

async function timeCity(city){
    //let city = 'talca';
    let country = 'CL'
    try {
        const { lat,lon} = await getCoordinates(city,country);
        const response =await getWeatherData(lat,lon);
        otherDaysWatherData(response);
        currentWatherData(response);
        console.log(response);
        cityNameElement.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    }catch(error){
        showError(error.message);
    }
}

timeCity('Santiago');
updateDateTime();
setInterval(updateDateTime,60000);


locationInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchCity = document.getElementById('searchCity').value;

    timeCity(searchCity);
})


