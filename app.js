// DOM Elements
const searchBoxInput = document.querySelector(".searchBox_input");
const searchButton = document.querySelector(".search_png");
const mainPicture = document.querySelector(".mainPicture");
const titleCity = document.querySelector(".title__city");
const titleTemp = document.querySelector(".title__temp");
const status = document.querySelector(".status");
const humidity = document.querySelector(".humidity__info h5");
const wind = document.querySelector(".wind__info h5");
const card = document.querySelector(".card");
const information = document.querySelector(".information");
const failed = document.querySelector(".failed");
const failedTitle = document.querySelector(".failed__title");

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData() {
    const apiKey = "a4722a68540ba231450d08e41118ed7f";
    const cityName = searchBoxInput.value.trim();
    
    // Check if input is empty
    if (cityName === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            // Check for invalid city
            if (data.cod === "404") {
                showError("City not found!");
            } else {
                updateWeatherUI(data);
            }
        })
        .catch(() => {
            showError("Network Error!");
        });

    searchBoxInput.value = "";
}

// Display error message
function showError(message) {
    card.style.height = "69rem";
    information.style.display = "none";
    failed.style.display = "block";
    failedTitle.innerText = message;
}

// Update the DOM with weather data
function updateWeatherUI(data) {
    card.style.height = "69rem";

    // Set appropriate weather image
    const weatherCondition = data.weather[0].main;
    const weatherIcons = {
        Clouds: "/img/cloud.png",
        Clear: "/img/sun.png",
        Snow: "/img/snow.png",
        Mist: "/img/mist.png",
        Rain: "/img/rain.png",
        Haze: "/img/haze.png",
        Wind: "/img/wind.png"
    };

    mainPicture.src = weatherIcons[weatherCondition] || "/img/rain.png";

    // Update DOM elements with weather information
    titleCity.innerText = data.name;
    titleTemp.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
    status.innerText = weatherCondition;
    wind.innerText = `${Math.floor(data.wind.speed)} Km/h`;
    humidity.innerText = `${data.main.humidity}%`;

    failed.style.display = "none";
    information.style.display = "flex";
}

// Event listeners for search button and enter key
searchButton.addEventListener("click", fetchWeatherData);
searchBoxInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeatherData();
    }
});