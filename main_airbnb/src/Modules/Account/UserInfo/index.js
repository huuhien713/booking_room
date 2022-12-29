import { Avatar, Button, DatePicker, Divider, Form, Input, Select, Skeleton, Space, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setMessageError } from '../../../Services/Slices/authSlice';
import { getUserById, setIsUpdate, updateAvatarUser, updateUser } from '../../../Services/Slices/userSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const navigate = useNavigate();
    const { Title, Text } = Typography;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { user: idUser } = useSelector(state => state.auth);
    const { account, isUpdate, messageError, isLoading } = useSelector(state => state.user);
    const [isEdit, setIsEdit] = useState(false);
    const [avt, setAvt] = useState(false);

    // click edit thông tin user
    const handleEdit = () => {
        setIsEdit(!isEdit)
        const year = account?.birthday.slice(6);
        const month = account?.birthday.slice(3, 5);
        const date = account?.birthday.slice(0, 2)
        form.setFieldsValue({
            name: `${account?.name}`,
            email: `${account?.email}`,
            password: `${account?.password}`,
            phone: `${account?.phone}`,
            birthday: dayjs(`${year}/${month}/${date}`),
            gender: `${account?.gender}`
        });
    };
    // click để cập nhật thông tin user
    const onFinish = (values) => {
        // console.log({ ...values, birthday: values.birthday.format('DD/MM/YYYY'), id: account.id });
        dispatch(updateUser({ ...values, birthday: values.birthday.format('DD/MM/YYYY'), id: account.id }));
        setIsEdit(!isEdit)
    };

    useEffect(() => {
        dispatch(getUserById(idUser?.user?.id));
    }, []);

    // useEffect quản lý sự kiện cập nhật
    useEffect(() => {
        if (isUpdate) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Cập nhật người dùng thành công',
                timer: 1500,
                showConfirmButton: false,
            })
            dispatch(setIsUpdate());
        } else if (messageError) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: `${messageError}`,
                timer: 1500,
                showConfirmButton: false,
            })
            dispatch(setMessageError());
        }
    }, [isUpdate, messageError, dispatch]);

    const { handleSubmit, setValue } = useForm({
        defaultValues: {}, mode: 'all'
    });

    const [imgPreview, setImgPreView] = useState(null);
    //load ảnh đại diện vừa chọn ra màn hình
    const handleChange = (e) => {
        setAvt(!avt);
        const file = e.target.files[0];
        if (!file) return;
        setValue('formFile', file);
        // hiển thị ảnh 
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setImgPreView(e.target.result);
        }
        fileReader.readAsDataURL(file);
    }
    // cập nhật Avatar
    const onSubmit = (values) => {
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        dispatch(updateAvatarUser(formData));
        setAvt(!avt);
    }

    return (
        <div className='md:p-6 xs:py-4 xs:px-3'>
            {isLoading ?
                <>
                    <div className='flex items-center justify-between'>
                        <div className='w-1/4'>
                            <Skeleton.Input active block size='large' />
                        </div>
                        <Skeleton.Button active size='large' />
                    </div>
                    <Divider className='xs:!text-xs md:!text-lg' orientation='left'><Skeleton.Input active block /></Divider>
                    <div className='flex justify-between items-center bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                        <div>
                            <Skeleton avatar={{ size: 60 }} active title={{ width: 0, style: { margin: 0 } }} paragraph={{ rows: 0, style: { margin: 0 } }} />
                        </div>
                        <div className='!w-1/5'>
                            <Skeleton.Button active size='large' block />
                        </div>
                    </div>
                    <Divider className='xs:!text-xs md:!text-lg' orientation='left'><Skeleton.Input active block /></Divider>
                    <div>
                        <Space direction='vertical' className='w-full'>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                        </Space>
                    </div>
                    <div className='mt-3 w-1/6'>
                        <Skeleton.Button active block />
                    </div>
                </> :
                <>
                    <div className='flex items-center justify-between'>
                        <Title level={4} className='md:!mb-4 xs:!mb-1 xl:!text-xl md:!text-lg xs:!text-sm'>Thông tin người dùng</Title>
                        {
                            isEdit ? <></> :
                                <Button className='flex items-center' htmlType='button' onClick={handleEdit}>
                                    <EditOutlined /><span className='xs:!hidden md:!block'>Chỉnh sửa</span>
                                </Button>
                        }
                    </div>
                    <Divider className='xs:!text-xs md:!text-lg' orientation='left'>Ảnh đại diện</Divider>
                    <Space direction='horizontal' className='bg-white w-full justify-between lg:py-6 lg:px-5 xs:p-3'>
                        <div className='text-center'>
                            <Avatar src={avt ? imgPreview : account?.avatar} size={64} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {avt ?
                                <div>
                                    <Button htmlType='submit'>Cập nhật</Button>
                                </div> :
                                <label className="label">
                                    <input type="file" onChange={handleChange} />
                                    <span className='flex items-center'><EditOutlined className='md:mr-2 xs:m-0' /><span className='xs:!hidden md:!block'>Cập nhật ảnh đại diện</span></span>
                                </label>
                            }
                        </form>
                    </Space>
                    <Divider className='xs:!text-xs md:!text-lg' orientation='left'>Thông tin cá nhân</Divider>
                    <Form form={form} size='large' layout='vertical' onFinish={onFinish} autoComplete="off">
                        <Space direction='vertical' className='w-full'>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Text strong className='lg:text-lg xs:text-xs'>Họ & Tên</Text>
                                {
                                    isEdit ?
                                        <Form.Item name="name" className='mb-0' hasFeedback rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}>
                                            <Input placeholder="Username" />
                                        </Form.Item> : <Text className='lg:!text-lg xs:!text-xs'>{account?.name}</Text>
                                }
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Text strong className='lg:text-lg xs:text-xs'>Email</Text>
                                {
                                    isEdit ?
                                        <Form.Item name="email" className='mb-0' hasFeedback rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                            {
                                                pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                                message: 'Email không đúng định dạng'
                                            }
                                        ]}>
                                            <Input placeholder="Email" />
                                        </Form.Item> : <Text className='lg:!text-lg xs:!text-xs'>{account?.email}</Text>
                                }
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Text strong className='lg:text-lg xs:text-xs'>Số điện thoại</Text>
                                {
                                    isEdit ?
                                        <Form.Item name="phone" className='mb-0' hasFeedback rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone!',
                                            },
                                            {
                                                pattern: /[0-9]{10,16}/,
                                                message: 'Số điện thoại phải là số, từ 10 - 16 kí số'
                                            }
                                        ]}>
                                            <Input placeholder="Phone" />
                                        </Form.Item> : <Text className='lg:!text-lg xs:!text-xs'>{account?.phone}</Text>
                                }
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Text strong className='lg:text-lg xs:text-xs'>Giới tính</Text>
                                {
                                    isEdit ?
                                        <Form.Item name='gender' hasFeedback rules={[
                                            {
                                                required: true,
                                                message: 'Please input your gender!',
                                            },
                                        ]}>
                                            <Select placeholder="Select a option" allowClear >
                                                <Select.Option value="true">Male</Select.Option>
                                                <Select.Option value="false">Female</Select.Option>
                                            </Select>
                                        </Form.Item> : <Text className='lg:!text-lg xs:!text-xs'>{account?.gender ? 'Nam' : 'Nữ'}</Text>
                                }
                            </Space>
                            <Space direction='vertical' className='bg-white w-full lg:py-6 lg:px-5 xs:p-3'>
                                <Text strong className='lg:text-lg xs:text-xs'>Ngày sinh</Text>
                                {
                                    isEdit ?
                                        <Form.Item name="birthday" className='mb-0' hasFeedback rules={[
                                            {
                                                required: true,
                                                message: 'Please input your birthday!',
                                            },
                                        ]}>
                                            <DatePicker className='w-full' />
                                        </Form.Item> : <Text className='lg:!text-lg xs:!text-xs'>{account?.birthday}</Text>
                                }
                            </Space>
                        </Space>
                        <div className='inline-block mt-3'>
                            {isEdit
                                ? <Button htmlType='submit'><span className='lg:!text-lg xs:!text-sm'>Cập nhật</span></Button>
                                : <></>}
                        </div>
                    </Form>
                    <div className='mt-3'>
                        <Button onClick={() => navigate('/')} className='h-full bg-blue text-white hover:!text-white'><span className='lg:!text-lg xs:!text-sm'>Quay về trang chủ</span></Button>
                    </div>
                </>
            }
        </div>
    )
}

export default UserInfo