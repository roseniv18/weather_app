import React from "react"
import {
    UilArrowUp,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset
} from "@iconscout/react-unicons"
import { formatToLocalTime, iconUrlFromCode } from "../js/weatherServices"


// i18Next Translations
import "../js/translations/i18n"
import {useTranslation} from "react-i18next"


function TemperatureAndDetails({weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, deg, humidity, feels_like, timezone
}, units})
    
{
    const { t } = useTranslation()

    const windUnits = units === "metric"  ? "m/s" : "mph"

  return (
    <div>
        <div className="flex items-center justify-center lg:py-6 sm:py-2 text-xl text-cyan-300 ">
            <p>{t(`${details.toLowerCase()}`)}</p>
        </div>

        <div className="flex md:flex-row sm:flex-col items-center justify-between text-white lg:py-3 sm:py-0">
            <div className="flex flex-row items-center justify-evenly lg:w-3/4 sm:w-1/2">
                <img 
                    src={iconUrlFromCode(icon)}
                    alt="weather_icon"
                    className="w-30" 
                />

                <p className="text-6xl my-4 sm:my-4">{`${temp.toFixed()}°`}</p>
            </div>
            

            <div className="flex flex-col space-y-2 sm:my-4">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature size={18} className="mr-1"/>
                    <p>{ t("feels_like") }</p>
                    <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                </div>

                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1"/>
                    <p>{ t("humidity") }</p>
                    <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                </div>

                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1"/>
                    <p>{ t("wind") }</p>
                    <span className="font-medium ml-1">{`${speed.toFixed()} ${windUnits}`}</span>
                    <UilArrowUp style={{transform:  `rotate(${deg}deg)`}}/>
                </div>
            </div>
        </div>

        <div className="flex sm:flex-col md:flex-row items-center justify-center space-x-2 text-white text-sm py-3">
            <UilSun size={18}/>
            <p className="font-light text-base sm:pb-3 md:pb-0">{ t("rise") }<span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
            <p className="font-light sm:hidden md:block">|</p>
            
            <UilSunset size={18}/>
            <p className="font-light text-base sm:pb-3 md:pb-0">{ t("set") }<span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
            <p className="font-light sm:hidden md:block">|</p>

            <UilTemperature size={18}/>
            <p className="font-light text-base sm:pb-3 md:pb-0">{ t("high") }<span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span></p>
            <p className="font-light sm:hidden md:block">|</p>

            <UilTemperature size={18}/>
            <p className="font-light text-base">{ t("low") }<span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span></p>
            <p className="font-light sm:hidden md:block">|</p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails