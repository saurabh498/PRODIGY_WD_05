const apiKey = "db160d2cae27a6ea3b0a73d60e0aa0f0";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

async function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        fetchWeather(url);
    });
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent =
            `🌡 Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent =
            data.weather[0].description;
        document.getElementById("details").textContent =
            `💧 Humidity: ${data.main.humidity}% | 💨 Wind: ${data.wind.speed} m/s`;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {
        alert("Error fetching weather data");
    }
}
