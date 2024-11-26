const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector("#cityInput");
const card = document.querySelector(".card");
const apiKey ="102671856b2f8786ffc6099347cbfa15";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error.message);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    } 
    return await response.json();

    console.log(response);

}

function displayWeatherInfo(data){
    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}],
        } = data;
    
    card.textContent = "";
    card.style.display ="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Condition: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}
function getWeatherEmoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; 
    if (weatherId >= 300 && weatherId < 500) return "🌦️"; 
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️"; 
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; 
    if (weatherId === 800) return "☀️"; 
    if (weatherId > 800) return "☁️"; 
    return "🌍"; 

}

function displayError(message){
 
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}