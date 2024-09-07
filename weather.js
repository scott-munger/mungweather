document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('city').value;
    const apiKey = '8b980e2f490ed06ed50b35751e55579c';  // Remplacez par votre clé API

    // Obtenez les coordonnées géographiques de la ville
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;

            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.getElementById('weatherData').innerHTML = 'Erreur lors de la récupération des données.';
        });
});

function displayWeather(data) {
    const windContainer = document.getElementById('wind');
    const precipitationContainer = document.getElementById('precipitations');
    const temperatureContainer = document.getElementById('temperature');
    const descriptionContainer = document.getElementById('description');

    const daily = data.daily;

    let windHtml = '<h2>Vitesse du Vent</h2>';
    let precipitationHtml = '<h2>Précipitations</h2>';
    let temperatureHtml = '<h2>Température</h2>';
    let descriptionHtml = '<h2>Description</h2>';

    daily.forEach((day, index) => {
        if (index < 7) {  // Limiter à 7 jours
            const date = new Date(day.dt * 1000).toLocaleDateString();
            const windSpeed = day.wind_speed;
            const precipitation = day.pop * 100;  // `pop` est la probabilité de précipitations (0-1)
            const temp = day.temp.day;
            const description = day.weather[0].description;

            windHtml += `
                <div>
                    <h3>${date}</h3>
                    <p>Vitesse du vent : ${windSpeed} m/s</p>
                </div>
            `;

            precipitationHtml += `
                <div>
                    <h3>${date}</h3>
                    <p>Précipitations : ${precipitation.toFixed(2)} %</p>
                </div>
            `;

            temperatureHtml += `
                <div>
                    <h3>${date}</h3>
                    <p>Température : ${temp} °C</p>
                </div>
            `;

            descriptionHtml += `
                <div>
                    <h3>${date}</h3>
                    <p>Conditions : ${description}</p>
                </div>
            `;
        }
    });

    windContainer.innerHTML = windHtml;
    precipitationContainer.innerHTML = precipitationHtml;
    temperatureContainer.innerHTML = temperatureHtml;
    descriptionContainer.innerHTML = descriptionHtml;
}
