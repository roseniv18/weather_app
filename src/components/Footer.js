import React from 'react'

// i18Next Translations
import '../js/translations/i18n'
import {useTranslation} from 'react-i18next'

function Footer() {

    const { t } = useTranslation()

  return (
    <div className='w-100 bg-slate-500 mt-2 text-white py-2 text-center'>
        { t('developed_by') }  
        <span> </span>
        <a 
            className='text-yellow-500 ease-in-out duration-300 hover:text-yellow-600 footer_name' 
            href='https://github.com/Avitohol1'
            target="_blank"
            rel="noreferrer">
                 { t('name') }  
        </a>
    </div>
  )
}

export default Footer