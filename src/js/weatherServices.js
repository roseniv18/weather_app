import { DateTime } from "luxon"
import { useTranslation } from "react-i18next"

// i18Next Translations
import './translations/i18n'

const API_KEY = '04c2347fc1f302171df091590dadd361'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

// const Translation = () => {
//     const {t} = useTranslation()
//     console.log({t})
// }

// Translation()

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
            .then((res) => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
    } = data

    let {
        wind: {speed, deg}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed, deg}
}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data
    daily = daily.slice(1, 6)  //We don't start at 0 because that's the current weather and we already have that.
                 .map(d => {
                    return {
                        title: (formatToLocalTime(d.dt, timezone, 'ccc')),
                        temp: d.temp.day,
                        icon: d.weather[0].icon
                    }
                 })

    hourly = hourly.slice(1, 26) 
                 .map(h => {
                    return {
                        title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
                        temp: h.temp,
                        icon: h.weather[0].icon
                    }
                 })  

    return { timezone, daily, hourly  }
    
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units 
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData
export {formatToLocalTime, iconUrlFromCode}