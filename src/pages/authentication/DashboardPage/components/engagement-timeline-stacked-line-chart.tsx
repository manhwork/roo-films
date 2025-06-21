import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function EngagementTimelineStackedLineChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.timeline) return { dates: [], likes: [], comments: [], reviews: [] };

        const dates = data.timeline.map((item: any) => item.date);
        const likes = data.timeline.map((item: any) => Number(item.likes));
        const comments = data.timeline.map((item: any) => Number(item.comments));
        const reviews = data.timeline.map((item: any) => Number(item.reviews));

        return { dates, likes, comments, reviews };
    }, [data?.timeline]);

    const option: EChartsOption = {
        title: { text: 'Timeline tương tác người dùng', left: 'center' },
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
            data: ['Likes', 'Comments', 'Reviews']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData.dates
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Likes',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.likes
            },
            {
                name: 'Comments',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.comments
            },
            {
                name: 'Reviews',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: chartData.reviews
            }
        ]
    };

    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts
                opts={{ height: 300, width: 'auto' }}
                option={option}
                onChartReady={() => {
                    onRendered?.();
                }}
            />
        </Card>
    );
}
