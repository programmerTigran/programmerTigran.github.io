let input = document.querySelector(".input");
input.addEventListener("click", function fn1() {
  let box = document.querySelector(".box");
  box.style = `height:90px;`;
  input.style = `border:1px solid black;`;
});
let error404Text = document.getElementById("error404Text");

let button = document.querySelector(".btn");
button.addEventListener("click", function fn2(e) {
  e.preventDefault();
  let box = document.querySelector(".box");
  box.style = "height:500px;";
  button.style = `border:1px solid black`;
  let city = document.querySelector(".input").value;

  const APIKey = "b874f2c0bca26f1639be613da0795b4f";

  async function getData() {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
    )
      .then((json) => json.json())
      .then((data) => {
        console.log(data);
        let img = document.querySelector(".img");
        let info = document.querySelector(".information");
        info.style = `display:block;`;
        if (data.cod == 404) {
          console.log(error404Text, "<<<<<");
          img.setAttribute("src", "./error.png");
          error404Text.innerHTML ="Failed to load resource: the server responded with a status of 404 (Not Found).";
          error404Text.style = `text-align: center; margin-top:20px;color:red;`;
          info.style = `display:none;`;
          input.style = `border-color:red;color:red;`;
        } else if (data.cod == 200) {
          if (data.weather[0].main == "Clear") {
            img.setAttribute("src", "./sun.png");
          } else if (data.weather[0].main == "Clouds") {
            img.setAttribute("src", "./cloudy.png");
          } else if (data.weather[0].main == "Rain") {
            img.setAttribute("src", "./rain.png");
          } else if (data.weather[0].main == "Snow") {
            img.setAttribute("src", "./snow.png");
          } else if (data.weather[0].main == "Haze") {
            img.setAttribute("src", "./weather.png");
          }else if (data.weather[0].main == "Mist") {
            img.setAttribute('src',"./mist.png");
          }else if (data.weather[0].main == "Thunder") {
            img.setAttribute('src',"./thunder.png");
          }
          document.querySelector("h1").innerHTML = data.main.temp + " ℃";
          document.querySelector("h2").innerHTML = data.weather[0].description;
          document.querySelector("h3").innerHTML =
            data.main.humidity + "% - humidity";
          document.querySelector("h4").innerHTML =
            data.wind.speed + " - wind speed";
        }
      });
  }
  getData();
});
