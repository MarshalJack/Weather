let mode = 0;
let crd;
let btn = document.querySelector("button");
let TodayMode = document.querySelector("#Today");
let DaysMode = document.getElementById("5days");
TodayMode.addEventListener("click", () => {
  mode = 0;
  TodayMode.style.boxShadow = "0 0 10px 5px inset rgba(0, 0, 0, 0.5)";
  DaysMode.style.boxShadow = "none";
  request();
});
DaysMode.addEventListener("click", () => {
  DaysMode.style.boxShadow = "0 0 10px 5px inset rgba(0, 0, 0, 0.5)";
  TodayMode.style.boxShadow = "none";
  mode = 1;
  request();
});
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

//---------------------------------------------Functions-------------------------------------------------
function errorCathcer(json, obj) {
  obj = json;
  if (obj.cod == "404") {
    document.querySelector("#error").style.display = "flex";
    document.querySelector("#days").style.display = "none";
    document.querySelector(".current").style.display = "none";
    document.querySelector(".hourly").style.display = "none";
    return true;
  } else document.querySelector("#error").style.display = "none";
  return false;
}
function current(json, obj) {
  if (errorCathcer(json, obj) == true) return;
  if (mode == 0) {
    obj = json;
    console.log(obj);
    document.querySelector(".current").style.display = "block";

    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = date.getMonth();
    if (month < 10) {
      month = "0" + month;
    }
    let year = date.getFullYear();
    document.querySelector(".Title").innerHTML = "CURRENT WEATHER";
    if (obj.name === undefined) {
      document.querySelector(".cityName").innerHTML = obj.city.name;
    } else {
      document.querySelector(".cityName").innerHTML = obj.name;
    }
    document.querySelector(".date").innerHTML = `${day}:${month}:${year}`;
    document.querySelector(".weather").innerHTML = obj.weather[0].description;
    document.querySelector(
      ".img"
    ).style.background = `url(http://openweathermap.org/img/w/${obj.weather[0].icon}.png)`;
    document.querySelector(".img").style.backgroundRepeat = "no-repeat";
    document.querySelector(".img").style.backgroundSize = "cover";
    document.querySelector(".tempTotal").innerHTML =
      parseInt(obj.main.temp) +
      "&#176; F <br><p style='font-size'> Real Feel " +
      parseInt(obj.main.feels_like) +
      " &#176; F</p>";
    let sr = obj.sys.sunrise * 1000;
    let ss = obj.sys.sunset * 1000;
    document.querySelector(".min").innerHTML =
      "Sunrise: " + new Date(sr).getHours() + ":" + new Date(sr).getMinutes();
    document.querySelector(".max").innerHTML =
      "Sunset: " + new Date(ss).getHours() + ":" + new Date(ss).getMinutes();
    document.querySelector(".wind").innerHTML =
      "Duration: " +
      new Date(parseInt(ss - sr)).getUTCHours() +
      ":" +
      new Date(parseInt(ss - sr)).getUTCMinutes();
    (":");
  } else {
    document.querySelector(".current").style.display = "none";
  }
}
function hourly(json, obj) {
  if (errorCathcer(json, obj) == true) return;
  if (mode == 0) {
    obj = json;
    console.log(obj);
    document.querySelector(".hourly").style.display = "block";
    let tday = new Date(obj.city.sunrise);
    tday = days[tday.getDay() + 1];
    document.querySelector(".day").innerHTML = tday;
    for (let i = 0; i < obj.list.length; i++) {
      let time = document.querySelectorAll(".time1");
      let timeC = new Date(obj.list[i].dt_txt);
      let hour = timeC.getHours();
      time[i].innerHTML = hour + ":00";
      let weather = document.querySelectorAll(".hWeather");
      weather[i].setAttribute(
        "src",
        `http://openweathermap.org/img/w/${obj.list[i].weather[0].icon}.png`
      );
      let desc = document.querySelectorAll(".desc");
      desc[i].innerHTML = obj.list[i].weather[0].main;
      let temp = document.querySelectorAll(".hTemp");
      temp[i].innerHTML = parseInt(obj.list[i].main.temp) + "&#176; F";
      let feels = document.querySelectorAll(".hFeels");
      feels[i].innerHTML = parseInt(obj.list[i].main.feels_like) + "&#176; F";
      let wind = document.querySelectorAll(".hWind");
      wind[i].innerHTML = parseInt(obj.list[i].wind.speed);
    }
  } else {
    document.querySelector(".hourly").style.display = "none";
  }
}

