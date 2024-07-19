const apiKey = '';
const weatherIcons = {
    Clear: 'fa-sun',
    Clouds: 'fa-cloud',
    Rain: 'fa-cloud-showers-heavy',
    Thunderstorm: 'fa-bolt',
    Drizzle: 'fa-cloud-rain',
    Snow: 'fa-snowflake',
    Mist: 'fa-smog'
};

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherResult = document.getElementById('weatherResult');
            const weatherDescription = data.weather[0].description;
            const weatherIcon = weatherIcons[data.weather[0].main] || 'fa-question-circle';
            
            weatherResult.innerHTML = `
                <h3>${data.name}</h3>
                <p><i class="fas ${weatherIcon}"></i> ${weatherDescription}</p>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Humidade: ${data.main.humidity}%</p>
                <p>Vento: ${data.wind.speed} m/s</p>
            `;
        } else {
            alert('Cidade não encontrada');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        alert('Erro ao buscar dados do clima');
    }
}

document.getElementById('city').addEventListener('change', getWeather);
