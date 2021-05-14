//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 83e94f779690c81aa55269c1ddeb8261

let weatherapi = {
    key: "83e94f779690c81aa55269c1ddeb8261",
    baseUrl: "api.openweathermap.org/data/2.5/weather?"
}


let searchinputbox = document.querySelector(".input-box");
// event listener function for key pressing
searchinputbox.addEventListener("keypress" , function (event){
    if(event.key == "Enter"){
        console.log(event.target.value);
        getweatherreport(event.target.value);
    }
});

//get weather report function
function getweatherreport(city){
    // url = weatherapi.baseUrl + "q=" + city + "&appid=" + weatherapi.key;
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=83e94f779690c81aa55269c1ddeb8261&units=metric")
    .then(weather => {return weather.json();})
    .then(showweatherreport);
}

// show report on dom
function showweatherreport(weather){
    console.log(weather);
    let city = document.querySelector(".city");
    let cityandcountry = weather.name + " , " +weather.sys.country;
    city.innerHTML = cityandcountry;    
    let temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(weather.main.temp) + "°C";
    let range = document.querySelector(".range");
    range.innerHTML = Math.round(weather.main.temp_min) + "°C (min) / " + Math.round(weather.main.temp_max) + "°C (max)"
    let title = document.querySelector(".weather-title");
    title.innerHTML = (weather.weather[0].main);

    let date = document.querySelector(".date");
    let todaydate = new Date();
    date.innerHTML = datemanage(todaydate); 
     
    if(title.textContent === 'Clear'){
        document.body.style.backgroundImage = "url('./images/clear.jfif')"
    }
    if(title.textContent === 'Clouds'){
        document.body.style.backgroundImage = "url('./images/clouds.jfif')"
    }
    if(title.textContent === 'Haze'){
        document.body.style.backgroundImage = "url('./images/haze.jfif')"
    }
    if(title.textContent === 'Rain'){
        document.body.style.backgroundImage = "url('./images/rain.jfif')"
    }
}
// date manage

function datemanage(date){
    let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" , "Sunday"];
    let months = ["January" , "February" , "March" , "April" , "May" , "June" , "July " , "August" , "September" , "October" , "November" , "December"];
    
    let d = date.getDate();
    let y = date.getFullYear();
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
     
    return d +" " + month + " ("  + day + ") " + y;
}
