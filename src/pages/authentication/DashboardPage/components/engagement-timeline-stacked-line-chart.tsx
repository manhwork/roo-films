import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EngagementTimelineStackedLineChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [days, setDays] = useState<string[]>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const [comments, setComments] = useState<number[]>([]);
    const [reviews, setReviews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/engagement/timeline').then((res) => {
            setDays(res.data.map((item: any) => item.date));
            setLikes(res.data.map((item: any) => Number(item.likes)));
            setComments(res.data.map((item: any) => Number(item.comments)));
            setReviews(res.data.map((item: any) => Number(item.reviews)));
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Tổng số lượt like/comment theo ngày',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Like', 'Comment', 'Review'],
            top: '10%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: days
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Like',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: likes
            },
            {
                name: 'Comment',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: comments
            },
            {
                name: 'Review',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: reviews
            }
        ]
    };

    return (
        <Card title='Tổng số lượt like/comment theo ngày'>
            <ReactECharts
                opts={{ height: 'auto', width: 'auto' }}
                option={option}
                onChartReady={() => {
                    onRendered?.();
                }}
            />
        </Card>
    );
}
