
import React, { useState } from 'react'
import axios from 'axios'

function Weather() {
  let a;
  let date;
  let time;
  const options={weekday:'long',year:'numeric',month:'long',day:'numeric'};
  setInterval(() => {
      a=new Date();
      time= a.getHours()+':'+a.getMinutes()+':' +a.getSeconds();
      date=a.toLocaleDateString(undefined,options);
     document.getElementById('time1').innerHTML=time ;
     document.getElementById('day1').innerHTML=date;
  }, 1000);

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7f33da9903c18929243e9675953957c4`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div class="varcontainer">
           <h2 >Current Time is:<span id="time1"></span> </h2> 
           <h3 ><span id="day1"></span> </h3> 
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Temp</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Weather;