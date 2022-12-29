import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getRoomById } from '../../Services/Slices/roomSlice';
import { Divider, Modal, Rate, Skeleton, Typography } from 'antd';
import SliderComment from './SliderComment';
import RoomDetails from './RoomDetails';
import RoomImages from './RoomImages';
import SendComment from './SendComment';
import SearchRoom from './SearchRoom'

const Room = () => {
    const { Title, Paragraph } = Typography;
    const { idRoom } = useParams();
    const dispatch = useDispatch();
    const { roomById, isLoading } = useSelector(state => state.room);

    useEffect(() => {
        dispatch(getRoomById(idRoom))
    }, [idRoom, dispatch])

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(4)
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className='max-w-7xl w-4/5 mx-auto my-4'>
            <div className='w-full rounded-lg bg-white p-4 overflow-hidden'>
                {isLoading ?
                    <>
                        <div className='w-1/2'>
                            <Skeleton.Input active block />
                        </div>
                        <div className='w-1/3 mt-2'>
                            <Skeleton.Input active block />
                        </div>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'><Skeleton.Input active block /></Divider>
                    </> :
                    <>
                        <Title level={4} className='xs:!text-sm md:!text-lg lg:!text-xl'>{roomById?.tenPhong}</Title>
                        <span>
                            <Rate tooltips={desc} onChange={setValue} value={value} className='xs:!text-xs md:!text-sm lg:!text-lg' />
                            {value ? <span className="ant-rate-text capitalize">{desc[value - 1]}</span> : ''}
                        </span>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'>Hình ảnh</Divider>
                    </>
                }
                <RoomImages roomById={roomById} />
                {isLoading ?
                    <>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'><Skeleton.Input active block /></Divider>
                        <div>
                            <Skeleton title={{ width: 0, style: { display: 'none' } }} paragraph={{ rows: 3 }} />
                        </div>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'><Skeleton.Input active block /></Divider>
                    </> :
                    <>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'>Mô tả</Divider>
                        <Paragraph className='xs:!text-xs md:!text-sm lg:!text-md'>{roomById?.moTa}</Paragraph>
                        <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'>Tiện nghi khách sạn</Divider>
                    </>
                }

                <RoomDetails roomById={roomById} showModal={showModal} />
                <SliderComment roomById={roomById} />
                {isLoading ? 
                    <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'><Skeleton.Input active block /></Divider> : 
                    <Divider orientation='left' className='xs:!text-xs md:!text-sm lg:!text-lg'>Thêm bình luận của bạn</Divider>
                }
                <SendComment />
                <Modal
                    title="Đặt phòng"
                    open={open}
                    onCancel={handleCancel}
                    footer={false}
                >
                    <div>
                        <SearchRoom roomById={roomById} />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Room