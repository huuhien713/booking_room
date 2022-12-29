import React from 'react'
import { Typography } from 'antd';

const { Paragraph  } = Typography;

const styleIcon = {
    display: 'inline-block',
    width: '144px',
    height: '48px',
    backgroundRepeat: 'no-repeat'
}

const Footer = () => {
    return (
        <div className='text-center'>
            <Paragraph className='text-white xs:text-xs'>
                Mọi nội dung tại đây © 2005 – 2022 Công ty TNHH Tư nhân Agoda. Bảo Lưu Mọi Quyền.
            </Paragraph>
            <Paragraph className='text-white xs:text-xs'>
                Agoda.com là thành viên của Tập đoàn Booking Holdings, nhà cung cấp dịch vụ du lịch trực tuyến & các dịch vụ có liên quan hàng đầu thế giới.
            </Paragraph>
            <div className='mt-10 mb-12 xs:my-5 xs:flex justify-center flex-wrap'>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[0_-90px] `}></div>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[-144px_-148px] `}></div>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[0_-148px] `}></div>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[-288px_-148px] `}></div>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[-144px_-90px] `}></div>
                <div style={styleIcon} className={`bg-[url(https://cdn6.agoda.net/images/sprite/bg-sprite-partner_v3.png)] bg-[-288px_-90px] `}></div>
            </div>
            <small className="text-white">hk-pc-2g-acm-web-user-587f4f4557-fmb8h</small>
        </div>
    )
}

export default Footer