import { Divider, Skeleton, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getLocationById } from '../../Services/Slices/locationSlice';
import SliderLocation from '../SliderLocation';
import RoomInLocation from './RoomInLocation';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Location = () => {
    const dispatch = useDispatch();
    const { locationById, isLoading } = useSelector(state => state.location);
    const { Title } = Typography;
    const { idLocation } = useParams();

    useEffect(() => {
        dispatch(getLocationById(idLocation))
    }, [idLocation, dispatch])

    return (
        <div>
            <div className='relative'>
                <LazyLoadImage effect='blur' width={'100%'} className='background block w-full xl:max-h-[94vh] xs:max-h-[50vh] object-cover' src={`${locationById?.hinhAnh}`} alt={locationById?.tenViTri} />
                {/* <img className='background block w-full xl:max-h-[94vh] xs:max-h-[50vh] object-cover' src={`${locationById?.hinhAnh}`} alt="" /> */}
                <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.45)]'>
                    <div className='w-1/2 xs:w-4/5 h-full mx-auto flex items-center justify-center flex-col'>
                        {isLoading ?
                            <div className='w-1/3 mx-auto mb-3'>
                                <Skeleton.Input active block size='large' />
                            </div> :
                            <Title level={1} className='!text-white lg:!text-[38px] xs:!text-2xl'>{locationById?.tenViTri} - {locationById?.tinhThanh}</Title>
                        }
                    </div>
                </div>
            </div>
            <div className='max-w-7xl w-5/6 mx-auto'>
                <RoomInLocation />
                <Divider></Divider>
                <SliderLocation />
            </div>
        </div>
    )
}

export default trackWindowScroll(Location)