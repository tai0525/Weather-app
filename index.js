const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.getElementById('input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const backgroundImg = document.querySelector('body');

search.addEventListener('click', checkWeather);

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkWeather();
    }
});
async function checkWeather() {

    const APIkey = 'ea6912f4d4610082820cd308103997c3';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1498496294664-d9372eb521f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D)';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1438449805896-28a666819a20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
                    break;

                case 'Drizzle':
                    image.src = 'images/drizzle.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1438449805896-28a666819a20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
                    break;

                case 'Clouds':
                    image.src = 'images/clouds.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1603437873662-dc1f44901825?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1502201684351-c156ded4d3c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGF6ZXxlbnwwfHwwfHx8MA%3D%3D)';
                    break;

                default:
                    image.src = 'images/clouds.png';
                    backgroundImg.style.backgroundImage = 'url(https://images.unsplash.com/photo-1581713872605-b9dfbc84eaa4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

            }

            temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
            if (json.main.temp > 35) {
                temperature.style.color = 'crimson'
            } else if (json.main.temp < 0) {
                temperature.style.color = 'skyblue'
            } else (temperature.style.color = ' #06283d');
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
};
