import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, RefreshControl, FlatList, StatusBar, Alert } from "react-native";
import * as Location from 'expo-location';
import { LinearGradient } from "expo-linear-gradient";
import dateFormat, { i18n } from "dateformat";
import {Ionicons} from '@expo/vector-icons';


i18n.dayNames = [
  "Вс" , 
  "Пн" , 
  "Вт" , 
  "Ср" , 
  "Чт" , 
  "Пт" , 
  "Сб" , 
  "Воскресенье" , 
  "Понедельник" , 
  "Вторник" , 
  "Среда" , 
  "Четверг" , 
  "Пятница" , 
  "Суббота" , 
];

i18n.monthNames = [
  "Ян",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Джун",
  "Июль",
  "авг",
  "Сент",
  "Октябрь",
  "ноябрь",
  "декабрь",
  "Январь",
  "Февраль",
  "Маршировать",
  "Апрель",
  "Мая",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "ноябрь",
  "Декабрь",
];


const HourCell = ({ hour, temp, condition }) => (
  <View style={styles.hourCell}>
    <Text style={styles.hour}>{hour}</Text>
    <View style={styles.hourCellIcon}>
    <Ionicons name={weatherIconCondition[condition].iconName} size={40} color="white" />
    </View>
    <Text style={styles.hourTemp}>{temp}°</Text>
  </View>
);

const DayCell = ({ data, minTemp, maxTemp, condition }) => (
  <View style={styles.dayCell}>
    <Text style={styles.dayCellDate}>{data}</Text>
    <View style={styles.dayCellIcon}>
    <Ionicons name={weatherIconCondition[condition].iconName} size={35} color="white" />
    </View>
    <Text style={styles.dayTemp}>от: {minTemp}°</Text>
    <Text style={styles.dayTemp}>до: {maxTemp}°</Text>
  </View>
);

const PropCell = ({ title, data, prop, icon}) => (
  <View style={styles.propCell}>
    <Text style={styles.propTitle}>{title}</Text>
    <View style={styles.propCellIcon}>
    <Ionicons name={icon} size={70} color="white" />
    </View>
    <Text style={styles.propData}>{data}{prop}</Text>
  </View>
);

const weatherIconCondition = {
  Thunderstorm:{
    iconName: 'thunderstorm',
  },
  Drizzle:{
    iconName: 'rainy-outline',
  },
  Rain:{
    iconName: 'rainy',
  },
  Snow:{
    iconName: 'snow',
  },
  Clear:{
    iconName: 'ios-sunny-sharp',
  },
  Clouds:{
    iconName: 'cloud',
  },
  Mist:{
    iconName: 'warning',
  },
  Haze:{
    iconName: 'warning',
  },
  Dust:{
    iconName: 'warning',
  },
  Fog:{
    iconName: 'warning',
  },
  Sand:{
    iconName: 'warning',
  },
  Ash:{
    iconName: 'warning',
  },
  Squall:{
    iconName: 'warning',
  },
  Tornado:{
    iconName: 'warning',
  },
}



export default function Weather( {data} ){
  
  const cityName = data[0]._W.data.name
  const currentTemp = Math.round(data[0]._W.data.main.temp);
  const condCurrentWeatherIcon = data[0]._W.data.weather[0].main
  const feelsLike = Math.round(data[0]._W.data.main.feels_like);
  const weatherDescription = data[0]._W.data.weather[0].description;
  const hCArray = data[1]._W.data.hourly;
  const dCArray = data[1]._W.data.daily;
  const date = dateFormat(data[0]._W.data.dt * 1000, "dddd, d mmmm, yyyy, HH:MM" )
  const pCArray = [
    {
      id: '0',
      title: 'Мин. Темп',
      icon: 'thermometer-sharp',
      data: Math.round(dCArray[0].temp.min),
      prop: '°C'
    },
    {
      id: '1',
      title: 'Макс. Темп',
      icon: 'thermometer-outline',
      data: Math.round(dCArray[0].temp.max),
      prop: '°C'
    },
    {
      id: '2',
      title: 'Давление',
      icon: 'speedometer',
      data: Math.round((data[0]._W.data.main.pressure) / 1.33),
      prop: ' мм рт.ст.'
    },
    {
      id: '3',
      title: 'Влажность',
      icon: 'water',
      data: data[0]._W.data.main.humidity,
      prop: '%'
    },
    {
      id: '4',
      title: 'Ветер',
      icon: 'golf',
      data: data[0]._W.data.wind.speed,
      prop: 'м/с'
    },
    {
      id: '5',
      title: 'Рассвет',
      icon: 'arrow-up-outline',
      data: dateFormat(data[0]._W.data.sys.sunrise * 1000, "HH:MM" ),
      prop: ''
    },
    {
      id: '6',
      title: 'Закат',
      icon: 'arrow-down-outline',
      data: dateFormat(data[0]._W.data.sys.sunset * 1000, "HH:MM" ),
      prop: ''
    },
    {
      id: '7',
      title: 'Точка росы',
      icon: 'water-outline',
      data: dCArray[0].dew_point,
      prop: '°'
    },
    {
      id: '8',
      title: 'УФ-индекс',
      icon: 'sunny-outline',
      data: dCArray[0].uvi,
      prop: ' ед.'
    },
    {
      id: '9',
      title: 'Видимость',
      icon: 'eye',
      data: data[0]._W.data.visibility,
      prop: ' м'
    },
  ]
 
  const renderItem = ({ item }) => (
        <HourCell hour={dateFormat(item.dt * 1000, "HH:MM" )} temp={Math.round(item.temp)}  condition={item.weather[0].main}/>
  );

  const renderItemDay = ({ item }) => (
    <DayCell data={dateFormat(item.dt * 1000, "dddd, d mmm" )} minTemp={Math.round(item.temp.min)} maxTemp={Math.round(item.temp.max)} condition={item.weather[0].main} />
  );

  const renderItemProp = ({ item }) => (
    <PropCell title={item.title} data={item.data} prop={item.prop} icon={item.icon}/>
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = Location.getCurrentPositionAsync();
      console.log(coords)
      //this.getCurrentWeather(latitude, longitude);
      } catch (error) {
      Alert.alert('Location is off', "Pleas turn on Location");
    }
    const location = Location.getCurrentPositionAsync();
    wait(2000).then(() => setRefreshing(false));
  }, []);

   
  

    return (
    <LinearGradient
    colors={['#87CEFA','#00BFFF', '#1E90FF', '#0000FF', '#00008B']}
    style={styles.backg}>
      <StatusBar barStyle="light-content" backgroundColor={'#87CEFA'}/>
        <View style={styles.header}>
        <Text style={styles.cityNameLabel}> {cityName} </Text>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.stackCurWeath}>
            <View style={styles.currentTempStack}>
                <Text style={styles.currentT}>{currentTemp}°</Text>
                <View style={styles.currentWeathIcon}>
                <Ionicons name={weatherIconCondition[condCurrentWeatherIcon].iconName} size={60} color="white" />
                </View>
            </View>
            <View>
                <Text style={styles.weatherDes}>{weatherDescription}</Text>
                <Text style={styles.feelsL}>Ощущается как: {feelsLike}°</Text>
            </View>
          </View>
          <View style={styles.hourCells}>
            <FlatList
                nestedScrollEnabled 
                horizontal= {true}
                data={hCArray}
                renderItem={renderItem}
                keyExtractor={item => item.dt}
                showsHorizontalScrollIndicator= {false}
                legacyImplementation={false}
            />
        </View>
        <View style={styles.daylyCells}>
          <Text style={styles.day7}>    Прогноз на 7 дней:</Text>
          <FlatList
            data={dCArray}
            renderItem={renderItemDay}
            keyExtractor={item => item.dt}
            legacyImplementation={false}
          />
        </View>
        <Text style={styles.day7}>    Свойства:</Text>
        <View style={styles.weatherProp}>
        <FlatList
                nestedScrollEnabled 
                horizontal= {true}
                data={pCArray}
                renderItem={renderItemProp}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator= {false}
                legacyImplementation={false}
            />
        </View>
        <Text style={styles.date}>{date}</Text>
        </ScrollView>
      </LinearGradient>
  );
}


