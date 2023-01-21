import TopButtons from "./components/TopButtons"
import Inputs from "./components/Inputs"
import TimeAndLocation from "./components/TimeAndLocation"
import TemperatureAndDetails from "./components/TemperatureAndDetails"
import Forecast from "./components/Forecast"
import Footer from "./components/Footer"
import getFormattedWeatherData  from "./js/weatherServices"
import { useState, useEffect } from "react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// i18Next Translations
import "./js/translations/i18n"
import {useTranslation} from "react-i18next"

// Loading animation
import { Oval } from "react-loader-spinner"


function App() {
  // Initialize translation function
  const {t} = useTranslation()

  const [query, setQuery] = useState({q: "sofia"})
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      const message = query.q ? query.q : `${ t("current_location") }`
      toast.info(`${ t("fetching_weather") }` + message)
      try {
        await getFormattedWeatherData({...query, units}).then(data => {
          toast.success(`${ t("successfully_fetched") } ${data.name}`)
          setWeather(data)
          setIsLoading(false)
        })
      } catch (error) {
        toast.error(`${error}`)
      }
    }

    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if(!weather) {
      return "from-cyan-700 to-blue-700"
    }

    const threshold = units === "metric" ? 20 : 60

    if(weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700"
    }

    return "from-yellow-700 to-orange-700"
  }

  let content

  if(isLoading) {
	content = (
		<Oval
			height={80}
			width={80}
			color="#facc15"
			wrapperStyle={{justifyContent: "center"}}
			wrapperClass=""
			visible={true}
			ariaLabel="oval-loading"
			secondaryColor="#0369a1"
			strokeWidth={2}
			strokeWidthSecondary={2}
		/>
  )
  } else {
    if(weather) {
      content = (
        <div>
          <TimeAndLocation weather = {weather}/>
          <TemperatureAndDetails units = {units} setUnits = {setUnits} weather = {weather}/>
          <Forecast title={t("hourly_forecast")} items={weather.hourly}/>
          <Forecast title={t("daily_forecast")} items={weather.daily}/>
        </div>
      )
    }
  }
    
  return (
    <div className="md:pt-2">
       <div 
        className={`mx-auto 
                    max-w-screen-md
                    sm:mt-0 
                    py-5 
                    lg:px-28
                    sm:px-5
                    bg-gradient-to-br
					          min-h-800
                    h-fit
                    shadow-md
                    shadow-gray-400
                    lg:rounded-md
                    ${formatBackground()}`}>


      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      
      { content }

      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>      
      </div>
      <Footer />
    </div>
  )
}

export default App
