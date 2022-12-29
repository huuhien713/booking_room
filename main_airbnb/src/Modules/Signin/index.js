import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Divider, Form, Input, Popover, Space, Typography } from 'antd';
import { FacebookOutlined, AppleOutlined, GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { setMessageError, signin } from '../../Services/Slices/authSlice';
import Swal from 'sweetalert2';

const { Title, Paragraph, Text } = Typography;

const Signin = () => {
    const dispatch = useDispatch();
    const { user, messageError } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        dispatch(signin(values))
    };

    const onFill = () => {
        form.setFieldsValue({
            email: 'huuhiennguyen713@mail.com',
            password: 'Huuhien713@',
        });
    };

    useEffect(() => {
        if (user) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng nhập thành công',
                timer: 1500,
                showConfirmButton: false,
            })
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
    }, [user, messageError, dispatch, navigate])

    const [searchParams, setSearchParams] = useSearchParams();
    const content = (<div>
        chức năng đang đuợc phát triển
    </div>)
    if (user) {
        setTimeout(() => {
            navigate(searchParams.get('redirect') !== null ? `${searchParams.get('redirect')}` : '/');
        }, 1500)
    }

    return (
        <div className='bg-[#f9f9f9]'>
            <div className='sm:w-[500px] xs:w-[300px] mx-auto pt-10 pb-20'>
                <div className='bg-white shadow-3xl pt-4 px-6 pb-6'>
                    <Title className='xs:text-center'>Đăng Nhập</Title>
                    <Paragraph strong>Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin</Paragraph>
                    <Form size='large' layout='vertical' form={form} onFinish={onFinish}>
                        <Form.Item label="Email" name="email" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            // {
                            //     pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                            //     message: 'Email không đúng định dạng'
                            // }
                        ]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" className='mb-0' hasFeedback rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            // {
                            //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            //     message: 'Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
                            // }
                        ]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item className='text-left mt-6 mb-2'>
                            <Button htmlType='submit' className='text-white bg-blue w-full hover:!text-white'>Submit</Button>
                        </Form.Item>
                        <div className='flex justify-between'>
                            <Button type="link" htmlType="button" onClick={onFill}>Fill form</Button>
                            <Button type="link" onClick={() => { navigate('/signup') }}>Tạo tài khoản</Button>
                        </div>
                    </Form>
                    <Divider><Text type='secondary'>hoặc đăng nhập bằng</Text></Divider>
                    <Space direction='vertical' size={'large'} className='w-full'>
                        <div>
                            <Popover content={content} trigger="click">
                                <Button type='primary' ghost size='large'
                                    icon={<GoogleOutlined />}
                                    className='flex items-center justify-center w-full'>
                                    <Text className='text-base font-semibold'>Google</Text>
                                </Button>
                            </Popover>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <Popover content={content} trigger="click">
                                <Button type='primary' ghost size='large'
                                    icon={<FacebookOutlined />}
                                    className='flex items-center justify-center w-full'>
                                    <Text className='text-base font-semibold'>Facebook</Text>
                                </Button>
                            </Popover>
                            <Popover content={content} trigger="click">
                                <Button type='primary' ghost size='large'
                                    icon={<AppleOutlined />}
                                    className='flex items-center justify-center w-full'>
                                    <Text className='text-base font-semibold'>Apple</Text>
                                </Button>
                            </Popover>
                        </div>
                        <Paragraph className='text-center text-base' type='secondary'>
                            Khi đăng nhập, tôi đồng ý với các
                            <Link> Điều khoản sử dụng </Link>và
                            <Link> Chính sách bảo mật </Link>của Agoda.
                        </Paragraph>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default Signin