import { Tabs, Typography } from 'antd'
import { UserOutlined, CarryOutOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import HistoryBooking from './HistoryBooking';
import UserInfo from './UserInfo';
import VipMember from './VipMember';
import { GiRoundStar } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getListBookingById } from '../../Services/Slices/bookingSlice';

const { Title } = Typography;
const Account = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { listBookingById } = useSelector(state => state.booking);

    useEffect(() => {
        dispatch(getListBookingById(user?.user?.id))
    }, [])

    const items = [
        {
            key: 1,
            label: <Title level={5} type='primary' className='flex items-center !mb-0 !text-blue xs:!text-xs lg:!text-lg'>
                <UserOutlined /><span className='xs:hidden lg:block'>Hồ sơ của tôi</span>
            </Title>,
            style: {padding: 0},
            children: UserInfo()
        },
        {
            key: 2,
            label: <Title level={5} type='primary' className='flex items-center !mb-0 !text-blue xs:!text-xs lg:!text-lg'>
                <CarryOutOutlined /><span className='xs:hidden lg:block'>Lịch sử giao dịch</span>
            </Title>,
            style: {padding: 0},
            children: HistoryBooking({listBookingById})
        },
        {
            key: 3,
            label: <Title level={5} type='primary' className='flex items-center !mb-0 !text-blue xs:!text-xs lg:!text-lg'>
                <GiRoundStar className='mr-2' /><span className='xs:hidden lg:block'>Agoda VIP</span>
            </Title>,
            style: {padding: 0},
            children: VipMember({listBookingById})
        },
    ];

    return (
        <div className='w-4/5 xs:w-full mx-auto min-h-[70vh] overflow-hidden'>
            <Tabs
                size='small'
                items={items}
                defaultActiveKey="1"
                tabBarGutter={20}
                tabBarStyle={{
                    padding: '20px 0',
                }}
                tabPosition='left'
            />
        </div>
    )
}

export default Account