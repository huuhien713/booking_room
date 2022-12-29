import React from 'react';
import Banner from '../Banner';
import SearchBar from '../../Modules/SearchBar';
import SliderVoucher from '../../Modules/SliderVoucher';
import SliderLocation from '../../Modules/SliderLocation'
import TabsRoom from '../../Modules/TabsRoom';
import MemberCard from '../../Modules/MemberCard';
import { Divider } from 'antd';
import { useSelector } from 'react-redux';

const MainPage = ({ children }) => {
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <Banner />
            <div className='mt-[-300px] max-w-screen-xl w-5/6 mx-auto'>
                <SearchBar />
                <Divider className='!bg-white opacity-0 my-8 xs:mt-8 xs:mb-4' />
                {
                    user ?
                        <>
                            <MemberCard />
                            <Divider className='bg-white opacity-0 my-8 xs:my-4' />
                        </> : null
                }
                <SliderVoucher />
                <Divider className='!bg-white opacity-0 my-8' />
                <SliderLocation />
                <Divider className='bg-white opacity-0 my-8 xs:my-4' />
                <TabsRoom />
                <Divider className='bg-white opacity-0 my-8 xs:my-4' />
            </div>
        </>
    )
}

export default MainPage;