const styles = StyleSheet.create({
  backg:{
    flex: 1,
    //backgroundColor: '#1DACD6'
  },
  header:{
    marginTop: 10,
    width: "100%",
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cityNameLabel: {

    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  headerItem:{
    width: 70,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
    borderColor:'white',
    borderWidth: 1,
    borderRadius: 5
  },
  stackCurWeath:{
    width: "100%",
    height: 160,
},
currentTempStack:{
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: 'center'
},
  currentT:{
    color: 'white',
    fontSize: 40,
    marginRight: 5
  },
  currentWeathIcon:{
    width: 60,
    height: 60,
    marginLeft: 5
  },
  weatherDes:{
    color: 'white',
    textAlign:'center',
    fontSize: 17,
    marginTop: 5,
  },
  feelsL:{
    color: 'white',
    textAlign:'center',
    fontSize: 14,
  },
  hourCells:{
    width: "100%",
    height: 120,
    //backgroundColor: 'red',
},

  hourCell: {
    backgroundColor: '#1D94FF',
    borderRadius: 10,
    width: 70,
    height: 100,
    //padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
},
  hour: {
    fontSize: 16,
    paddingTop: 5,
    height: 30,
    color: 'white',
    textAlign: 'center',
},
  hourCellIcon:{
    width: 40,
    height: 40,
    marginHorizontal: 15,
    },
  hourTemp:{
    fontSize: 16,
    paddingTop: 5,
    color: 'white',
    textAlign: 'center'
},

day7:{
  fontSize: 20,
  fontWeight:'700',
  color: 'white'
},

daylyCells:{
  width: "100%",
  height: 460,
},
dayCell:{
  marginVertical: 2,
  backgroundColor: '#1D94FF',
  borderRadius: 6,
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: "96%",
  marginLeft: "2%",
  height: 50,
},
dayCellDate:{
  color: 'white',
  fontSize: 18,
  paddingLeft: 10,
  paddingTop: 12,
  width: 200
},
dayCellIcon:{
  width: 35,
  height: 35,
  marginTop: 8,
  marginHorizontal: 10,
},
dayTemp:{
  width: 60,
  color: 'white',
  fontSize: 18,
  marginTop: 12,
  marginHorizontal: 10,
},
weatherProp:{
  width: "100%",
  height: 170,
 },
propCell: {
  backgroundColor: '#1D94FF',
  borderRadius: 15,
  width: 150,
  height: 150,
  //padding: 20,
  marginVertical: 8,
  marginHorizontal: 5,
},
propTitle:{
  fontSize: 18,
  paddingTop: 5,
  height: 30,
  color: 'white',
  textAlign: 'center',
  },
  propCellIcon:{
    width: 70,
    height: 70,
    marginTop: 8,
    marginHorizontal: 40,
  },
  propData:{
    fontSize: 18,
    paddingTop: 5,
    height: 30,
    color: 'white',
    textAlign: 'center',
    },
    date:{
      height: 40,
      fontSize: 20,
      textAlign: 'center',
      fontWeight:'700',
      color: 'white'
    },
});
