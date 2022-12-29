import React, { useEffect } from 'react'
import { Button, Skeleton, Space, Typography } from 'antd';

import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { getListBookingById } from '../../Services/Slices/bookingSlice';
import { useNavigate } from 'react-router-dom';
import StepRanks from './StepRanks';


const MemberCard = () => {
    const { Title, Paragraph } = Typography;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { isLoading } = useSelector(state => state.location);
    const { listBookingById } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(getListBookingById(user?.user?.id))
    }, [])

    return (
        <div>
            {isLoading ?
                <div className='w-1/3 mx-auto mb-3'>
                    <Skeleton.Input active block />
                </div> :
                <Title level={3} className='text-white text-center lg:!text-xl md:!text-lg xs:!text-sm'>Chào mừng trở lại ! Quý khách là VIP</Title>}
            <div className='lg:grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[2fr_6fr_1fr] xs:block py-3 !px-4 xs:px-0 shadow-[0px_1px_3px_1px_#00000033] rounded-xl overflow-hidden'>
                {isLoading ?
                    <div className='flex items-center justify-center flex-col p-3'>
                        <Skeleton.Input className='!w-[280px] !h-[150px] !rounded-xl' active block />
                    </div> :
                    <Card color={
                        listBookingById?.length >= 30 ? 'bg-platinum' :
                            listBookingById?.length >= 15 ? 'bg-gold' :
                                listBookingById?.length >= 5 ? 'bg-silver' :
                                    listBookingById?.length < 5 ? 'bg-bronze' : 'bg-bronze'
                    } rank={
                        listBookingById?.length >= 30 ? 'platinum' :
                            listBookingById?.length >= 15 ? 'gold' :
                                listBookingById?.length >= 5 ? 'silver' :
                                    listBookingById?.length < 5 ? 'bronze' : 'bronze'
                    } />
                }
                <div className='p-3'>
                    {isLoading ?
                        <>
                            <div>
                                <Skeleton title={{ width: 0, style: { display: 'none' } }} paragraph={{ rows: 2, style: { marginTop: 0 } }} />
                            </div>
                            <div className='grid grid-cols-2'>
                                <Skeleton active block paragraph={{ rows: 0, style: { margin: 0 } }} />
                                <Skeleton active block paragraph={{ rows: 0, style: { margin: 0 } }} />
                                <Skeleton active block paragraph={{ rows: 0, style: { margin: 0 } }} />
                            </div>
                            <div>
                                <Skeleton.Input active block className='!h-20' />
                            </div>
                        </> :
                        <>
                            <Paragraph ellipsis={{ rows: 2, expandable: true }} className='text-xs'>
                                Mỗi khi quý khách thấy mác VIP, điều này có nghĩa là quý khách đang nhận được giảm giá đặc biệt hoặc lợi ích chỉ dành cho người dùng VIP. Có được các ưu đãi dành riêng và thu thập nhiều đơn đặt phòng hơn để leo cấp và nhận được nhiều ưu đãi dành riêng hơn!
                            </Paragraph>
                            <Space className='grid grid-cols-2 mb-4' align='center'>
                                <strong className='flex items-center text-xs'><BsFillCheckCircleFill className='mr-2 text-green' /> Đảm Bảo Giá Tốt Nhất</strong>
                                <strong className='flex items-center text-xs'><BsFillCheckCircleFill className='mr-2 text-green' /> Ưu đãi VIP giảm giá tới 10%</strong>
                                <strong className='flex items-center text-xs'><BsFillCheckCircleFill className='mr-2 text-green' /> Ưu đãi nội bộ</strong>
                            </Space>
                            <StepRanks listBookingById={listBookingById} />
                        </>
                    }
                </div>
                <div className='p-3 flex items-center justify-center flex-col lg:col-span-2 xl:col-auto'>
                    {isLoading ?
                        <Skeleton.Button active block /> :
                        <Button onClick={() => navigate('/account')} size='large' className='font-semibold text-blue border-[blue] hover:bg-blue hover:!text-white'>Chi tiết thêm</Button>}
                </div>
            </div>
        </div>
    )
}

export default MemberCard