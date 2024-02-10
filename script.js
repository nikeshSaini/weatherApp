document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');

    function searchWeather() {
        const APIKey = '044c64118d65fa8aaaba3f90168fd71a'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
        const city = document.querySelector('#search').value.trim();
        
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found.');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherUI(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('City not found. Please enter a valid city name.');
            });
    }

    searchButton.addEventListener('click', searchWeather);
    
    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });

    function updateWeatherUI(weatherData) {
        console.log(weatherData.sys.sunrise);
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.temperature');
        const description = document.querySelector('.description');
        const humidity = document.querySelector('.humidity span');
        const wind = document.querySelector('.wind span');

        image.src = `./images/${weatherData.weather[0].main}.png`;
        temperature.innerHTML = `${Math.round(weatherData.main.temp)} <span><sup>0</sup>C</span>`;
        description.textContent = weatherData.weather[0].description;
        humidity.textContent = `${weatherData.main.humidity}%`;
        wind.textContent = `${weatherData.wind.speed} km/h`;
    }
});
