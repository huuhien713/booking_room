import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, List, Popover, Typography, Avatar } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/Slices/authSlice';
import { getUserById } from '../../Services/Slices/userSlice';

const { Text, Title } = Typography;

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { account } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            dispatch(getUserById(user?.user.id));
        }
    }, [user, dispatch])

    const content = (
        <div className='w-48 !m-[-12px]'>
            <List size='medium'>
                <List.Item className='!block !p-0'>
                    <Title className='text-center bg-[#F8F7F9] p-3 !m-0 rounded-t-xl' level={5}>TÀI KHOẢN CỦA TÔI</Title>
                </List.Item>
                <List.Item className='!px-4'>
                    <Text className=' w-full p-2 cursor-pointer hover:text-blue hover:font-semibold hover:bg-[#f8f7f9]' onClick={() => { navigate('./account') }}>Hồ sơ của tôi</Text>
                </List.Item>
                <List.Item>
                    <Button className='w-full !p-0 cursor-pointer' onClick={() => { dispatch(logout()) }}>Đăng xuất</Button>
                </List.Item>
            </List>
        </div>
    );

    const menuIcon = (
        <div>
            <div>
                <Button onClick={() => { navigate('./signin') }}>Đăng Nhập</Button>
            </div>
            <div>
                <Button onClick={() => { navigate('./signup') }} className='w-full mt-2'>Đăng Ký</Button>
            </div>
        </div>
    )

    return (
        <div className='flex items-center w-full h-full'>
            <div onClick={() => { navigate('./') }} className='w-28 cursor-pointer'>
                <img className='block w-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" alt="" />
            </div>

            <div className='ml-auto flex items-center'>
                {user ?
                    <Popover placement="bottomRight" showArrow={false} content={content} trigger="click">
                        <div className='flex items-center cursor-pointer'>
                            <Avatar src={user ? account?.avatar : <UserOutlined />} size={48} />
                        </div>
                    </Popover> :
                    <>
                        <div className='flex xs:hidden'>
                            <div>
                                <Button onClick={() => { navigate('./signin') }} className='text-blue hover:bg-blue hover:text-white' type=''>Đăng Nhập</Button>
                            </div>
                            <div className='ml-4 xs:m-0'>
                                <Button onClick={() => { navigate('./signup') }} >Đăng Ký</Button>
                            </div>
                        </div>
                        <Popover placement="bottomRight" showArrow={true} content={menuIcon} trigger="click">
                            <div className='leading-4'>
                                <MenuOutlined className='p-3' />
                            </div>
                        </Popover>
                    </>
                }
            </div>
        </div>
    )
}

export default Header