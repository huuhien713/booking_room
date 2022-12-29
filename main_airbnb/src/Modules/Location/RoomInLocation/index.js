import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Space, Button, Empty, Segmented, Checkbox, Input, Tooltip, Row, Col, Skeleton } from 'antd';
import { MenuOutlined, SearchOutlined, StarOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { IoBedOutline } from 'react-icons/io5'
import { TbBath } from 'react-icons/tb'
import { MdArrowForwardIos } from 'react-icons/md'
import { ImArrowDown2 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomByLocation } from '../../../Services/Slices/roomSlice';
import sort from '../../../Utils/sort'
import { useViewPort } from '../../../Hooks/useViewPort';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const RoomInLocation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [screenWidth] = useViewPort();
    const { idLocation } = useParams();
    const { roomByLocation, isLoading } = useSelector(state => state.room);
    const { Title, Text } = Typography;
    const [ rooms, setRooms ] = useState(roomByLocation);
    // useEffect setRooms khi api trả về
    useEffect(() => {
        setRooms(roomByLocation)
    }, [roomByLocation])
    // useEffect lấy phòng tại Location hiện tại
    useEffect(() => {
        dispatch(getRoomByLocation(idLocation));
    }, [idLocation, dispatch])
    //  hàm xử lý bộ lọc segmented
    const handleChange = (value) => {
        if (value === 'max') {
            // hàm sort chuyển mảng ban đầu => mảng có object.giaTien từ cao đến thấp
            let increase = sort(roomByLocation);
            setRooms(increase)
        } else if (value === 'min') {
            // hàm sort chuyển mảng ban đầu => mảng có object.giaTien từ cao đến thấp
            let increase = sort(roomByLocation);
            // đảo mảng từ thấp đến cao
            increase.reverse();
            setRooms(increase);
        } else if (value === 'all' || value === 'all2') {
            // chuyển về hiện trạng ban đầu
            setRooms(roomByLocation);
        }
    }
    // hàm xử lý checkbox
    const onChange = (e) => {
        const { name, checked } = e.target;
        let temp = rooms?.filter(item => item[name] === checked);
        if (checked === true) {
            setRooms(temp)
        } else if (checked === false) {
            let temp = roomByLocation?.filter(item => item[name] === checked);
            setRooms((prev) => [...new Set([...prev, ...temp])]);
        }
    };
    // hàm xử lý search bar
    const onChangeSearch = (e) => {
        const { value } = e.target;
        let temp = roomByLocation?.filter(item => item.tenPhong.toLowerCase().includes(value, 0));
        setRooms(temp);
    }

    return (
        <div className='lg:grid grid-cols-[1fr_3fr] gap-5 xs:block'>
            <div className='w-full overflow-hidden'>
                <div className='w-full xs:my-3 md:my-7'>
                    <Input prefix={<SearchOutlined />} placeholder='Tìm kiếm văn bản' className='rounded-2xl' onChange={onChangeSearch} />
                </div>
                <div className='lg:px-4'>
                    <Title level={4} className='xs:text-center lg:text-left !mb-4'>Tiện nghi chổ nghĩ</Title>
                    <div className='lg:block xs:flex flex-wrap'>
                        <div className='mb-3'>
                            <Checkbox name={'banUi'} onChange={onChange}>Máy nước nóng</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'mayGiat'} onChange={onChange}>Máy giặt</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'tivi'} onChange={onChange}>Tivi 65Inch</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'dieuHoa'} onChange={onChange}>Điều hòa</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'bep'} onChange={onChange}>Dụng cụ bếp</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'doXe'} onChange={onChange}>Bãi đỗ xe</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'banLa'} onChange={onChange}>Bàn là</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'hoBoi'} onChange={onChange}>Hồ bơi</Checkbox>
                        </div>
                        <div className='mb-3'>
                            <Checkbox name={'wifi'} onChange={onChange}>Wifi</Checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full overflow-hidden'>
                <Segmented
                    defaultValue={'all'}
                    className='border border-[#cddfe2] my-4'
                    onChange={handleChange}
                    options={[
                        { icon: screenWidth <= 600 ? (<div className='p-2 mb-1'><MenuOutlined /></div>) : null, label: screenWidth > 600 ? (<div className='p-3'><strong>Tất cả</strong></div>) : null, value: 'all' },
                        { icon: screenWidth <= 600 ? (<div className='p-2 mb-1'><VerticalAlignTopOutlined /></div>) : null, label: screenWidth > 600 ? (<div className='p-3'><strong>Giá cao nhất</strong></div>) : null, value: 'max' },
                        { icon: screenWidth <= 600 ? (<div className='p-2 mb-1'><VerticalAlignBottomOutlined /></div>) : null, label: screenWidth > 600 ? (<div className='p-3'><strong>Giá thấp nhất</strong></div>) : null, value: 'min' },
                        { icon: screenWidth <= 600 ? (<div className='p-2 mb-1'><StarOutlined /></div>) : null, label: screenWidth > 600 ? (<div className='p-3'><strong>Phù hợp nhất</strong></div>) : null, value: 'all2' },
                    ]}
                />
                {isLoading ?
                    <>
                        {Array(3).fill(0).map((item, index) => (
                            <div key={index} className='md:grid xs:block grid-cols-[4fr_3fr_2fr] border border-[#cddfe2] rounded-md overflow-hidden shadow-lg mb-4 hover:shadow-3xl duration-500'>
                                <div className='overflow-hidden'>
                                    <Skeleton.Image active className='block !w-[100%]' style={{ height: 240 }} />
                                    <div className='grid grid-cols-4 gap-1 w-full h-[60px] mt-1'>
                                        <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                        <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                        <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                        <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                    </div>
                                </div>
                                <div className='p-4'>
                                    <Skeleton active block />
                                    <Skeleton active block title={{ width: 0, style: { display: 'none' } }} paragraph={{ rows: 3 }} />
                                </div>
                                <div className='flex flex-col justify-between border-l border-[#cddfe2] md:pt-4 xs:pt-0 xs:p-4 text-right'>
                                    <div className='mb-2'>
                                        <Skeleton.Button active block />
                                    </div>
                                    <div className='flex flex-col xs:items-start md:items-end'>
                                        <Skeleton.Input active className='mb-1' />
                                        <Skeleton.Input active className='mb-1' size='small' />
                                        <Skeleton.Input active className='mb-1' />
                                    </div>
                                    <div className='w-full'>
                                        <Skeleton.Button active block />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> :
                    <>
                        {rooms?.length === 0 ? <Empty className='w-full' /> :
                            <Space className='w-full' direction='vertical' size={16}>
                                {rooms?.map((room, index) => (
                                    <div key={index} className='md:grid xs:block grid-cols-[4fr_3fr_2fr] border border-[#cddfe2] rounded-md overflow-hidden shadow-lg hover:shadow-3xl duration-500'>
                                        <div className='overflow-hidden'>
                                            <LazyLoadImage
                                                src={room?.hinhAnh}
                                                alt={room?.tenPhong}
                                                effect='blur'
                                                width={'100%'}
                                                // height={'100%'}
                                                className='block w-[200%] max-w-[200%] h-full max-h-[240px] min-h-[175px] object-cover'
                                            />
                                            {/* <img className='block w-[200%] max-w-[200%] h-full max-h-[240px] min-h-[175px] object-cover' src={room.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} /> */}
                                            <div className='grid grid-cols-4 gap-1 w-full h-[60px] mt-1'>
                                                <Tooltip className='cursor-pointer'
                                                    overlayInnerStyle={{ width: '400px', height: '300px', padding: 0, borderRadius: 0 }}
                                                    overlayClassName='popupImage' showArrow={false} color='#fff' placement='topLeft'
                                                    title={<div style={{ backgroundImage: `url('${room?.hinhAnh}')`, boxShadow: '0 0 0 2px #cddfe2 inset' }} className='bg-[length:415%_200%] bg-[67.5%_0] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>}
                                                >
                                                    <div
                                                        style={{ backgroundImage: `url('${room?.hinhAnh}')` }}
                                                        className='bg-[length:415%_200%] bg-[67.5%_0] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip className='cursor-pointer'
                                                    overlayInnerStyle={{ width: '400px', height: '300px', padding: 0, borderRadius: 0 }}
                                                    overlayClassName='popupImage' showArrow={false} color='#fff' placement='top'
                                                    title={<div style={{ backgroundImage: `url('${room?.hinhAnh}')`, boxShadow: '0 0 0 2px #cddfe2 inset' }} className='bg-[length:415%_200%] bg-[100%_0] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>}
                                                >
                                                    <div 
                                                        style={{ backgroundImage: `url('${room?.hinhAnh}')` }} 
                                                        className='bg-[length:415%_200%] bg-[100%_0] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip className='cursor-pointer'
                                                    overlayInnerStyle={{ width: '400px', height: '300px', padding: 0, borderRadius: 0 }}
                                                    overlayClassName='popupImage' showArrow={false} color='#fff' placement='top'
                                                    title={<div style={{ backgroundImage: `url('${room?.hinhAnh}')`, boxShadow: '0 0 0 2px #cddfe2 inset' }} className='bg-[length:415%_260%] bg-[67.5%_100%] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>}
                                                >
                                                    <div
                                                        style={{ backgroundImage: `url('${room?.hinhAnh}')` }}
                                                        className='bg-[length:415%_260%] bg-[67.5%_100%] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip className='cursor-pointer'
                                                    overlayInnerStyle={{ width: '400px', height: '300px', padding: 0, borderRadius: 0 }}
                                                    overlayClassName='popupImage' showArrow={false} color='#fff' placement='topRight'
                                                    title={<div style={{ backgroundImage: `url('${room?.hinhAnh}')`, boxShadow: '0 0 0 2px #cddfe2 inset' }} className='bg-[length:415%_260%] bg-[100%_100%] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>}
                                                >
                                                    <div
                                                        style={{ backgroundImage: `url('${room?.hinhAnh}')` }}
                                                        className='bg-[length:415%_260%] bg-[100%_100%] bg-no-repeat w-full h-full overflow-hidden'>
                                                        <img className='block w-full h-full object-fit none opacity-0' src={room?.hinhAnh} alt={`hình ảnh phòng ${room?.tenPhong}`} />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <div className='p-4'>
                                            <Title level={4} className='md:!text-sm !mb-3'>{room.tenPhong}</Title>
                                            <Space size={16} wrap>
                                                {room?.tivi ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Tivi 65Inch</Text>
                                                    </Space> : null}
                                                {room?.mayGiat ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Máy giặt riêng</Text>
                                                    </Space> : null}
                                                {room?.dieuHoa ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Điều hòa</Text>
                                                    </Space> : null}
                                                {room?.wifi ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Wifi miễn phí</Text>
                                                    </Space> : null}
                                                {room?.bep ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Đầy đủ dụng cụ bếp</Text>
                                                    </Space> : null}
                                                {room?.doXe ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Bãi để xe</Text>
                                                    </Space> : null}
                                                {room?.banLa ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Bàn là</Text>
                                                    </Space> : null}
                                                {room?.banUi ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Máy nước nóng</Text>
                                                    </Space> : null}
                                                {room?.hoBoi ?
                                                    <Space align='center' direction='vertical'>
                                                        <Text strong className='xs:text-xs border border-[#cddfe2] rounded-sm p-1'>Hồ bơi</Text>
                                                    </Space> : null}
                                            </Space>
                                            <div className='py-3 xs:border-b md:border-none border-[#cddfe2]'>
                                                <Text className='flex items-center mb-2'><IoBedOutline className='mr-2' /> {room.phongNgu} phòng ngủ</Text>
                                                <Text className='flex items-center mb-2'><TbBath className='mr-2' /> {room.phongTam} phòng tắm</Text>
                                                <Text className='flex items-center mb-2'><IoBedOutline className='mr-2' /> {room.giuong} giường đôi</Text>
                                            </div>
                                        </div>

                                        <Space align={screenWidth >= 768 ? 'end' : null} direction='vertical' className='flex flex-col justify-between border-l border-[#cddfe2] md:pt-4 xs:pt-0 xs:p-4'>
                                            <div className='flex items-center'>
                                                <Title level={5} className='!m-0'>Tuyệt vời</Title>
                                                <div className='font-semibold bg-[#3E6CEA] text-white rounded-t-full rounded-r-full p-2 ml-2'>
                                                    8,7
                                                </div>
                                            </div>
                                            <div className='text-right lg:text-right xs:text-left'>
                                                <div className='flex items-center justify-center text-[#b42424] font-bold bg-[#f9d8d8] rounded-md p-1 my-2'>
                                                    <ImArrowDown2 />
                                                    <span className='uppercase ml-2'>siêu tiết kiệm</span>
                                                </div>
                                                <Text className='text-xs text-[#90949c]'>Giá phòng mỗi đêm từ</Text>
                                                <Title level={3} className='!m-0 md:!text-xl xl:!text-2xl'>
                                                    {(room.giaTien * 29000).toLocaleString()} VNĐ
                                                </Title>
                                            </div>
                                            <Button
                                                onClick={() => navigate(`/phong/${room.id}`)}
                                                className='flex items-center bg-[#3E6CEA] ml-auto xs:w-full xs:justify-center'
                                                type='primary'>
                                                Chọn Phòng
                                                <MdArrowForwardIos className='ml-2 mb-[-5px]' />
                                            </Button>
                                        </Space>
                                    </div>
                                ))}
                            </Space>
                        }
                    </>
                }
                {/* {Array(3).fill(0).map((item, index) => (
                    <div key={index} className='md:grid xs:block grid-cols-[4fr_3fr_2fr] border border-[#cddfe2] rounded-md overflow-hidden shadow-lg mb-4 hover:shadow-3xl duration-500'>
                        <div className='overflow-hidden'>
                            <Skeleton.Image active className='block !w-[100%]' style={{ height: 240 }} />
                            <div className='grid grid-cols-4 gap-1 w-full h-[60px] mt-1'>
                                <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                                <Skeleton.Image active className='block !w-[100%]' style={{ height: 60 }} />
                            </div>
                        </div>
                        <div className='p-4'>
                            <Skeleton active block />
                            <Skeleton active block title={{ width: 0, style: { display: 'none' } }} paragraph={{ rows: 3 }} />
                        </div>
                        <div className='flex flex-col justify-between border-l border-[#cddfe2] md:pt-4 xs:pt-0 xs:p-4 text-right'>
                            <div className='mb-2'>
                                <Skeleton.Button active block />
                            </div>
                            <div className='flex flex-col xs:items-start md:items-end'>
                                <Skeleton.Input active className='mb-1' />
                                <Skeleton.Input active className='mb-1' size='small' />
                                <Skeleton.Input active className='mb-1' />
                            </div>
                            <div className='w-full'>
                                <Skeleton.Button active block />
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default RoomInLocation;
