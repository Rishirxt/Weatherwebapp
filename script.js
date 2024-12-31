const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.notfound');

search.addEventListener('click',() => {
    const APIKey= '8b24a7b15cb8afd24988fea29b669004';
    const city=document.querySelector('.search-box input').value;

    if (city=='')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(Response=>Response.json()).then(json=>{
        
        if (json.cod=='404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');


        const image      =document.querySelector('.weather-box img');
        const temperature= document.querySelector('.weather-box .temperature');
        const description= document.querySelector('.weather-box .description');
        const humidity=    document.querySelector('.weather-details .humidity span');
        const wind=        document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src='pngs/clear.png';
                break;
            
            case 'Rain':
                image.src='pngs/rain.png';
                break;
            
            case 'Snow':
                image.src='pngs/snow.png';
                break;   

            case 'Clouds':
                image.src='pngs/cloud.png';
                break; 

            case 'Mist':
                image.src='pngs/mist.png';
                break;

            case 'Haze':
                image.src='pngs/mist.png';
                break;
            default:
                image.src='pngs/cloud.png';

        }
        temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
    })
})