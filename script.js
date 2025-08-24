const apiKey = '2256867ac231087e74c2401c469d2175'; // Replace with valid OpenWeatherMap API Key


function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-IN', { hour12: true });
    document.getElementById('date').textContent = now.toLocaleDateString('en-IN');
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeather(city);
    } else {
        showToast('Please enter a city name');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        displayWeather(data);
    } catch (err) {
        showToast(err.message);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const description = weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    document.getElementById('weatherDetails').innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" width="80">
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
    `;

    renderWeatherAnimation(weather[0].main.toLowerCase());
}

function renderWeatherAnimation(condition) {
    const container = document.getElementById('weatherAnimation');
    container.innerHTML = ''; // Clear previous animation

    if (condition.includes('rain')) {
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.classList.add('raindrop');
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${0.8 + Math.random()}s`;
            container.appendChild(drop);
        }
    } 
    else if (condition.includes('cloud')) {
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            cloud.style.top = `${Math.random() * 30}px`;
            cloud.style.animationDuration = `${5 + Math.random() * 3}s`;
            container.appendChild(cloud);
        }
    } 
    else if (condition.includes('clear') || condition.includes('sun')) {
        const sun = document.createElement('div');
        sun.classList.add('sun');
        container.appendChild(sun);
    }
}


function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// Default weather
window.onload = () => getWeather('Delhi');

// Dark/Light Mode Toggle
document.getElementById('toggleMode').addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const modeBtn = document.getElementById('toggleMode');
    if (body.classList.contains('dark-mode')) {
        modeBtn.textContent = '☀️ Light Mode';
    } else {
        modeBtn.textContent = '🌙 Dark Mode';
    }
});
