import React, { useEffect, useState } from 'react';
import { FaHotel } from 'react-icons/fa';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { SlPlane } from 'react-icons/sl';
import { IoBedOutline } from 'react-icons/io5';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { Button, DatePicker, Form, Popover, Select, Skeleton, Typography } from 'antd';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { getAllLocation } from '../../Services/Slices/locationSlice';
import { chonPhong } from '../../Services/Slices/roomSlice';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const { Title, Text } = Typography;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allLocation, isLoading } = useSelector(state => state.location);

    const [ people, setPeople ] = useState(1);
    const [ children, setChildren  ] = useState(0);
    const [ idLocation, setIdLocation ] = useState(0);
    const [ time, setTime ] = useState({ ngayDen: dayjs(), ngayDi: dayjs().add(1, 'day') });

    useEffect(() => {
        dispatch(getAllLocation())
    }, []);

    const handleChangeLocation = (value, location) => {
        setIdLocation(location.id)
    };

    const handleNgayDen = (dateString) => {
        setTime((prev) => ({ ...prev, ngayDen: dateString }))
    };

    const handleNgayDi = (dateString) => {
        setTime((prev) => ({ ...prev, ngayDi: dateString }))
    };

    console.log(time)

    const onFinish = (values) => {
        const info = {
            maPhong: '',
            ngayDen: time.ngayDen,
            ngayDi: time.ngayDi,
            soLuongKhach: people + children,
            maNguoiDung: ''
        }
        dispatch(chonPhong(info));
        navigate(`/vitri/${idLocation}`);
    }

    let options = allLocation.map((item, index) => {
        return { id: item.id, value: item.tenViTri }
    })

    const content = (
        <div className='w-64'>
            <div className='flex items-center justify-between mb-2'>
                <Text strong>Người lớn</Text>
                <div>
                    <Button className='px-3' onClick={() => people > 1 ? setPeople((prev) => prev - 1) : 1}>-</Button>
                    <span className='mx-2'>
                        {people}
                    </span>
                    <Button className='px-3' onClick={() => setPeople((prev) => prev + 1)}>+</Button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <Text strong>Trẻ Em</Text>
                <div>
                    <Button className='px-3' onClick={() => children > 1 ? setChildren((prev) => prev - 1) : 1}>-</Button>
                    <span className='mx-2'>
                        {children}
                    </span>
                    <Button className='px-3' onClick={() => setChildren((prev) => prev + 1)}>+</Button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {
                isLoading ?
                    <div className='sm:max-w-[50%] xs:max-w-[240px] mx-auto'>
                        <div className='mb-3'>
                            <Skeleton.Input active block size='large' />
                        </div>
                        <div>
                            <Skeleton.Input active block />
                        </div>
                    </div> :
                    <div className='text-center lg:pt-12 md:pt-8 xs:pt-0 md:max-w-full sm:max-w-full xs:max-w-[240px] mx-auto'>
                        <Title level={3} className='!text-white lg:!text-xl md:!text-lg sm:!text-base xs:!text-sm'>KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA</Title>
                        <Text strong className='text-white lg:!text-lg md:!text-base xs:!text-xs'>{`Nhận giá tốt nhất cho > 2.000.000 chỗ nghỉ, trên toàn cầu`}</Text>
                    </div>
            }
            <div className='mt-5'>
                <div className='relative'>
                    {isLoading ?
                        <>
                            <div>
                                <div className=' bg-gray-light lg:pt-14 md:pt-12 sm:pt-5 xs:pt-8 xs:pb-6 lg:px-16 md:px-12 xs:px-4 rounded-lg mt-20 xs:mt-16'>
                                    <div className='mb-2'>
                                        <Skeleton.Input active block />
                                    </div>
                                    <div className='md:grid grid-cols-[2fr_1fr] xs:block gap-3'>
                                        <div className='md:mb-0 xs:mb-2'>
                                            <Skeleton.Input active block />
                                        </div>
                                        <div>
                                            <Skeleton.Input active block />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full absolute top-[85%] xs:top-[90%] text-center '>
                                    <div className='md:!w-1/2 xs:!w-1/3 mx-auto'>
                                        <Skeleton.Button active block />
                                    </div>
                                </div>
                            </div>
                            <div className='w-11/12 mx-auto rounded-lg absolute top-[-40%] translate-y-[40%] left-[50%] translate-x-[-50%]'>
                                <Skeleton.Input className='xs:!h-[64px] sm:!h-[54px] md:!h-[68px]' active block />
                            </div>
                        </> :
                        <>
                            <Form onFinish={onFinish}>
                                <div className=' bg-gray-light lg:pt-14 md:pt-12 sm:pt-5 xs:pt-8 xs:pb-6 lg:px-16 md:px-12 xs:px-4 rounded-lg mt-20 xs:mt-16'>
                                    <Form.Item name='select' className='xs:mb-0'>
                                        <Select className='w-full mb-4 xs:mb-2' placeholder={'Chọn điểm đến'} onChange={handleChangeLocation} options={options} />
                                    </Form.Item>
                                    <div className='md:grid grid-cols-[2fr_1fr] xs:block gap-3'>
                                        {/* <RangePicker className='w-full' defaultValue={[dayjs(),]} onChange={handleChangeDate} /> */}
                                        <div className='flex items-center'>
                                            <Form.Item name='ngayDen' className='w-full pr-2 mb-0' initialValue={time.ngayDen}>
                                                <DatePicker onChange={handleNgayDen} className='w-full' size='large' />
                                            </Form.Item>
                                            <Form.Item name='ngayDi' className='w-full mb-0' initialValue={time.ngayDi}>
                                                <DatePicker onChange={handleNgayDi} className='w-full' size='large' />
                                            </Form.Item>
                                        </div>
                                        <Popover showArrow={false} placement='bottom' content={content} trigger="click">
                                            <Button className='bg-white block !h-full xs:w-full xs:!p-1 md:mt-0 xs:mt-2' size='large'>{people + children} người</Button>
                                        </Popover>
                                    </div>
                                </div>
                                <div className='text-center w-full absolute top-[85%] xs:top-[90%]'>
                                    <Button htmlType='submit' size='large' className='bg-gray md:w-1/2 xs:w-1/3 md:!p-1 md:!h-full xs:!p-0 xs:!h-8' type='primary'>
                                        <span className='font-semibold'>Tìm</span>
                                    </Button>
                                </div>
                            </Form>
                            <ul className='w-11/12 mx-auto grid grid-cols-5 gap-2 bg-white rounded-lg text-center lg:px-16 md:px-8 xs:px-2 absolute top-[-40%] translate-y-[40%] left-[50%] translate-x-[-50%]'>
                                <li>
                                    <div className='flex flex-col items-center cursor-pointer hover:text-blue hover:font-semibold sm:pt-4 xs:pt-2'>
                                        <FaHotel />
                                        <span className='md:pt-2 md:pb-3 xs:pb-2 lg:text-lg xs:text-xs'>Khách sạn</span>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex flex-col items-center cursor-pointer hover:text-blue hover:font-semibold sm:pt-4 xs:pt-2'>
                                        <MdOutlineMapsHomeWork />
                                        <span className='md:pt-2 md:pb-3 xs:pb-2 lg:text-lg xs:text-xs'>Chỗ ở riêng</span>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex flex-col items-center cursor-pointer hover:text-blue hover:font-semibold sm:pt-4 xs:pt-2'>
                                        <SlPlane />
                                        <span className='md:pt-2 md:pb-3 xs:pb-2 lg:text-lg xs:text-xs'>Chuyến bay</span>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex flex-col items-center cursor-pointer hover:text-blue hover:font-semibold sm:pt-4 xs:pt-2'>
                                        <IoBedOutline />
                                        <span className='md:pt-2 md:pb-3 xs:pb-2 lg:text-lg xs:text-xs'>Ở dài ngày</span>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex flex-col items-center cursor-pointer hover:text-blue hover:font-semibold sm:pt-4 xs:pt-2'>
                                        <HiOutlineCalendarDays />
                                        <span className='md:pt-2 md:pb-3 xs:pb-2 lg:text-lg xs:text-xs'>Hoạt động</span>
                                    </div>
                                </li>
                            </ul>
                        </>}
                </div>
            </div>
        </>
    )
}

export default SearchBar