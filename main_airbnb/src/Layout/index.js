import React from 'react'
import MyHeader from './Header';
import MyFooter from './Footer'
import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';

const { Header, Footer, Content} = Layout;

const LayoutMain = () => {
    return (
        <Layout>
            <Header className='xs:!px-4 xl:!px-12' style={{backgroundColor: '#fff'}}>
                <MyHeader />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer className='xs:!px-4 xl:!px-12' style={{backgroundColor: '#2A2A2E'}}>
                <MyFooter />
            </Footer>
        </Layout>
    )
}

export default LayoutMain