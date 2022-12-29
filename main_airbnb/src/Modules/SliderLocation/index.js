/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Skeleton, Typography } from 'antd'
import { useNavigate } from 'react-router-dom';
import { getAllLocation } from '../../Services/Slices/locationSlice';
import { useViewPort } from '../../Hooks/useViewPort';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SliderLocation = () => {
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [screenWidth] = useViewPort();
    const { allLocation, isLoading } = useSelector(state => state.location);

    useEffect(() => {
        dispatch(getAllLocation())
    }, [])

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div>
                {isLoading ?
                    <div className='w-1/3 mx-auto'>
                        <Skeleton.Input active block />
                    </div> :
                    <Title level={3} className='text-center text-white lg:!text-xl md:!text-lg xs:!text-sm mb-3' >Các điểm đến thu hút nhất Việt Nam</Title>
                }
                {isLoading &&
                    <div className='flex items-center justify-between'>
                        {Array(screenWidth > 900 ? 4 : screenWidth > 600 ? 3 : screenWidth > 500 ? 2 : 1).fill(0).map((item, index) => (
                            <div key={index} className='w-full h-full text-center shadow-lg m-2'>
                                <Skeleton.Image active className='block !w-full ' style={{ height: 200 }} />
                                <Skeleton.Input active className='p-2' size='small' />
                            </div>
                        ))}
                    </div>
                }
                <Slider {...settings}>
                    {allLocation.map((location, index) => (
                        <div className='w-full h-full p-2' key={index}>
                            <div
                                onClick={() => navigate(`/vitri/${location.id}`)}
                                className='border border-[#DDDFE2] hover:shadow-3xl duration-500 cursor-pointer'>
                                {/* <img className='w-full h-48 object-cover' src={location.hinhAnh} alt="" /> */}
                                <LazyLoadImage effect='blur' className='block w-full h-48 object-cover' width='100%' height={'192px'}  src={location.hinhAnh} alt={location.tenViTri} />
                                <div className='text-center mt-2 pb-2'>
                                    <Text ellipsis={true} strong>{location.tenViTri} - {location.tinhThanh}</Text>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default SliderLocation;