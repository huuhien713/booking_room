
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Space, Tabs, Typography } from 'antd';
import { getRoomByLocation } from '../../Services/Slices/roomSlice';
import { GoLocation } from 'react-icons/go'
import { useNavigate } from 'react-router-dom';
import { useViewPort } from '../../Hooks/useViewPort'
import { LazyLoadImage, trackWindowScroll  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const TabsRoom = () => {
    const { Title, Text } = Typography;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [screenWidth] = useViewPort();
    const { allLocation, isLoading: isLoadingLocation } = useSelector(state => state.location);
    const { roomByLocation, isLoading: isLoadingRoom } = useSelector(state => state.room);
    const [room, SetRoom] = useState(1);

    useEffect(() => {
        dispatch(getRoomByLocation(room));
    }, [room, dispatch])

    const handleChange = (value) => {
        SetRoom(value);
    }

    const items = allLocation.slice(0, 7).map((location, index) => {
        return {
            label: location.tinhThanh,
            key: index + 1,
            children:
                <div className='grid xl:grid-cols-4 gap-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1'>
                    {isLoadingRoom &&
                        Array(4).fill(0).map((item, index) => (
                            <div key={index} className='w-full h-full shadow-lg rounded-lg overflow-hidden'>
                                <Skeleton.Image active className='block mb-2 !w-full ' style={{ height: 200 }} />
                                <Skeleton active className='p-2' rows={3} />
                            </div>
                        ))
                    }
                    {!isLoadingRoom && roomByLocation?.map((item, index) => (
                        <div onClick={() => navigate(`/phong/${item.id}`)} key={index}
                            className='overflow-hidden cursor-pointer hover:translate-y-1 duration-100 shadow-lg rounded-lg'>
                            <LazyLoadImage
                                className='max-w-[200%] w-[200%] max-h-[200px] block'
                                width={'100%'}
                                height={'200px'}
                                src={item.hinhAnh}
                                alt={`hình ảnh chổ ở ${item.tenPhong}`}
                                effect='blur' />
                            {/* <img className='max-w-[200%] w-[200%] max-h-[200px] block' src={item.hinhAnh} alt={`hình ảnh chổ ở ${item.tenPhong}`} /> */}
                            <Space direction='vertical' className='p-2'>
                                <Title
                                    level={5}
                                    className='capitalize'
                                    ellipsis={{
                                        rows: 2,
                                        expandable: true,
                                        symbols: 'more'
                                    }}>
                                    {item.tenPhong}
                                </Title>
                                <strong className='flex items-center text-blue'>
                                    <GoLocation className='mr-1 text-xl' />
                                    {location.tenViTri}, {location.tinhThanh}
                                </strong>
                                <Text type='secondary'>Giá mỗi đêm rẻ nhất từ</Text>
                                <Title type='danger' level={5}>VND {item.giaTien}</Title>
                            </Space>
                        </div>
                    ))}
                </div>,
        };
    })

    return (
        <div>
            {isLoadingLocation ?
                <div className='w-1/3 mx-auto mb-3'>
                    <Skeleton.Input active block />
                </div> :
                <Title level={3} className='text-center text-white mb-3 lg:!text-xl md:!text-lg xs:!text-sm'>Những chỗ nghỉ nổi bật khuyến nghị cho bạn:</Title>}
            {isLoadingLocation &&
                <div>
                    <div className='flex items-center justify-center flex-nowrap overflow-hidden text-center border-b border-[#0505050f] mb-3 pb-3'>
                        {Array(7).fill(0).map((item, index) => (
                            <Skeleton.Button key={index} active size={'small'} shape={'square'} className='mr-2' />
                        ))}
                    </div>
                    <div className='grid xl:grid-cols-4 gap-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1'>
                        {Array(4).fill(0).map((item, index) => (
                            <div key={index} className='w-full h-full shadow-lg rounded-lg overflow-hidden'>
                                <Skeleton.Image active className='block mb-2 !w-full ' style={{ height: 200 }} />
                                <Skeleton active className='p-2' rows={3} />
                            </div>
                        ))}
                    </div>
                </div>
            }
            <Tabs tabPosition='top' centered={screenWidth > 768 ? true : false} tabBarStyle={{ display: 'block' }} defaultActiveKey="1" items={items} onChange={handleChange} />
        </div>
    )
}

export default trackWindowScroll(TabsRoom)