import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Popover, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocation } from '../../../Services/Slices/locationSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { bookingRoom, setIsBook } from '../../../Services/Slices/bookingSlice';
import { setInfoBooking } from '../../../Services/Slices/roomSlice';


const SearchRoom = ({ roomById }) => {
    const { Text } = Typography;
    const { idRoom } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    const { allLocation } = useSelector(state => state.location);
    const { isBook, messageError } = useSelector(state => state.booking);
    const { infoBooking } = useSelector(state => state.room);

    const [time, setTime] = useState({ ngayDen: '', ngayDi: '' });
    const [people, setPeople] = useState(1);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        dispatch(getAllLocation());
    }, []);

    const handleNgayDen = (dateString) => {
        setTime((prev) => ({ ...prev, ngayDen: dateString }))
    };

    const handleNgayDi = (dateString) => {
        setTime((prev) => ({ ...prev, ngayDi: dateString }))
    };

    const onFinish = (value) => {
        if (!user) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Vui lòng đăng nhập trước khi đặt',
                timer: 1500,
                showConfirmButton: false
            });
            const url = location.pathname;
            setTimeout(() => {
                navigate(`/signin?redirect=${url}`)
            }, 1500)
        } else {
            const { ngayDen, ngayDi } = value;
            const info = {
                maPhong: idRoom,
                ngayDen: time.ngayDen === '' ? ngayDen.format('YYYY/MM/DD') : time.ngayDen,
                ngayDi: time.ngayDi === '' ? ngayDi.format('YYYY/MM/DD') : time.ngayDi,
                soLuongKhach: infoBooking !== null ? ((people + children) === 1 ? infoBooking.soLuongKhach : (people + children)) : (people + children),
                maNguoiDung: user?.user.id,
            }
            dispatch(bookingRoom(info));
            dispatch(setInfoBooking());
            setTimeout(() => {
                navigate('/account');
            }, 1500)
        }
    }

    useEffect(() => {
        if (isBook) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Đặt phòng thành công',
                timer: 1500,
                showConfirmButton: false
            });
            setTimeout(() => {
                dispatch(setIsBook());
            }, 1500)
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: messageError,
                timer: 1500,
                showConfirmButton: false
            });
        }
    }, [isBook, messageError, dispatch])

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
                    <Button className='px-3' onClick={() => children > 0 ? setChildren((prev) => prev - 1) : 0}>-</Button>
                    <span className='mx-2'>
                        {children}
                    </span>
                    <Button className='px-3' onClick={() => setChildren((prev) => prev + 1)}>+</Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`w-full leading-10 py-3 mb-4`}>
            <Form onFinish={onFinish} layout='vertical'>
                <div >
                    <Form.Item label={'Điểm đến'}>
                        <Select disabled size='large' className='w-full leading-4' placeholder={allLocation?.find(item => item.id === roomById?.maViTri)?.tenViTri} options={options} />
                    </Form.Item>
                    {/* <Form.Item label={'Ngày đến'} name='ngayDen' className='w-full pr-2' initialValue={infoBooking !== null ? [dayjs(`${infoBooking.ngayDen}`), dayjs(`${infoBooking.ngayDi}`)] : [dayjs(), dayjs().add(1, 'day')]}>
                        <RangePicker className='w-full h-full! px-[24px] py-[8px]' onChange={handleDate} />
                    </Form.Item> */}
                    <div className='flex items-center'>
                        <Form.Item label={'Ngày đến'} name='ngayDen' className='w-full pr-2' initialValue={infoBooking !== null ? dayjs(`${infoBooking.ngayDen}`) : dayjs()}>
                            <DatePicker onChange={handleNgayDen} className='w-full' size='large' />
                        </Form.Item>
                        <Form.Item label={'Ngày đi'} name='ngayDi' className='w-full' initialValue={infoBooking !== null ? dayjs(`${infoBooking.ngayDi}`) : dayjs().add(1, 'day')}>
                            <DatePicker onChange={handleNgayDi} className='w-full' size='large' />
                        </Form.Item>
                    </div>
                    <Form.Item label={'Số người'} className='w-1/2 pr-2'>
                        <Popover showArrow={false} placement='right' content={content} trigger="click">
                            <Button className='block w-full bg-white' size='large'>
                                {infoBooking !== null ? ((people + children) === 1 ? infoBooking.soLuongKhach : (people + children)) : (people + children)} người
                            </Button>
                        </Popover>
                    </Form.Item>
                    <Form.Item className='m-0'>
                        <Button htmlType='submit' size='large' className='w-full bg-gray' type='primary'>
                            <span className='font-semibold'>Đặt Phòng</span>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default SearchRoom