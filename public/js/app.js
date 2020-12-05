const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageWeather = document.querySelector(".weather");
const messageStatus = document.querySelector(".status");
const messageLocation = document.querySelector(".location");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageStatus.textContent = "Loading...";
  messageWeather.textContent = "";

  fetch(`/weather?address=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageLocation.textContent = "";
        return (messageStatus.textContent = data.error);
      }
      messageLocation.textContent = data.location;
      messageWeather.textContent = `Temperature in city of ${data.address} is: ${data.forecast.currentTemperature}`;
      messageStatus.textContent = "";
    })
    .catch((error) => {
      console.log(error);
      messageStatus.textContent = error;
    });
});
