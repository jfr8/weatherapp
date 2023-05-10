<template>
  <div id="app">
    <main>
      <div class="searchBox">
        <input
          type="text"
          class="searchBar"
          placeholder="Search weather in..."
          v-model="inputLocation"
          @keydown.enter="fetchWeatherData"
        />
      </div>

      <div class="weatherWrap" v-if="showTable">
        <div class="location-box">
          <div class="location">
            {{ currentWeather.name }}
          </div>
        </div>
        <br /><br />

        <div class="weather-box">
          <span class="spanPlaceholders">Actual:</span><br />
          <div class="temp">{{ resultTempF }} F</div>
          <br />
          <span class="spanPlaceholders">Feels Like:</span><br />
          <div class="temp">{{ resultFeelsLike }} F</div>
          <br />
          <span class="spanPlaceholders">Conditions:</span><br />
          <div class="weather">{{ conditions }}</div>
        </div>

        <div class="footer">
          <label>Showing weather for {{ currentDate }}</label>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getData } from "./api";

export default {
  name: "App",
  data() {
    return {
      api_key: process.env.VUE_APP_API_KEY,
      urlBase: "https://api.openweathermap.org/data/2.5/",
      inputLocation: "",
      currentWeather: {},
      resultTempF: "",
      resultFeelsLike: "",
      currentDate: "",
      conditions: "",
      showTable: false,
    };
  },

  created() {
    this.currentDate = this.todaysDate();
  },

  methods: {
    fetchWeatherData() {
      getData(this.urlBase, this.inputLocation, this.api_key).then(
        this.setResults
      );
    },

    setResults(results) {
      console.log(results);
      this.currentWeather = results;
      this.resultTempF = this.converKtoFTemp(results);
      this.resultFeelsLike = this.convertKtoFLike(results);
      this.conditions = results.weather[0].main;
      this.showTable = true;
      this.inputLocation = "";
    },

    converKtoFTemp(results) {
      const kelvinTemp = results.main.temp;
      const convertedToF = ((kelvinTemp - 273.15) * 9) / 5 + 32;
      const roundedTempInF = Math.round(convertedToF);
      return roundedTempInF;
    },

    convertKtoFLike(results) {
      const convertedToF = ((results.main.feels_like - 273.15) * 9) / 5 + 32;
      return Math.round(convertedToF);
    },

    todaysDate() {
      return new Date().toLocaleDateString();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

#app {
  background-image: url("./assets/light_blue.png");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.searchBox {
  width: 100%;
  margin-bottom: 30px;
}

.searchBox .searchBar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  appearance: none;
  border: none;
  outline: none;
  background: none;

  background-color: rbga(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.searchBox .searchBar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.spanPlaceholders {
  font-weight: 400;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  size: 18px;
  color: white;
}

.footer {
  color: white;
  margin-top: 80px;
  padding-left: 50px;
}
</style>
