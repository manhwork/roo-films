import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function TopMoviesRatingBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.topRatedMovies) return { titles: [], ratings: [] };

        const titles = data.topRatedMovies.map((item: any) => item.title);
        const ratings = data.topRatedMovies.map((item: any) => Number(item.rating));

        return { titles, ratings };
    }, [data?.topRatedMovies]);

    const option: EChartsOption = {
        title: { text: 'Top 10 phim có điểm đánh giá cao nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.titles },
        yAxis: { type: 'value' },
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
