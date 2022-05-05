import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Location from 'expo-location';
import Loading from './Loading';
import Weather from "./Weather";
import axios from "axios";

const API_KEY = 'fc2976a8acb612844f09e2fea9a3ca95'


export default class extends React.Component{

  state = {
    isLoading: true
  }

  getCurrentWeather = async (latitude, longitude) => {
   
    const weatherData = await [ 
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`),
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&appid=${API_KEY}&units=metric&lang=ru`) ];
    
    Promise.all(weatherData)
    .then((result) => {

      this.setState({
        data: weatherData,
        isLoading: false,
      });

      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  
   
  }

  getLocition = async () => {

    try {
      Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getCurrentWeather(latitude, longitude);
      } catch (error) {
      Alert.alert('Location is off', "Pleas turn on Location");
    }
    const location = await Location.getCurrentPositionAsync();
  }

  componentDidMount(){
    this.getLocition();
  }



  render () {
    const {isLoading, data} = this.state;
    
    return (
      isLoading ? <Loading/> : <Weather data={data} />
      //temp={Math.round(temp)}
    );
  }
}

const styles = StyleSheet.create({
  backg:{
    flex: 1,
    backgroundColor: '#1DACD6'
  },
});

