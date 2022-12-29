import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const NotFound404 = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center flex-col h-[100vh] w-full p-10'>
            <div className='w-full'>
                <div className='bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[400px] bg-no-repeat bg-[center]'>
                    <Title className="text-xl text-center">404</Title>
                </div>
                <div className='text-center'>
                    <Title className="">Look like you're lost</Title>
                    <Paragraph>the page you are looking for not avaible!</Paragraph>
                    <Button onClick={() => navigate('/')} size='large'>Go back Home</Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound404