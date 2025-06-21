import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function RatingBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.ratingMonth) return { months: [], ratings: [] };

        const months = data.ratingMonth.map((item: any) => `${item.month}/${item.year}`);
        const ratings = data.ratingMonth.map((item: any) => Number(item.avg_rating));

        return { months, ratings };
    }, [data?.ratingMonth]);

    const option: EChartsOption = {
        title: { text: 'Điểm đánh giá trung bình theo tháng', left: 'center' },
        xAxis: { type: 'category', data: chartData.months },
        yAxis: { type: 'value', min: 0, max: 10 },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.ratings, itemStyle: { color: '#faad14' }, barWidth: '60%' }]
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
