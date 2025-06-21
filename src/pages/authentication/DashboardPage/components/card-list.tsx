import type { ColProps } from 'antd';
import { VideoCameraOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import CountUp from 'react-countup';
import { useDashboardData } from '../DashboardPage';

const wrapperCol: ColProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8
};

export default function CardList() {
    const { data } = useDashboardData();

    const stats = {
        totalMovies: data?.summary?.totalMovies || 0,
        totalEpisodes: 0, // Không có trong summary hiện tại
        totalUsers: data?.summary?.totalUsers || 0,
        totalViews: data?.summary?.totalViews || 0
    };

    const CARD_LIST = [
        {
            title: 'Tổng phim hiện có',
            data: stats.totalMovies + stats.totalEpisodes,
            icon: <VideoCameraOutlined />
        },
        {
            title: 'Tổng tài khoản hoạt động',
            data: stats.totalUsers,
            icon: <UserOutlined />
        },
        {
            title: 'Tổng lượt xem',
            data: stats.totalViews,
            icon: <EyeOutlined />
        }
    ];

    return (
        <Row justify='space-between' gutter={[20, 20]}>
            {CARD_LIST.map((cardItem) => (
                <Col {...wrapperCol} key={cardItem.title}>
                    <Card>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col'>
                                <h3 className='text-xl'>{cardItem.title}</h3>
                                <CountUp end={cardItem.data} separator=',' />
                            </div>
                            <span className='text-3xl'>{cardItem.icon}</span>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
