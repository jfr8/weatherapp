<template>
  <div id="app">
    <main>
      <div class="searchBox">
        <input
          type="text"
          class="searchBar"
          placeholder="Search location..."
          v-model="inputLocation"
          @keypress="fetchWeatherData"
        />
      </div>

      <div class="weatherWrap">
        <div class="location-box">
          <div class="location"> {{ currentWeather.name }}</div>
          <div class="date">{{ currentDate }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ resultTempF }} F</div>
          <div class="weather">Rain</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>



export default {
  name: "App",
  data() {
    return {
      api_key: process.env.VUE_APP_API_KEY,
      urlBase: "https://api.openweathermap.org/data/2.5/",
      inputLocation: "",
      currentWeather: {},
      resultTempF: '',
      currentDate: ''
    };
  },

  created() {
    console.log(this.api_key)
    this.currentDate = this.todaysDate();
  },

  methods: {
    fetchWeatherData(event) {
      if (event.key == "Enter") {
        fetch(`${this.urlBase}weather?q=${this.inputLocation}&APPID=${this.api_key}`)
        .then((response) => {
          //console.log('response: ',response.body)
          return response.json();
          //console.log('json',response.json())
          // this.currentWeather = data;
          // console.log('weather response: ',this.currentWeather)

          // console.log(this.currentWeather.name)

          // const test = Object.values(this.currentWeather);
          // console.log(test)

          // for (const [key, value] of Object.entries(this.currentWeather)){
          //   console.log('test: ',`${key}: ${value}`)
          // }

          //console.log(formatObject);
          //  const testData = Object.keys(data).map((item) => {
          //   console.log('test if this shows')
          //   console.log(data[item])
           
          // })
          
        })
        .then(this.setResults);
      }
    },

    setResults (results) {
      console.log(results)
      this.currentWeather = results;
      this.resultTempF = this.converKtoF(results);
    },

    converKtoF(results) {
      const kelvinTemp = results.main.temp;
      const convertedToF = ( kelvinTemp - 273.15) * 9 / 5 + 32;
      const roundedTempInF =  Math.round(convertedToF)
      return roundedTempInF;

    },

    todaysDate() {
      return new Date().toLocaleDateString();

    } 
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
  background-image: url("./assets/cold-gb.png");
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
</style>
