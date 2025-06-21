import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function RatingDistributionHistogram({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.ratingStats) return { ratings: [], counts: [] };

        const ratings = data.ratingStats.map((item: any) => item.rating_bin);
        const counts = data.ratingStats.map((item: any) => Number(item.count));

        return { ratings, counts };
    }, [data?.ratingStats]);

    const option: EChartsOption = {
        title: { text: 'Phổ điểm đánh giá phim', left: 'center' },
        xAxis: { type: 'category', data: chartData.ratings },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.counts, itemStyle: { color: '#13c2c2' }, barWidth: '60%' }]
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
