import { DollarOutlined, ShoppingCartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, ColProps, Progress, Row, Statistic, Table, Tabs, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { Summary } from '../../../models/Summary';
import { TourBooking } from '../../../models/TourBooking';
import { getSummary } from '../../../services/DashBoard/getSummary';
import { getTourBookings } from '../../../services/TourBooking/getTourBookings';
import CardList from './components/card-list';
import MonthlyViewsBarChart from './components/monthly-views-bar-chart';
import Last30DaysViewsLineChart from './components/last-30-days-views-line-chart';
import TopUsersBarChart from './components/top-users-bar-chart';
import AvgWatchtimeUserBarChart from './components/avg-watchtime-user-bar-chart';
import TopMoviesViewsBarChart from './components/top-movies-views-bar-chart';
import TopMoviesRatingBarChart from './components/top-movies-rating-bar-chart';
import ViewsByGenrePieChart from './components/views-by-genre-pie-chart';
import TopMoviesLikesBarChart from './components/top-movies-likes-bar-chart';
import ViewsByPeriodCharts from './components/views-by-period-charts';
import RatingBarChart from './components/rating-bar-chart';
import RatingDistributionHistogram from './components/rating-distribution-histogram';
import EngagementTypePieChart from './components/engagement-type-pie-chart';
import DeviceDistributionPieChart from './components/device-distribution-pie-chart';
import PopularBrowsersBarChart from './components/popular-browsers-bar-chart';
import EngagementTimelineStackedLineChart from './components/engagement-timeline-stacked-line-chart';
import UserActivityHeatmap from './components/user-activity-heatmap';
import TopCountriesBarChart from './components/top-countries-bar-chart';
import UserLocationMapChart from './components/user-location-map-chart';

const wrapperCol: ColProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12
};

export const DashboardPage = () => {
    return (
        <>
            <CardList />
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <MonthlyViewsBarChart />
                </Col>
                <Col {...wrapperCol}>
                    <Last30DaysViewsLineChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <TopUsersBarChart />
                </Col>
                <Col {...wrapperCol}>
                    <AvgWatchtimeUserBarChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <TopMoviesViewsBarChart />
                </Col>
                <Col {...wrapperCol}>
                    <TopMoviesRatingBarChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <ViewsByGenrePieChart />
                </Col>
                <Col {...wrapperCol}>
                    <TopMoviesLikesBarChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <ViewsByPeriodCharts />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <RatingBarChart />
                </Col>
                <Col {...wrapperCol}>
                    <RatingDistributionHistogram />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col {...wrapperCol}>
                    <EngagementTypePieChart />
                </Col>
                <Col {...wrapperCol}>
                    <DeviceDistributionPieChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <PopularBrowsersBarChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <EngagementTimelineStackedLineChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <UserActivityHeatmap />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <TopCountriesBarChart />
                </Col>
            </Row>
            <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                <Col span={24}>
                    <UserLocationMapChart />
                </Col>
            </Row>
        </>
    );
};
