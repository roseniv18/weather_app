import { DateTime } from "luxon"

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    try {
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error('Something went wrong!')
        }

        const data = res.json()

        return data

    } 
    
    catch (error) {
        console.log("ERROR FETCHING WEATHER DATA")
    }
    
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

    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather).catch(error => {
        console.log(error)
    })

    const {lat, lon} = formattedCurrentWeather

    try {
        const formattedForecastWeather = await getWeatherData('onecall', {
            lat, lon, exclude: 'current,minutely,alerts', 
            units: searchParams.units
        }).then(formatForecastWeather)

        return {...formattedCurrentWeather, ...formattedForecastWeather}
    }

    catch (error) {
        console.log("ERROR FORMATTING WEATHER DATA")
    }
    
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData
export {formatToLocalTime, iconUrlFromCode}
