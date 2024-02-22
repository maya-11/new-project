function updateWeatherDate (response) {
  let temperatureElement = document.querySelector("#Temperature");
  let temperature=response.data.temperature.current;
  temperatureElement.innerHTML= Math.round(temperature);
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windSpeedElement=document.querySelector("#wind-speed");
  let timeElement=document.querySelector("#time");
  let cityElement = document.querySelector("#city");
  let date = new Date (response.data.time *1000);
  let iconElement = document.querySelector ("#icon");
  
  iconElement.innerHTML =`<img src= "${response.data.condition.icon_url}" class="weather-web-icon"/>`;

  cityElement.innerHTML=response.data.city
  descriptionElement.innerHTML=response.data.condition.description
  humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML=`${response.data.wind.speed} km/h`;
  timeElement.innerHTML= formatDate(date);//`${date.getDay()} ${date.getHours()}: ${date.getMinutes()}`;
  console.log(response.data.condition.description);
  
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
  ];

let day = days[date.getDay()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "d73ctf3bea43f6379a8312bf4b4c0o1c"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(updateWeatherDate);
}

document.addEventListener("DOMContentLoaded", function() {
    let searchFormElement = document.querySelector(".search-form");
    if (searchFormElement) {
        searchFormElement.addEventListener("submit", handleSearch);
    } else {
        console.error("Search form element not found");
    }
});

function handleSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value); // Pass the search input value as a parameter
}

