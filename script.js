const apiKey = "f61f5b52a32365876d2a33a758e4d0ac";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const themeBtn = document.getElementById("themeBtn");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const feelsLike = document.querySelector(".feels-like");
const visibility = document.querySelector(".visibility");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
function displayWeather(data) {
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    city.textContent = data.name;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
     visibility.textContent = `${data.visibility / 1000} km`;
       const sunriseTime = new Date(data.sys.sunrise * 1000);

    sunrise.textContent = sunriseTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});
    const sunsetTime = new Date(data.sys.sunset * 1000);

    sunset.textContent = sunsetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});
     const weatherMain = data.weather[0].main; 
     document.body.style.backgroundImage = `url("assets/images/weather/${weatherMain.toLowerCase()}.png")`;
     document.body.style.backgroundSize = "cover";
     document.body.style.backgroundPosition = "center";
     document.body.style.backgroundRepeat = "no-repeat";      
   if (weatherMain === "Clear") {
    weatherIcon.src = "assets/images/weather/clear.png";
}
  else if (weatherMain === "Clouds") {
    weatherIcon.src = "assets/images/weather/clouds.png";
}
  else if (weatherMain === "Rain") {
    weatherIcon.src = "assets/images/weather/rain.png";
}
  else if (weatherMain === "Drizzle") {
    weatherIcon.src = "assets/images/weather/drizzle.png";
}
 else if (weatherMain === "Thunderstorm") {
    weatherIcon.src = "assets/images/weather/thunderstorm.png";
}
 else if (weatherMain === "Snow") {
    weatherIcon.src = "assets/images/weather/snow.png";
}
 else {
    weatherIcon.src = "assets/images/weather/mist.png";
}
const weather = document.querySelector(".weather");

weather.classList.remove("show");
void weather.offsetWidth;
weather.classList.add("show");


}

async function getWeather(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {

        errorMessage.textContent = "";

       
        loader.style.display = "block";
        document.querySelector(".weather").style.display = "none";
         const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        loader.style.display = "none";
        document.querySelector(".weather").style.display = "block";
    

        console.log(data);
        displayWeather(data);
      
      
    } catch (error) {

        errorMessage.textContent = error.message;

    }

}

async function getWeatherByLocation(latitude, longitude) {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();
    
    
   console.log(data);
    displayWeather(data);

}

searchBtn.addEventListener("click", () => {
    console.log("Button Clicked");

    const cityName = cityInput.value.trim();
    console.log(cityName);

    if (cityName !== "") {
        getWeather(cityName);
    }
});
cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        const cityName = cityInput.value.trim();

        getWeather(cityName);
    }

});
locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

       const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
      getWeatherByLocation(latitude, longitude);

    });

}
 else {
        alert("Geolocation is not supported by this browser.");
    }

});
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");
    }

});
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    const icon = themeBtn.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}