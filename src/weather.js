function search(event){
    event.preventDefault()
    let searchElement=document.querySelector("#search-form-input");
    let h1=document.querySelector("h1");
    h1.innerHTML=`${searchElement.value}`;
    weather()
}
let form=document.querySelector("#form");
form.addEventListener("submit", search);


    function weather() {
      let cityInput = document.querySelector("#search-form-input").value;
      let apiKey = "3ee9046f22cb8dtcf3aa949o097a3347";
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
    }

    function displayTemperature(response) {
      let temperatureElement = document.querySelector("#temperature");
      let cloudELement= document.querySelector("#cloud")
      let humidityElement=document.querySelector("#detail")
      let windElement=document.querySelector("#details")
      let timeElement=document.querySelector("#time")
      let date= new Date(response.data.time * 1000) 
     
      let iconElement = document.querySelector("#weather-icon")
        
      
      if (temperatureElement) {
        let Temp = Math.round(response.data.temperature.current);
       let cloud=response.data.condition.description;
       let humidity=response.data.temperature.humidity;
       let wind=response.data.wind.speed;
       
        temperatureElement.innerHTML = `${Temp}°C`;
        cloudELement.innerHTML= `${cloud}`;
        humidityElement.innerHTML=`${humidity}%`;
        windElement.innerHTML=`${wind}km/h`;
        timeElement.innerHTML= formatDate(date);
        iconElement.innerHTML = `<img src=${response.data.condition.icon_url} />`;
        getForecast(response.data.city);
      }
    }
    
    function formatDate(date){
       
        let minutes=date.getMinutes();
        let hours= date.getHours();
        let days= ["Sunday", 
            "Monday",
             "Tuesday", 
             "Wednesday", 
             "Thursday", 
             "Friday", 
             "Saturday"];
        let day = days[date.getDay()];

        if(minutes< 10){
            minutes=`0${minutes}`;
        }

        return `${day} ${hours}: ${minutes}`
    }

    function formatDay(timestamp) {
      let date = new Date(timestamp * 1000);
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      return days[date.getDay()];
    }

    function getForecast(city) {
      let apiKey = "3ee9046f22cb8dtcf3aa949o097a3347";
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForeCast);
    }

    function displayForeCast(response){
 

        let forecastHtml = "";
      
        response.data.daily.forEach(function (day, index) {
          if (index > 0 && index < 6) {
          forecastHtml =
            forecastHtml +
            `
          <div class="weather-forecast">
                  <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div ><img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"</div> 
              <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature"> ${Math.round(
                    day.temperature.maximum
                  )}&deg;C </div>
                  <div class="weather-forecast-temperature">${Math.round(
                    day.temperature.minimum
                  )}&deg;</div>
          </div>
          </div>
      `;
              }
        });
        let forecast = document.querySelector("#weather-forecast-day");
        forecast.innerHTML = forecastHtml;
      } 