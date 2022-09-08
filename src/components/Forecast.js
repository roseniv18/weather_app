import React from 'react'
import { iconUrlFromCode } from '../js/weatherServices'

// i18Next Translations
import '../js/translations/i18n'
import {useTranslation} from 'react-i18next'

function Forecast({title, items}) {

    const { t } = useTranslation()

    // We will use this regex only for the daily forecast translation
    const regex = /^[a-z]+$/i

  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'></hr>

        <div className='flex flex-row items-center justify-between text-white'>
            {items.map(item => (
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>{ regex.test(item.title) === true ? `${t(item.title.toLowerCase())}` : item.title }</p>
                    <img 
                        src={iconUrlFromCode(item.icon)}
                        className='w-12 my-1'
                        alt=""
                    />
                    <p className='font-medium '>{`${item.temp.toFixed()}°`}</p>
                </div>    
            ))}
        </div>
    </div>
  )
}

export default Forecast