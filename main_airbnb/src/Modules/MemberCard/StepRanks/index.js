import { Steps } from 'antd'
import React from 'react'
import { GiRoundStar } from 'react-icons/gi'

const StepRanks = ( {listBookingById} ) => {
    
    const items = [
        {
            id: 1,
            title: <strong>Bronze</strong>,
            icon: <GiRoundStar className='bg-[#5A5A5A] rounded-full p-1 text-bronze' />,
            description: ''
        },
        {
            id: 2,
            title: <strong>Silver</strong>,
            icon: <GiRoundStar className='bg-[#5A5A5A] rounded-full p-1 text-silver' />,
            description: <span className='text-xs'>5 lượt đặt phòng</span>
        },
        {
            id: 3,
            title: <strong>Gold</strong>,
            icon: <GiRoundStar className='bg-[#5A5A5A] rounded-full p-1 text-gold' />,
            description: <span className='text-xs'>15 lượt đặt phòng</span>
        },
        {
            id: 4,
            title: <strong>Platinum</strong>,
            icon: <GiRoundStar className='bg-[#5A5A5A] rounded-full p-1 text-platinum' />,
            description: <span className='text-xs'>30 lượt đặt phòng</span>
        },
    ]
    return (
        <Steps
            direction="horizontal"
            size="small"
            current={
                listBookingById?.length >= 30 ? 3 :
                    listBookingById?.length >= 15 ? 2 :
                        listBookingById?.length >= 5 ? 1 :
                            listBookingById?.length < 5 ? 0 : 0}
            labelPlacement="vertical"
            items={items}
        />
    )
}

export default StepRanks