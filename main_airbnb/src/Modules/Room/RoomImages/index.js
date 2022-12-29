import { Modal, Skeleton, Space } from 'antd'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const RoomImages = ({ roomById }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(1);
    const { isLoading } = useSelector(state => state.room);

    const showModal = (value) => {
        setImage(value);
        setIsModalOpen(true);
    };
    const hideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {isLoading ?
                <div className='lg:h-[500px] xs:h-[300px] grid lg:grid-cols-5 lg:grid-rows-4 md:grid-cols-4 md:grid-rows-6 xs:grid-cols-4 xs:grid-rows-4 gap-3 '>
                    <Skeleton.Image className='!w-full !h-full lg:row-span-4 md:row-span-4 xs:col-span-4 xs:row-span-2' />
                    <Skeleton.Image className='!w-full !h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 overflow-hidden' />
                    <Skeleton.Image className='!w-full !h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 overflow-hidden' />
                    <Skeleton.Image className='!w-full !h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 overflow-hidden' />
                    <Skeleton.Image className='!w-full !h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 overflow-hidden' />
                </div> :
                <Space>
                    <div className='lg:max-h-[500px] xs:max-h-[300px] grid lg:grid-cols-5 lg:grid-rows-4 md:grid-cols-4 md:grid-rows-6 xs:grid-cols-4 xs:grid-rows-4 gap-3 '>
                        <div
                            onClick={() => { showModal(1) }}
                            style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                            className='bg-[length:200%_100%] bg-no-repeat w-full h-full lg:row-span-4 md:row-span-4 xs:col-span-4 xs:row-span-2 rounded-lg overflow-hidden cursor-pointer'>
                            <img className='block w-full h-[500px] object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                        </div>
                        <div
                            onClick={() => { showModal(2) }}
                            style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                            className='bg-[length:415%_200%] bg-[67.5%_0] bg-no-repeat w-full h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 rounded-lg overflow-hidden cursor-pointer'>
                            <img className='block w-full h-full object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                        </div>
                        <div
                            onClick={() => { showModal(3) }}
                            style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                            className='bg-[length:415%_200%] bg-[100%_0] bg-no-repeat w-full h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 rounded-lg overflow-hidden cursor-pointer'>
                            <img className='block w-full h-full object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                        </div>
                        <div
                            onClick={() => { showModal(4) }}
                            style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                            className='bg-[length:415%_260%] bg-[67.5%_100%] bg-no-repeat w-full h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 rounded-lg overflow-hidden cursor-pointer'>
                            <img className='block w-full h-full object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                        </div>
                        <div
                            onClick={() => { showModal(5) }}
                            style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                            className='bg-[length:415%_260%] bg-[100%_100%] bg-no-repeat w-full h-full lg:row-auto md:col-auto md:row-span-2 xs:col-span-2 rounded-lg overflow-hidden cursor-pointer'>
                            <img className='block w-full h-full object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                        </div>
                    </div>
                </Space>
            }
            <Modal
                title={roomById?.tenPhong}
                centered
                open={isModalOpen}
                onCancel={hideModal}
                width={'80%'}
                footer={null}
            >
                <div
                    style={{ backgroundImage: `url('${roomById?.hinhAnh}')` }}
                    className={`bg-no-repeat w-full h-full rounded-lg overflow-hidden
                                ${image === 1 ? 'bg-[length:200%_100%] col-span-4 row-span-4' :
                            image === 2 ? 'bg-[length:415%_200%] bg-[67.5%_0]' :
                                image === 3 ? 'bg-[length:415%_200%] bg-[100%_0]' :
                                    image === 4 ? 'bg-[length:415%_260%] bg-[67.5%_100%]' :
                                        image === 5 ? 'bg-[length:415%_260%] bg-[100%_100%]' : ''
                        }`}>
                    <img className='block w-full xl:h-[500px] md:h-[350px] sm:h-[250px] xs:h-[150px] object-fit none opacity-0' src={roomById?.hinhAnh} alt='' />
                </div>
            </Modal>
        </>
    )

}

export default RoomImages