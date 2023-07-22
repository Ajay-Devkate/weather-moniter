const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";

      
    }
    else {
        var data = await response.json();

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + "°c";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".city").innerHTML = data.name;
    
        if(data.weather[0].main =="Clouds"){
            weatherIcon.src = "assets/clouds.png";
        } 
        else if (data.weather[0].main =="Clear"){
            weatherIcon.src = "assets/clear.png";
        }
        else if (data.weather[0].main =="Rain"){
            weatherIcon.src = "assets/rain.png";
        }
        else if (data.weather[0].main =="Drizzle"){
            weatherIcon.src = "assets/drizzle.png";
        }
        else if (data.weather[0].main =="Mist"){
            weatherIcon.src = "assets/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector('.error').style.display = "none";


        var tl = gsap.timeline();
        tl.from(".weather-icon",{
            opacity:0,
            duration:1,
            scale:0
        })
        tl.from(".temp, .city",{
            opacity:0,
            duration:0.5
        })
        tl.from(".col",{
            opacity:0,
            duration:0.5
        })

    }
    
}

searchBtn.addEventListener("click",()=>{
    checkweather(searchBox.value);
})

checkweather();