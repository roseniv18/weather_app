import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData  from './js/weatherServices';
import {useState, useEffect} from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: 'sofia'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)

      await getFormattedWeatherData({...query, units}).then(data => {

        toast.success(`Successfully fetched weather for ${data.name}`)

        setWeather(data)
      })
    }
  
    console.log(weather)
  
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if(!weather) {
      return 'from-cyan-700 to-blue-700'
    }

    const threshold = units === 'metric' ? 20 : 60

    if(weather.temp <= threshold) {
      return 'from-cyan-700 to-blue-700'
    }

    return 'from-yellow-700 to-orange-700'
  }

  return (


    <div 
      className={`mx-auto 
                  max-w-screen-md
                  md:mt-4
                  sm:mt-0 
                  py-5 
                  lg:px-28
                  sm:px-10
                  bg-gradient-to-br from-cyan-700 to-blue-700 
                  h-fit
                  shadow-xl
                  shadow-gray-400
                  ${formatBackground()}`}>


    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
    
    {weather && (
      <div>
        <TimeAndLocation weather = {weather}/>
        <TemperatureAndDetails units = {units} setUnits = {setUnits} weather = {weather}/>
        <Forecast title="Hourly Forecast" items={weather.hourly}/>
        <Forecast title="Daily Forecast" items={weather.daily}/>
      </div>
    )}

    <ToastContainer autoClose={3000} theme='colored' newestOnTop={true}/>

    </div>
  );
}

export default App;
