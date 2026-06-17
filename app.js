let city, region, weatherData, unit, flag_unit = false, flag_mode = false;

async function updateInformation() {
    let cityName = document.querySelector("#city span");
    if (region !== null) cityName.innerText = `${city}, ${region}`;
    else cityName.innerText = city;
    unit = flag_unit ? "imperial" : "metric";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4c17c7e641b66d64d2f65a90b5ddfcae&units=${unit}`;
    let response;
    try {
    response = await fetch(url);
    } catch(error) {
        alert(`${city} is not supported by the service provider. Please try again with a different city.`);
        userLocation();
        return;
    }
    weatherData = await response.json();
    console.log(weatherData);

    // Dashboard
    let data = weatherData.list[0].main;
    document.querySelector("#condition").innerText = weatherData.list[0].weather[0].description;
    document.querySelector("#temp span").innerText = Math.round(data.temp);
    document.querySelector("#temp sub").innerText = flag_unit ? "°F" : "°C";
    document.querySelector("#temp-feel span").innerText = Math.round(data.feels_like);
    document.querySelector("#temp-feel sub").innerText = flag_unit ? " °F" : " °C";
    document.querySelector("#humidity p").innerText = `${data.humidity}%`;
    if (unit === "imperial")
        document.querySelector("#wind p").innerText = `${(weatherData.list[0].wind.speed).toFixed(2)} mp/h`;
    else
        document.querySelector("#wind p").innerText = `${(weatherData.list[0].wind.speed * 3.6).toFixed(2)} km/h`;
    let vis = weatherData.list[0].visibility / 1000;
    if (unit == "imperial")
        document.querySelector("#visibility p").innerText = `${(vis * 0.621371).toFixed(1)} mi`;
    else
        document.querySelector("#visibility p").innerText = `${vis} km`;
    document.querySelector("#pressure p").innerText = `${data.pressure} hPa`;

    // Forecast
    let dailyData = [];
    let currentDay = weatherData.list[0].dt_txt.slice(0, 10);
    let dayMin = weatherData.list[0].main.temp_min;
    let dayMax = weatherData.list[0].main.temp_max;

    for (let i = 1; i < weatherData.list.length; i++) {
        let loopDay = weatherData.list[i].dt_txt.slice(0, 10);
        
        if (loopDay === currentDay) {
            if (weatherData.list[i].main.temp_min < dayMin) dayMin = weatherData.list[i].main.temp_min;
            if (weatherData.list[i].main.temp_max > dayMax) dayMax = weatherData.list[i].main.temp_max;
        } else {
            dailyData.push({ date: currentDay, min: dayMin, max: dayMax });
            currentDay = loopDay;
            dayMin = weatherData.list[i].main.temp_min;
            dayMax = weatherData.list[i].main.temp_max;
        }
    }

    dailyData.push({ date: currentDay, min: dayMin, max: dayMax });
    document.querySelector("#upper").innerText = Math.round(dailyData[0].max) + "°";
    document.querySelector("#lower").innerText = Math.round(dailyData[0].min) + "°";

    for (let i = 1; i <= 5; i++) {
        let dayInfo = dailyData[i];
        
        if (dayInfo) {
            let dayName = new Date(dayInfo.date).toLocaleDateString('en-US', { weekday: 'short' });            
            document.querySelector(`#day${i} #day`).innerText = dayName;
            document.querySelector(`#day${i} #high`).innerText = Math.round(dayInfo.max) + "°";
            document.querySelector(`#day${i} #low`).innerText = Math.round(dayInfo.min) + "°";
        }
    }

    updateIcons();
}

async function userLocation() {
    let location = await fetch("https://ipinfo.io/json/");
    let locationData = await location.json();
    city = locationData.city;
    region = locationData.region;
    updateInformation();
}

function updateIcons() {
    let icons = document.querySelectorAll(".weatherIcon");
    const iconCodes = {
        "01d": "fa-sun", "01n": "fa-moon",
        "02d": "fa-cloud-sun", "02n": "fa-cloud-moon",
        "03d": "fa-cloud", "03n": "fa-cloud",
        "04d": "fa-cloud", "04n": "fa-cloud",
        "09d": "fa-cloud-showers-heavy", "09n": "fa-cloud-showers-heavy",
        "10d": "fa-cloud-rain", "10n": "fa-cloud-rain",
        "11d": "fa-cloud-bolt", "11n": "fa-cloud-bolt",
        "13d": "fa-snowflake", "13n": "fa-snowflake",
        "50d": "fa-smog", "50n": "fa-smog"
    };
    let i = 0;
    icons.forEach((elements, index) => {
        let code = weatherData.list[i].weather[0].icon;
        elements.className = `fa-solid ${iconCodes[code]} icon weatherIcon`;
        if (i + 8 <= 39) i += 8;
        else i = 39;
    })
}

const modeChange = () => {
    document.body.classList.toggle("dark-theme");
    flag_mode = !flag_mode;
}

document.addEventListener("DOMContentLoaded", userLocation);
document.querySelector("select").addEventListener("change", (e) => {
    city = e.target.value;
    region = null;
    updateInformation();
})
document.querySelector("#temp-unit").addEventListener("change", () => { 
    flag_unit = !flag_unit;
    updateInformation();
})
document.querySelector("#colorMode").addEventListener("change", modeChange);