window.addEventListener("load", () => {
  const API_KEY = `f64803680977d22ee80438b41eff9759`;
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector('.location-timezone')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // console.log({long,lat});

      // API
      // example API
      // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key};
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // console.log(data.main);
          // console.log(data.weather[0].description);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.round((((temp * 9/5 ) - 459.67)*100)/100);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;

          //setIconsYoutube
        //   setIconsYoutube(icon, document.querySelector('.icon1'));

          //setIcon
        //   console.log(setIcons(icon));
          let a = setIcons(icon)
          console.log(a);
          document.querySelector(".icon").src = setIcons(icon)
          
        });
    });
  } else {
    h1.textContent = "Hey This is not working because reasons";
  }

  const setIconsYoutube = (icon, iconID) => {
      const skycons = new skycons({color:"white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID,skycons[currentIcon]);


  }

  const setIcons = (icon) => {
      // URL is http://openweathermap.org/img/wn/10d@2x.png;
      //   https://openweathermap.org/img/wn/02n.png
      let newIcon = `http://openweathermap.org/img/wn/${icon}.png`;
      return newIcon
  }


});

// https://api.openweathermap.org/data/2.5/weather?lat=13.6216576&lon=100.6272512&appid=f64803680977d22ee80438b41eff9759
