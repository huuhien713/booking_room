import { Avatar, Divider, Form, Input, Skeleton } from 'antd'
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sendComment, setIsComment } from '../../../Services/Slices/commentSlice';

const SendComment = () => {
    const { account } = useSelector(state => state.user);
    const { isComment } = useSelector(state => state.comment);
    const { isLoading } = useSelector(state => state.room);

    const dispatch = useDispatch();
    const { idRoom } = useParams();
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const modelComment = {
            maPhong: `${idRoom}`,
            maNguoiBinhLuan: `${account.id}`,
            ngayBinhLuan: dayjs().format('DD/MM/YYYY'),
            noiDung: `${values.comment}`,
            saoBinhLuan: 5
        }
        dispatch(sendComment(modelComment));
        onReset();
    };

    useEffect(() => {
        if (isComment) {
            Swal.fire({
                position: 'center',
                timer: 1500,
                icon: 'success',
                text: 'Thêm bình luận thành công',
                showConfirmButton: false,
            });
            dispatch(setIsComment());
        }
    }, [isComment, dispatch]);

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name='comment'>
                {isLoading ?
                    <div className='flex justify-start items-center w-full px-2'>
                        <Skeleton.Avatar active block size={40} />
                        <Skeleton.Input active block className='ml-1' />
                    </div> :
                    <div className='flex w-full px-2'>
                        <Avatar className='mr-3' src={`${account?.avatar}`} />
                        <Input placeholder='Viết bình luận ...' />
                    </div>
                }
            </Form.Item>
        </Form>
    )
}

export default SendComment;

