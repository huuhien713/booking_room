import { Button, Divider, Skeleton, Space, Typography } from 'antd'
import React from 'react';
import { GiComputerFan, GiWashingMachine } from 'react-icons/gi';
import { MdLocalParking, MdOutlineIron, MdMicrowave } from 'react-icons/md';
import { HiOutlineWifi } from 'react-icons/hi2';
import { BiSwim } from 'react-icons/bi';
import { SlScreenDesktop } from 'react-icons/sl';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { useSelector } from 'react-redux';

const RoomDetails = ({ roomById, showModal }) => {
    const { Title, Text } = Typography;
    const { allComment } = useSelector(state => state.comment);
    const { isLoading } = useSelector(state => state.room);

    return (
        <>
            {isLoading ?
                <>
                    <div className='flex items-center flex-wrap'>
                        {Array(8).fill(0).map((item, index) => (
                            <div key={index} className='mr-4'>
                                <Skeleton.Avatar active block shape='square' size={40} className='mb-1' />
                                <Skeleton active title={{ width: 40 }} paragraph={{ rows: 0, style: { margin: 0 } }} />
                            </div>
                        ))}
                    </div>
                    <Divider orientation='left'></Divider>
                    <div className='flex items-center justify-between'>
                        <div className='text-left w-1/3'>
                            <Skeleton active block />
                        </div>
                        <div className='text-right w-1/3'>
                            {/* <Skeleton active title={{width: 70}} paragraph={{rows: 0, style: {margin: 0}}} /> */}
                            <Skeleton active block style={{ float: 'right' }} />
                        </div>
                    </div>
                </> :
                <>
                    <Space size={16} wrap>
                        {roomById?.tivi ?
                            <Space align='center' direction='vertical'>
                                <SlScreenDesktop className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Tivi 65Inch</Text>
                            </Space> : null}
                        {roomById?.mayGiat ?
                            <Space align='center' direction='vertical'>
                                <GiWashingMachine className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Máy giặt riêng</Text>
                            </Space> : null}
                        {roomById?.dieuHoa ?
                            <Space align='center' direction='vertical'>
                                <GiComputerFan className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Điều hòa</Text>
                            </Space> : null}
                        {roomById?.wifi ?
                            <Space align='center' direction='vertical'>
                                <HiOutlineWifi className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Wifi miễn phí</Text>
                            </Space> : null}
                        {roomById?.bep ?
                            <Space align='center' direction='vertical'>
                                <TbToolsKitchen2 className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Đầy đủ dụng cụ bếp</Text>
                            </Space> : null}
                        {roomById?.doXe ?
                            <Space align='center' direction='vertical'>
                                <MdLocalParking className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Bãi để xe</Text>
                            </Space> : null}
                        {roomById?.banLa ?
                            <Space align='center' direction='vertical'>
                                <MdOutlineIron className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Bàn là</Text>
                            </Space> : null}
                        {roomById?.hoBoi ?
                            <Space align='center' direction='vertical'>
                                <BiSwim className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Hồ bơi</Text>
                            </Space> : null}
                        {roomById?.banUi ?
                            <Space align='center' direction='vertical'>
                                <MdMicrowave className='lg:text-2xl xs:text-xl font-bold text-blue' />
                                <Text strong className='xs:!text-xs'>Máy nước nóng</Text>
                            </Space> : null}
                    </Space>
                    <Divider orientation='left'></Divider>
                    <div className='md:flex items-center justify-between xs:block'>
                        <Space direction='vertical' className='w-[50%] md:flex xs:hidden'>
                            <strong>Agoda</strong>
                            <div className='flex items-center'>
                                <img className='w-[50px] mr-3' src='https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg' alt='' />
                                <Title level={4} className='!text-blue !m-0'>9,0 Ấn tượng</Title>
                            </div>
                            <strong>được đánh giá từ {allComment?.length} du khách</strong>
                        </Space>
                        <Space direction='vertical' className='md:w-[50%] xs:w-full md:text-right xs:text-left'>
                            <strong>Giá phòng mỗi đêm từ</strong>
                            <Title level={3} className='!m-0 !text-[#FF5E1F]'>
                                {(roomById?.giaTien * 29000).toLocaleString()} VNĐ
                            </Title>
                            <Button onClick={() => showModal()} className='text-white font-semibold bg-[#FF5E1F] w-full hover:border-none hover:!text-white'>Đặt ngay</Button>
                        </Space>
                    </div>
                </>
            }
        </>
    )
}

export default RoomDetails