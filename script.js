const locationUrl = "https://get.geojs.io/v1/ip/geo.json";
const ulList = document.getElementById("ulList");
const ulList2 = document.getElementById("ulList2");
const caption = document.getElementById("caption");


getLocationWeatherURL();

async function getLocationWeatherURL() {
  const locationData = await fetch(locationUrl);
  const locationJson = await locationData.json();
  const { country, city, latitude, longitude } = locationJson;
  let locationWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  showWeather(country, city, locationWeatherURL);
}

async function showWeather(country, city, locationWeatherURL) {
  const weatherData = await fetch(locationWeatherURL);
  const weatherJson = await weatherData.json();
  const { temperature, windspeed, weathercode } = weatherJson.current_weather;


  let captionText = `Weather by your IP  ${city} (${country})`;
  caption.append(captionText);

  let liTemperature = document.createElement("li");
  liTemperature.textContent = `temperature: ${temperature} C`;

  let liWindspeed = document.createElement("li");
  liWindspeed.textContent = `windspeed: ${windspeed} km/h`;

  let liWeatherсode = document.createElement("li");
  liWeatherсode.textContent = `${weatherDescription(weathercode)}`;


  ulList.append(liTemperature, liWindspeed, liWeatherсode);
}


function weatherDescription(weathercode) {
  switch (weathercode) {
    case 1: return "Mainly clear";
    case 2: return "partly cloudy";
    case 3: return "overcast";

    case 45: return "Fog";
    case 48: return "depositing rime fog";

    case 51: return "Drizzle: Ligh";
    case 53: return "Drizzle: moderate";
    case 55: return "Drizzle: dense intensity";

    case 56: return "Freezing Drizzle: Light ";
    case 57: return "Freezing Drizzle: dense intensity";

    case 61: return "Rain: Slight";
    case 63: return "Rain:  moderate";
    case 65: return "Rain:  heavy intensity";

    case 66: return "Freezing Rain: Light ";
    case 67: return "Freezing Rain:  heavy intensity";

    case 71: return "Snow fall: Slight";
    case 73: return "Snow fall:  moderate, and heavy intensit";
    case 75: return "Snow fall: heavy intensity";

    case 77: return "now grains";

    case 80: return "Rain showers: Slight";
    case 81: return "Rain showers: moderate";
    case 82: return "Rain showers: violent";

    case 85: "Snow showers slight "
    case 86: "Snow showers  heavy"

    case 95:
      return "Thunderstorm: Slight or moderate";

    case 96: return "Thunderstorm with slight hail"
    case 99: return "Thunderstorm with heavy hail"

    default:
      return `Unknown weather code ${weathercode}`

  }
}

getLocationWeatherURL2();
//Вариант с использованием  navigator.geolocation.getCurrentPosition
 function getLocationWeatherURL2() {
  let latitude = 0;
  let longitude = 0;
  const successCallback = (position) => {
     latitude =  position.coords.latitude;
     longitude =  position.coords.longitude;
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
  let locationWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  showWeather2(locationWeatherURL);

}



async function showWeather2(locationWeatherURL) {
  let weatherData = await fetch(locationWeatherURL);
  let weatherJson = await weatherData.json();
  
   const { temperature, windspeed, weathercode } = weatherJson.current_weather;

  let captionText = `Weather by your browser location`;
  caption2.append(captionText);

  let liTemperature = document.createElement("li");
  liTemperature.textContent = `temperature: ${temperature} C`;

  let liWindspeed = document.createElement("li");
  liWindspeed.textContent = `windspeed: ${windspeed} km/h`;

  let liWeatherсode = document.createElement("li");
  liWeatherсode.textContent = `${weatherDescription(weathercode)}`;


  ulList2.append(liTemperature, liWindspeed, liWeatherсode);

}



/*

const successCallback = (position) => {
    console.log(position);
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  */