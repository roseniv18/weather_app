import React, {useState}from "react"
import {cities} from "../data/cities"

// i18Next Translations
import "../js/translations/i18n"
import i18next from "i18next"

function TopButtons({setQuery}) {

  const [countryCode, setCountryCode] = useState("gb")

  const flagUrl = `https://flagcdn.com/${countryCode}.svg`

  const changeLanguage = (event) => {
    i18next.changeLanguage(event.target.value)

    if(event.target.value === "en") 
    {
      setCountryCode("gb")
    }
    else setCountryCode(event.target.value)
  }

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map(city => {
        return (
          <button 
            key={city.id} 
            className="text-white text-lg font-medium"
            onClick={() => {setQuery({q: city.title})}}>    

            {city.title}
          </button>
        )    
      })}


      <div className="flex lg:flex-row sm:flex-row items-center justify-center sm:space-y-2 lg:space-x-4 sm:space-x-1">
        <select 
          className="flex flex-row items-center justify-center lg:w-20 sm:w-12 rounded-sm bg-transparent text-white cursor-pointer border-2 lg:px-2 sm:px-0" 
          name="language" 
          onChange={changeLanguage}>

          <option value="en" className="">
            EN
          </option>

          <option value="bg" className="">
            BG
          </option>

        </select>
      </div>
      <img src={flagUrl} className="lg:w-10 sm:w-4 sm:block lg:block flag" />
    </div>
  )
}

export default TopButtons