const searchBox_input = document.querySelector(".searchBox_input");
const search_png = document.querySelector(".search_png");
const mainPicture = document.querySelector(".mainPicture");
const title__city = document.querySelector(".title__city");
const title__temp = document.querySelector(".title__temp");
const status = document.querySelector(".status");
const humidity = document.querySelector(".humidity__info h5");
const wind = document.querySelector(".wind__info h5");
const card = document.querySelector(".card");
const information = document.querySelector(".information");

function fetchHandler(){
    const apiKey = "a4722a68540ba231450d08e41118ed7f";
    const cityName = searchBox_input.value;
    if (cityName == ''){
        return
    };
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        domHandler(data);
    });
    searchBox_input.value = "";
}

function domHandler(fullData){
    card.style.height = "69rem";
    switch(fullData.weather[0].main){
        case "Clouds": mainPicture.src ="/img/cloud.png";
        break;

        case "Clear": mainPicture.src ="/img/sun.png";
        break;

        case "Snow": mainPicture.src ="/img/snow.png";
        break;

        case "Mist": mainPicture.src ="/img/mist.png";
        break;

        case "Rain": mainPicture.src ="/img/rain.png";
        break;

        case "Haze": mainPicture.src ="/img/haze.png";
        break;

        case "Wind": mainPicture.src ="/img/wind.png";
        break;

        default:
        main_picture.src ="/img/rain.png";
    };
    title__city.innerText = fullData.name;
    title__temp.innerText = `${Math.floor((+fullData.main.temp - 273.15 ))}°C`;
    status.innerText = fullData.weather[0].main;
    wind.innerText = `${Math.floor(fullData.wind.speed)}Km/h`;
    humidity.innerText = `${fullData.main.humidity}%`;
    information.style.visibility = "visible";
}

search_png.addEventListener("click",fetchHandler);
searchBox_input.addEventListener("keydown",(event) => {
    if(event.key == "Enter"){
        fetchHandler();
    };
})