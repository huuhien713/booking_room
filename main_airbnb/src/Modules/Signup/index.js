import { Button, DatePicker, Form, Input, Select, Typography } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSignUp, setMessageError, signup } from '../../Services/Slices/authSlice';

import Swal from 'sweetalert2';
const { Title } = Typography;
const { Option } = Select;

const Signup = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { isSignup, messageError } = useSelector(state => state.auth)
    const onFinish = (values) => {
        // console.log('Success:', {...values, birthday : values.birthday.format('DD/MM/YYYY')});
        dispatch(signup({ ...values, birthday: values.birthday.format('DD/MM/YYYY') }))
    };

    useEffect(() => {
        if (isSignup) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký tài khoản thành công',
                timer: 1500,
                showConfirmButton: false,
            })
            dispatch(setSignUp());
            setTimeout(() => {
                navigate('/signin');
            }, 1500)
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${messageError}`,
                timer: 1500,
                showConfirmButton: false,
            })
            dispatch(setMessageError());
        }
    }, [isSignup, messageError, dispatch, navigate])

    return (
        <div className='bg-[#f9f9f9]'>
            <div className='sm:w-[500px] xs:w-[300px] mx-auto pt-10 pb-20'>
                <div className='bg-white shadow-3xl pt-4 px-6 pb-6'>
                    <Title className='xs:text-center'>Đăng ký</Title>
                    <Form size='large' layout='vertical' onFinish={onFinish} autoComplete="off">
                        <Form.Item label="Name" name="name" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item label="Email" name="email" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                message: 'Email không đúng định dạng'
                            }
                        ]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
                            }
                        ]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item label="Phone" name="phone" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                            {
                                pattern: /[0-9]{10,16}/,
                                message: 'Số điện thoại phải là số, từ 10 - 16 kí số'
                            }
                        ]}>
                            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
                        </Form.Item>

                        <Form.Item label="Birthday" name="birthday" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your birthday!',
                            },
                        ]}>
                            <DatePicker className='w-full' />
                        </Form.Item>

                        <Form.Item label="Gender" name='gender' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your gender!',
                            },
                        ]}>
                            <Select placeholder="Select a option" allowClear >
                                <Option value="true">Male</Option>
                                <Option value="false">Female</Option>
                            </Select>
                        </Form.Item>

                        {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                        <Form.Item>
                            <Button htmlType='submit' className='text-white bg-blue w-full hover:!text-white'>Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default Signup