import React from 'react'
import { iconUrlFromCode } from '../js/weatherServices'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// i18Next Translations
import '../js/translations/i18n'
import {useTranslation} from 'react-i18next'

function Forecast({title, items}) {

    const { t } = useTranslation()

    // We will use this regex only for the daily forecast translation
    const regex = /^[a-z]+$/i // Matches a character from 'a' to 'z'. Case insensitive.

  return (
    <div className='relative mb-10'>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>

        <hr className='my-2'></hr>

        {/* Forecast Carousel */}
        <CarouselProvider
            naturalSlideWidth={80}
            naturalSlideHeight={80}
            totalSlides={items.length}
            visibleSlides={4}
            isPlaying={true}
            interval={8000}
            className='lg:h-20'
        >

        <Slider className='text-white'>
        {items.map((item, index) => (
            <Slide index={index} className='sm:h-60'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>{ regex.test(item.title) === true ? `${t(item.title.toLowerCase())}` : item.title }</p>
                    <img 
                        src={iconUrlFromCode(item.icon)}
                        className='w-12 my-1'
                        alt=""
                    />
                    <p className='font-medium '>{`${item.temp.toFixed()}°`}</p>
                </div>  
            </Slide >  
            ))}
            
            </Slider>
            <ButtonBack className='absolute top-1/2 text-white text-3xl'>&lt;</ButtonBack>
            <ButtonNext className='absolute right-0 top-1/2 text-white text-3xl'>&gt;</ButtonNext>

        </CarouselProvider>
            
        </div>
  )
}

export default Forecast