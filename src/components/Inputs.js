import React from 'react'
import {useState} from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

// i18Next Translations
import '../js/translations/i18n'
import {useTranslation} from 'react-i18next'

function Inputs({ setQuery, units, setUnits   }) {

  const { t } = useTranslation()
  
  const [city, setCity] = useState('')

  const handleSearchClick = () => {
    if(city !== '') {
      setQuery({q: city})
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      toast.info(`${t('fetching_user_location')}`)
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success(`${t('location_fetched')}`)
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })

        setCity('')
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) {
      setUnits(selectedUnit)
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

            <input 
                value={city}
                onChange={(e) => setCity(e.currentTarget.value) }
                type="text"
                placeholder={t('search_for_city')} 
                className="rounded-md text-xl font-light py-2 px-3 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase">

            </input>

            <UilSearch 
              size={25} 
              className="text-white cursor-pointer transition ease-in-out hover:scale-125"
              onClick={handleSearchClick}
            />

            <UilLocationPoint 
              size={25} 
              className="text-white cursor-pointer transition ease-in-out hover:scale-125"
              onClick={handleLocationClick}
            />         
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name="metric" 
                    className="text-xl 
                               text-white 
                               font-light 
                               hover:scale-125 
                               transition ease-in-out"
                    onClick={handleUnitsChange}>°C
            </button>

            <p className="text-xl text-white mx-1">|</p>
            <button name="imperial" 
                    className="text-xl 
                               text-white 
                               font-light 
                               hover:scale-125 
                               transition ease-in-out"
                    onClick={handleUnitsChange}>°F
            </button>
        </div>
    </div>
  )
}

export default Inputs