const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"];

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const weatherImages = {
'nubes dispersas':'clouds.png',
'muy nuboso':'nublado2.png',
'nubes':'nubes.png',
'cielo claro':'clear.png',
'lluvia ligera':'rain.png',
'lluvia moderada':'rain.png',
'rain and snow':'snow.png',
'snow':'snow.png',
'algo de nubes':'clouds.png',
'nevada ligera':'snow.png',
'lluvia de gran intensidad': 'lluvia-intensa.png',
'nieve': 'snow.png'
};

//función para convertir los valores de milisegundos que vienen de la api
const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiplicamos por 1000 para convertir de segundos a milisegundos
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const updateDateTime = () =>{
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');

    //obtener fecha actual
    const now = new Date();

    //Formatear Hora
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    //Formatear fecha
    const daysDate = ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayName = daysDate[now.getDay()];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    const formattedDate = `${dayName} ${day} de ${monthName}`;

     // Actualizar el DOM
    timeElement.textContent = formattedTime;
    dateElement.textContent = formattedDate;
} 

export { days, weatherImages, convertUnixToTime,updateDateTime};