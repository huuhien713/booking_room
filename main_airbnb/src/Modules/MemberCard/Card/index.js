import React from 'react'
import { GiRoundStar } from 'react-icons/gi'

const Card = ( {color, rank} ) => {
    return (
        <div className='flex items-center justify-center flex-col p-3 '>
            <div className=' relative w-[280px] h-[150px] overflow-hidden rounded-xl bg-[#5A5A5A]'>
                <div className='flex items-center p-3 text-white'>
                    <GiRoundStar /> <div className='pl-1 uppercase'><span className='font-bold'>VIP {rank}</span></div>
                </div>
                <div className={`absolute w-[197px] h-[100px] top-[45px] right-[-103px] ${color} rotate-[290deg]`}></div>
                {/* <div className='absolute w-[198px] h-[100px] top-[45px] right-[-111px] bg-gradient-to-l from-[#e7ac8c] to-[#cf7d4e] rotate-[290deg]'></div> */}
                <div className='absolute bottom-0 p-3 text-white'>
                    <span className='font-semibold'>Welcome Agoda VIP Member</span>
                </div>
            </div>
        </div>
    )
}

export default Card