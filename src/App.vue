<template>
  <div id="app" v-bind:class="bgCssClass">
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
            {{ cityName }}
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
      cityName: "",
      resultTempF: "",
      resultFeelsLike: "",
      currentDate: "",
      currentTime: "",
      conditions: "",
      showTable: false,
      bgCssClass: "defaultBg",
    };
  },

  created() {
    this.currentDate = this.todaysDate();
  },

  methods: {
    fetchWeatherData() {
      getData(this.urlBase, this.inputLocation, this.api_key)
        .then(this.setResults)
        .catch(() => {
          this.handleError();
        });
    },

    setResults(results) {
      this.currentWeather = results; // copy of entire object

      this.resultTempF = this.converKtoFTemp(results);
      this.resultFeelsLike = this.convertKtoFLike(results);
      this.setBgColor();

      this.conditions = results.weather[0].main;
      this.cityName = results.name;

      this.appUiManagment();
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

    setBgColor() {
      if (this.resultTempF >= 80) {
        console.log(this.resultTempF);
        this.bgCssClass = "warmBg";
      } else if (this.resultTempF >= 90) {
        this.bgCssClass = "hotBg";
      } else {
        this.bgCssClass = "normalBg";
      }
    },

    appUiManagment() {
      this.showTable = true;
      this.inputLocation = "";
    },

    handleError() {
      this.showTable = false;
      this.inputLocation = "";
      this.bgCssClass = "defaultBg";
      alert("City not found!!");
    },

    todaysDate() {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };

      return new Date().toLocaleString(undefined, options);
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
  background-size: cover;
  /* background-position: bottom; */
  transition: 0.4s;
}

.defaultBg {
  background-image: linear-gradient(
    45deg,
    hsl(0deg 0% 86%) 0%,
    hsl(344deg 0% 79%) 7%,
    hsl(344deg 0% 72%) 14%,
    hsl(344deg 0% 66%) 21%,
    hsl(344deg 0% 59%) 29%,
    hsl(344deg 0% 53%) 36%,
    hsl(344deg 0% 46%) 43%,
    hsl(344deg 0% 40%) 50%,
    hsl(344deg 0% 34%) 57%,
    hsl(344deg 0% 29%) 64%,
    hsl(344deg 0% 23%) 71%,
    hsl(344deg 0% 18%) 79%,
    hsl(344deg 0% 13%) 86%,
    hsl(343deg 0% 8%) 93%,
    hsl(0deg 0% 0%) 100%
  );
}

.warmBg {
  background-image: linear-gradient(
    45deg,
    hsl(21deg 100% 61%) 0%,
    hsl(19deg 100% 61%) 7%,
    hsl(18deg 100% 62%) 14%,
    hsl(17deg 100% 63%) 21%,
    hsl(15deg 100% 64%) 29%,
    hsl(14deg 100% 65%) 36%,
    hsl(12deg 100% 66%) 43%,
    hsl(11deg 100% 66%) 50%,
    hsl(9deg 100% 67%) 57%,
    hsl(8deg 100% 68%) 64%,
    hsl(6deg 100% 69%) 71%,
    hsl(5deg 100% 69%) 79%,
    hsl(3deg 100% 70%) 86%,
    hsl(2deg 100% 71%) 93%,
    hsl(0deg 100% 71%) 100%
  );
}

.hotBg {
  background-image: linear-gradient(
    45deg,
    hsl(1deg 100% 38%) 0%,
    hsl(2deg 92% 40%) 7%,
    hsl(3deg 85% 43%) 14%,
    hsl(3deg 79% 45%) 21%,
    hsl(3deg 74% 48%) 29%,
    hsl(2deg 70% 50%) 36%,
    hsl(2deg 72% 52%) 43%,
    hsl(2deg 74% 54%) 50%,
    hsl(2deg 77% 56%) 57%,
    hsl(2deg 80% 58%) 64%,
    hsl(1deg 83% 60%) 71%,
    hsl(1deg 86% 62%) 79%,
    hsl(1deg 90% 64%) 86%,
    hsl(0deg 94% 66%) 93%,
    hsl(0deg 99% 68%) 100%
  );
}

.normalBg {
  background-image: linear-gradient(
    45deg,
    hsl(240deg 95% 33%) 0%,
    hsl(235deg 92% 35%) 7%,
    hsl(232deg 88% 37%) 14%,
    hsl(230deg 85% 39%) 21%,
    hsl(228deg 81% 41%) 29%,
    hsl(227deg 77% 44%) 36%,
    hsl(226deg 74% 46%) 43%,
    hsl(225deg 71% 49%) 50%,
    hsl(224deg 71% 51%) 57%,
    hsl(223deg 75% 53%) 64%,
    hsl(222deg 79% 56%) 71%,
    hsl(221deg 83% 58%) 79%,
    hsl(221deg 88% 61%) 86%,
    hsl(220deg 94% 64%) 93%,
    hsl(219deg 100% 66%) 100%
  );
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
  color: white;
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
  text-align: center;
}
</style>