function dayly(json, obj) {
  if (errorCathcer(json, obj) == true) return;
  if (mode == 1) {
    obj = json;
    console.log(obj);
    document.querySelector("#days").style.display = "flex";
    let div = document.querySelectorAll("#day");
    for (let i = 0; i < div.length; i++) {
      div[i].innerHTML = `<h1>${
        days[new Date(obj.list[i * 8].dt_txt).getDay()]
      }</h1> <p>${
        months[new Date(obj.list[i * 8].dt_txt).getMonth()]
      } ${new Date(obj.list[i * 8].dt_txt).getDate()}</p>
      <img src='http://openweathermap.org/img/w/${
        obj.list[i * 8].weather[0].icon
      }.png'>
      <h2>${parseInt(obj.list[i * 7].main.temp)}&#176; F</h2>
      <p>${obj.list[i * 7].weather[0].description}</p>`;
      div[i].addEventListener("click", () => {
        document.querySelector(".hourly").style.display = "block";
        let a;
        document.querySelector(".day").innerHTML =
          days[new Date(obj.list[i * 8].dt_txt).getDay()];
        for (let b = 0; b < 6; b++) {
          if (b == 0) {
            a = i * 8 + 1;
          }
          let time = document.querySelectorAll(".time1");
          let timeC = new Date(obj.list[a].dt_txt);
          let hour = timeC.getHours();
          time[b].innerHTML = hour + ":00";
          let weather = document.querySelectorAll(".hWeather");
          weather[b].setAttribute(
            "src",
            `http://openweathermap.org/img/w/${obj.list[a].weather[0].icon}.png`
          );
          let desc = document.querySelectorAll(".desc");
          desc[b].innerHTML = obj.list[a].weather[0].main;
          let temp = document.querySelectorAll(".hTemp");
          temp[b].innerHTML = parseInt(obj.list[a].main.temp) + "&#176; F";
          let feels = document.querySelectorAll(".hFeels");
          feels[b].innerHTML =
            parseInt(obj.list[a].main.feels_like) + "&#176; F";
          let wind = document.querySelectorAll(".hWind");
          wind[b].innerHTML = parseInt(obj.list[a].wind.speed);
          a++;
        }
      });
    }
  } else document.querySelector("#days").style.display = "none";
}
//======================================================getLocation function======================================================
function getCurrentLoc() {
  let lon;
  let lat;
  const success = (pos) => {
    lon = pos.coords.longitude;
    lat = pos.coords.latitude;
    crd = { lat: lat, lon: lon };
    console.log(crd);
    request();
  };
  const error = () => {
    console.log("");
  };
  navigator.geolocation.getCurrentPosition(success, error);
}
getCurrentLoc();

//===============================================================Requests===============================================
function request() {
  let obj;
  let cityName = document.querySelector("input").value;
  console.log(crd);
  if (crd !== undefined && cityName == "") {
    console.log("LLL");
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.lat}&lon=${crd.lon}&cnt=10&appid=48cdd7136e25acb85f5f5ad609fb9eb1&units=imperial`
      )
        .then((response) => response.json())
        .then((json) => current(json, obj));
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.lat}&lon=${crd.lon}&cnt=6&appid=48cdd7136e25acb85f5f5ad609fb9eb1&lang=$eng&units=imperial`
      )
        .then((response) => response.json())
        .then((json) => hourly(json, obj));
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.lat}&lon=${crd.lon}&units=imperial&appid=48cdd7136e25acb85f5f5ad609fb9eb1`
      )
        .then((response) => response.json())
        .then((json) => dayly(json, obj));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&cnt=10&appid=48cdd7136e25acb85f5f5ad609fb9eb1&units=imperial`
      )
        .then((response) => response.json())
        .then((json) => current(json, obj));
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=6&appid=48cdd7136e25acb85f5f5ad609fb9eb1&lang=$eng&units=imperial`
      )
        .then((response) => response.json())
        .then((json) => hourly(json, obj));

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=48cdd7136e25acb85f5f5ad609fb9eb1`
      )
        .then((response) => response.json())
        .then((json) => dayly(json, obj));
    } catch (err) {
      console.log(err);
    }
  }
}

//==========================================================SearchBtn===================================================
btn.addEventListener("click", () => {
  request();
});
document.querySelector("input").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    request();
  }
});
