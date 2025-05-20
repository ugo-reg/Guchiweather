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
      if (temperatureElement) {
        let Temp = Math.round(response.data.temperature.current);
        temperatureElement.innerHTML = `${Temp}°C`;
       
      }
    }
