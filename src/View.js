import { useState, useEffect, Fragment } from "react";
import Container from '@mui/material/Container';

export default function View(props){
  const key='180d0774fbfe2a7d2b642c3048745419';
  let [wind,setwind]=useState('');
  let [city,setcity]=useState('');
  let [desc,setdesc]=useState('');
  let [temp,settemp]=useState('');


  useEffect(() => {
      
    fetch('https://api.ipregistry.co/?key=tryout')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        console.log(payload)
        if(payload.code=='TOO_MANY_REQUESTS')
          setcity('damascus');
        else 
          setcity(payload.location.city);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,{
            method:'GET',
            headers:{} 
          }).then(function(response){
              response.json().then(function(resp){
                 setdesc(resp.weather[0].description);
                 setwind(resp.wind.speed);
                 settemp(resp.main.temp);
              })
          })
    });
  }, []);


    return(
        <Container maxWidth="lg" xs={{height:'100vh !important' }}>
            <h3>Weather for your city: {city}</h3>
            <p>Wind speed: {wind}</p>
            <p>Weather description: {desc}</p>
            <p>Weather tempreture: {temp}</p>
        </Container>
    )

}

