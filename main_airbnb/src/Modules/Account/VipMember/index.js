import { Divider, Skeleton, Space, Table, Typography } from 'antd'
import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import StepRanks from '../../MemberCard/StepRanks';

const { Title, Text, Paragraph } = Typography;
const VipMember = ({ listBookingById }) => {
    const { isLoading } = useSelector(state => state.user);

    const columns = [
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ưu đãi', dataIndex: 'null', key: 1 },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'VIP Bronze', dataIndex: 'bronze', key: 2 },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'VIP Silver', dataIndex: 'silver', key: 3 },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'VIP Gold', dataIndex: 'gold', key: 4 },
        { title: isLoading ? <Skeleton active title={{ width: 80, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'VIP Platinum', dataIndex: 'platinum', key: 5 },
    ];

    const data = [
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Đảm Bảo Giá Tốt Nhất', bronze: <AiOutlineCheck />, silver: <AiOutlineCheck />, gold: <AiOutlineCheck />, platinum: <AiOutlineCheck />, key: 1 },
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ưu đãi nội bộ', bronze: <AiOutlineCheck />, silver: <AiOutlineCheck />, gold: <AiOutlineCheck />, platinum: <AiOutlineCheck />, key: 2, columnWidth: 50 },
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ưu đãi VIP giảm giá tới 12%', bronze: <AiOutlineClose />, silver: <AiOutlineCheck />, gold: <AiOutlineCheck />, platinum: <AiOutlineCheck />, key: 3, columnWidth: 50 },
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ưu đãi VIP giảm giá tới 18%', bronze: <AiOutlineClose />, silver: <AiOutlineClose />, gold: <AiOutlineCheck />, platinum: <AiOutlineCheck />, key: 4 },
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Ưu đãi VIP giảm giá tới 25%', bronze: <AiOutlineClose />, silver: <AiOutlineClose />, gold: <AiOutlineClose />, platinum: <AiOutlineCheck />, key: 5 },
        { null: isLoading ? <Skeleton active title={{ width: 180, style: { margin: '0' } }} paragraph={{ rows: 0, style: { margin: 0 } }} /> : 'Bữa sáng miễn phí và các đặc quyền khác tại các chỗ nghỉ được chọn!', bronze: <AiOutlineClose />, silver: <AiOutlineClose />, gold: <AiOutlineClose />, platinum: <AiOutlineCheck />, key: 6 },
    ];

    return (
        <div className="p-6">
            {isLoading ?
                <>
                    <div className='w-1/4 md:!mb-4 xs:!mb-1'>
                        <Skeleton.Input active block size='large' />
                    </div>
                    <Space direction="vertical" className="w-full rounded-lg lg:p-10 xs:p-2 mb-6 bg-white">
                        <div className='sm:flex items-center lg:my-6 xs:block xs:m-0'>
                            <div className='text-center w-1/2 mx-auto xs:w-full'>
                                <Skeleton paragraph={{ rows: 1 }} />
                            </div>
                            <div className='text-center w-1/2 mx-auto xs:w-full'>
                                <Skeleton paragraph={{ rows: 1 }} />
                            </div>
                        </div>
                        <Divider className='xs:my-3' orientation='left'></Divider>
                        <div>
                            <div className='w-1/4 mx-auto md:!mb-4 xs:!mb-1'>
                                <Skeleton.Input active block size='large' />
                            </div>
                            <div>
                                <Skeleton.Input active block className='!h-20' />
                            </div>
                        </div>
                    </Space>
                </> :
                <>
                    <Title className="md:!mb-4 xs:!mb-1 xl:!text-xl md:!text-lg xs:!text-sm">Agoda VIP</Title>
                    <Space direction="vertical" className="w-full rounded-lg lg:p-10 xs:p-2 mb-6 bg-white">
                        <div className='sm:flex items-center lg:my-6 xs:block xs:m-0'>
                            <div className='text-center w-1/2 xs:w-full'>
                                <Text className='lg:text-lg xs:text-xs'>Hạng của quý khách là AgodaVIP</Text><br />
                                <strong className='lg:text-xl xs:text-sm'>AgodaVip {listBookingById?.length >= 30 ? 'Platinum' :
                                    listBookingById?.length >= 15 ? 'Gold' :
                                        listBookingById?.length >= 5 ? 'Silver' :
                                            listBookingById?.length < 5 ? 'Bronze' : 'Bronze'}
                                </strong>
                            </div>
                            <div className='text-center w-1/2 xs:w-full'>
                                <Text className='lg:text-lg xs:text-xs'>Lượt đặt phòng</Text><br />
                                <Text className='lg:text-xl xs:text-sm'>
                                    đã hoàn thành <strong>{listBookingById.length} lượt </strong>
                                </Text>
                            </div>
                        </div>
                        <Divider className='xs:my-3' orientation='left'></Divider>
                        <div>
                            <Title level={4} className='!mb-8 xl:!mb-12 xs:text-center xs:!text-sm lg:!text-lg'>Tiến độ đặt phòng hướng tới AgodaVIP</Title>
                            <div className='xs:px-4'>
                                <StepRanks listBookingById={listBookingById} />
                            </div>
                        </div>
                    </Space>
                </>
            }
            <Space direction="vertical" className="w-full rounded-lg lg:p-10 xs:p-2 mb-6 bg-white">
                <div className='xl:max-w-[1200px] max-w-[600px] mx-auto text-center'>
                    {isLoading ?
                        <>
                            <div className='w-1/4 mx-auto'>
                                <Skeleton.Input active block size='large' />
                            </div>
                            <div>
                                <Skeleton title={{ width: 0, style: { margin: 0, height: 0 } }} paragraph={{ rows: 3 }} />
                            </div>
                        </> :
                        <>
                            <Title className='xs:!text-sm lg:!text-xl'>AgodaVIP có những lợi ích gì?</Title>
                            <Paragraph className='xs:text-xs lg:text-lg'>Quý khách được tiếp cận với các ưu đãi riêng, được làm nổi bật bởi mác { }. Mỗi khi quý khách đặt một trong những ưu đãi này, quý khách sẽ có được một mức giá rẻ đặc biệt mà những người khác không có. Và chúng tôi cũng sẽ sớm thêm ưu đãi VIP cho các chuyến bay!</Paragraph>
                        </>
                    }
                    <Table
                        bordered
                        size='small'
                        columns={columns}
                        dataSource={data}
                        scroll={{
                            x: 800
                        }}
                    />
                    {isLoading ?
                        <div>
                            <Skeleton title={{ width: 0, style: { margin: 0, height: 0 } }} paragraph={{ rows: 3 }} />
                        </div> :
                        <Paragraph className='xs:text-xs lg:text-lg'>Hãy đăng nhập và hoàn thành 2 lượt đặt phòng trong 2 năm qua để mở khóa Silver, 5 lượt đặt phòng để mở khóa Gold, và 10 lượt đặt phòng để mở khóa Platinum. Hạng của quý khách tự động gia hạn sau 6 tháng nếu quý khách đặt phòng theo yêu cầu trong thời gian đó.</Paragraph>
                    }
                </div>
            </Space>
        </div>
    )
}

export default VipMember