import React, { useEffect } from 'react'
import { Skeleton, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoom } from '../../../Services/Slices/roomSlice';
import { getAllLocation } from '../../../Services/Slices/locationSlice';

const { Title } = Typography;
const HistoryBooking = ({ listBookingById }) => {
    const dispatch = useDispatch();
    const { allRoom, isLoading: isLoadingRoom } = useSelector(state => state.room);
    const { allLocation, isLoading } = useSelector(state => state.location);

    useEffect(() => {
        dispatch(getAllRoom())
        dispatch(getAllLocation())
    }, [])

    const columns = [
        { title: isLoading ? <Skeleton active title={{ width: 30, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'STT', width: 30, dataIndex: 'stt', key: 'stt', fixed: 'left', align: 'center' },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Tên phòng', width: 275, dataIndex: 'name', key: 'name', align: 'center' },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Điạ điểm', width: 75, dataIndex: 'location', key: 'location', align: 'center' },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ngày đến', width: 75, dataIndex: 'dayCome', key: 'come', align: 'center' },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ngày đi', width: 75, dataIndex: 'dayGo', key: 'dayGo', align: 'center' },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Số khách', width: 50, dataIndex: 'quantity', key: 'quantity', align: 'center' },
    ]

    const data = listBookingById?.map((itemBooking, index) => {
        return {
            key: index,
            stt: isLoading ? <Skeleton active title={{ width: 30, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : (index + 1),
            name: isLoadingRoom ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : (allRoom?.find(item => item.id === itemBooking.maPhong))?.tenPhong,
            location: isLoadingRoom ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : (allLocation?.find(item => item.id === (allRoom?.find(item => item.id === itemBooking.maPhong))?.maViTri))?.tinhThanh,
            dayCome: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : itemBooking.ngayDen.slice(0, 10),
            dayGo: isLoading ? <Skeleton active title={{ width: 80, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : itemBooking.ngayDi.slice(0, 10),
            quantity: isLoading ? <Skeleton active title={{ width: 30, style: { margin: 'auto' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : itemBooking.soLuongKhach,
        }
    })

    return (
        <div className="p-6">
            {isLoading ?
                <div className='w-1/4 md:!mb-4 xs:!mb-1'>
                    <Skeleton.Input active block size='large' />
                </div> :
                <Title className="md:!mb-4 xs:!mb-1 xl:!text-xl md:!text-lg xs:!text-sm">Lịch sử giao dịch</Title>
            }
            <Space direction="vertical" className="w-full">
                <Space direction="vertical" className="bg-white w-full py-6 px-5 xs:p-2">
                    <Table
                        bordered
                        size='small'
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: 800 }}
                    />
                </Space>
            </Space>
        </div>
    )
}

export default HistoryBooking