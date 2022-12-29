import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Banner = () => {
    return (   
        <div>
            <LazyLoadImage
                className='block !h-80'
                alt={'background'}
                src={'https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png'} 
                width={'100%'}
                height={'320px'}
                effect='blur' />
        </div>
    )
}

export default Banner