import React from 'react';
import Slider from 'react-slick';
import { Skeleton, Typography } from 'antd'
import { useSelector } from 'react-redux';
import { useViewPort } from '../../Hooks/useViewPort';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Title } = Typography;

const SliderVoucher = () => {
    const { isLoading } = useSelector((state) => state.location);
    const [screenWidth] = useViewPort();


    const vouchers = [
        { id: 1, hinhAnh: 'https://cdn0.agoda.net/images/blt2/wcFlightsEvergreen/VN/Desktop/vi-vn/VN_Evergreen_20220725.png' },
        { id: 2, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcDD20221205/home_banner_web/vi-vn.png' },
        { id: 3, hinhAnh: 'https://cdn0.agoda.net/images/blt2/wcActivities/Awareness/VN/Desktop/vi-vn/VN_20221205.png' },
        { id: 4, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcSS20221114/home_banner_web/vi-vn.png' },
        { id: 5, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcSS20221101NightOwl/home_banner_web/vi-vn.png' },
        { id: 6, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcSP20221006JPreopen/home_banner_web/vi-vn.png' },
        { id: 7, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcSP20220513SG/home_banner_web/vi-vn.png' },
        { id: 8, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcCF20220719WB/home_banner_web/vi-vn.png' },
        { id: 9, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcPS20221130_Bestprice_AI/home_banner_web/vi-vn.png' },
        { id: 10, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/wcSP20210113/home_banner_web/vi-vn/home_banner.png' },
        { id: 11, hinhAnh: 'https://cdn6.agoda.net/images/WebCampaign/CustMKT20220501Dealspage/home_banner_web/vi-vn.png' },
    ];

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 976,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='text-center'>
            {isLoading ?
                <div className='w-1/3 mx-auto mb-3'>
                    <Skeleton.Input active block />
                </div> :
                <Title level={3} className='text-white lg:!text-xl md:!text-lg xs:!text-sm'>Chương trình khuyến mại chỗ ở</Title>}
            {isLoading ?
                <div className='flex items-center justify-between'>
                    {Array(screenWidth >= 976 ? 2 : 1).fill(0).map((item, index) => (
                        <div key={index} className='w-full h-full text-center shadow-lg m-2'>
                            <Skeleton.Image active className='block !w-full md:!h-[240px] sm:!h-[192px] xs:!h-[144px] rounded-xl' />
                        </div>
                    ))}
                </div> :
                <Slider {...settings}>
                    {vouchers.map((item, index) => (
                        <div className='overflow-hidden' key={index} >
                            <div className='mx-2'>
                                <LazyLoadImage effect='blur' width={'100%'} height={screenWidth >= 768 ? '240px' : screenWidth >= 480 ? '192px' : '144px'} className='block w-full md:h-60 sm:h-48 xs:h-36 object-cover rounded-xl' src={item.hinhAnh} alt={item.id}/>
                                {/* <img className='block w-full md:h-60 sm:h-48 xs:h-36 object-cover rounded-xl' src={item.hinhAnh} alt={item.id} /> */}
                            </div>
                        </div>
                    ))}
                </Slider>
            }
        </div>
    )
}

export default SliderVoucher;   