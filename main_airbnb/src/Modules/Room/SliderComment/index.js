import { Divider, Rate, Skeleton, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllComment } from '../../../Services/Slices/commentSlice';
import { getAllAccount } from '../../../Services/Slices/userSlice';
import { useViewPort } from '../../../Hooks/useViewPort';


const SliderComment = ({ roomById }) => {
    const { Paragraph, Text } = Typography;
    const dispatch = useDispatch();
    const [screenWidth] = useViewPort();
    const { idRoom } = useParams();
    const { allComment, isComment } = useSelector(state => state.comment);
    const { allAccount } = useSelector(state => state.user);
    const { isLoading } = useSelector(state => state.room);

    const commentRoom = allComment.filter((comment) => comment.maPhong === +idRoom);
    // const nameAccount = allAccount.filter((account) => account.id === );

    const settings = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: false,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    useEffect(() => {
        dispatch(getAllAccount())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllComment())
    }, [dispatch, isComment])

    return (
        <>
            {isLoading ?
                <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'><Skeleton.Input active block /></Divider> :
                <Divider className='md:!text-sm' orientation='left'>Có {commentRoom?.length} đánh giá {screenWidth > 600 ? 'của du khách về cơ sở lưu trú này' : ''}</Divider>
            }
            <div className='sliderComment w-full'>
                {isLoading ?
                    <>
                        <div className={`grid ${screenWidth > 768 ? 'grid-cols-3' : screenWidth >= 500 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {Array(screenWidth > 768 ? 3 : screenWidth >= 500 ? 2 : 1).fill(0).map((item, index) => (
                                <div key={index} className='p-2'>
                                    <Skeleton.Input className='!w-full !h-[150px]' />
                                </div>
                            ))}
                        </div>
                    </> :
                    <>
                        <Slider {...settings}>
                            {commentRoom.reverse().map((cmt, index) => (
                                <div key={index} className='p-2'>
                                    <div className='shadow-[0px_1px_3px_1px_rgba(0,0,0,0.3)] rounded-lg p-3'>
                                        <div className='flex items-center mt-3'>
                                            <img className='pr-2' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ae73fa0a5c08e7064d9dafe34d1408e8.svg" alt="" />
                                            <strong>{(allAccount.filter((account) => account.id === cmt.maNguoiBinhLuan))[0]?.name}</strong>
                                        </div>
                                        <Paragraph ellipsis={{ rows: 2, expandable: true }} className='mt-3'>{cmt.noiDung}</Paragraph>
                                        <span className='block mt-3'>
                                            <Rate value={cmt.saoBinhLuan} />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </>
                }
            </div>
        </>
    )
}

export default SliderComment;

