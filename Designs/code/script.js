// Decide on class and id names for elements
// DOM selectors
const currentWeather = document.getElementById('currentWeather')
const upcomingWeather = document.getElementById('upcomingWeather')


//const APP_ID = '94506b4af0e0a236471b8ee0da3c2281'

//local variables
let today = new Date().toLocaleDateString('en', {weekday: 'short'})
console.log(today) 

//Today's temperature, city, weather type, sunrise and sunset
fetch('https://api.openweathermap.org/data/2.5/weather?q=Rovaniemi,Finland&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        const roundedTemp = Math.round(json.main.temp * 10) / 10
        currentWeather.innerHTML += `
        <h1 class="main-temp">${roundedTemp} <span class="celsius">&#8451;</span></h1>
        <h2 class="city-name">${json.name}</h2>
        <p class="weather-type">${json.weather[0].main}</p>
        <div class="rise-set"></div>
         `

    })
//This is fetching the 5-day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=94506b4af0e0a236471b8ee0da3c2281')   
    .then((response) => {
    return response.json()
    })
    .then((forecastdata) => {
    console.log(forecastdata)

   
    //Here we declare variables for min temp at midnight and max temp at noon:
    const filteredForecastNoon = forecastdata.list.filter(item => item.dt_txt.includes('12:00')) 
    const filteredForecastMidnight = forecastdata.list.filter(item => item.dt_txt.includes('00:00:00')) 
    
    //console.log to test
    console.log('noon', filteredForecastNoon)
    console.log('midnight', filteredForecastMidnight)

    for(let day =0; day < filteredForecastNoon.length; day++) {
        //getting the weekday of forecasted temperature
        let weekDay = filteredForecastNoon[day].dt_txt
        //printing the short versin of the weekday (e.g Mon,Tue,Wed,Thu,Fri,Sat,Sun)
        let shortWeekday = new Date(weekDay).toLocaleDateString('en', {weekday: 'short'})
        //to make temperatures rounded to one decimal
        let roundedWeekMaxTemp = Math.round(filteredForecastNoon[day].main.temp_max *10) / 10
        let roundedWeekMinTemp = Math.round(filteredForecastMidnight[day].main.temp_min *10) / 10
        upcomingWeather.innerHTML += `<div>${shortWeekday} ${roundedWeekMaxTemp}<span class="celsius">&#8451;</span> / ${roundedWeekMinTemp} <span class="celsius">&#8451;</span></div>`

    }
           
})


