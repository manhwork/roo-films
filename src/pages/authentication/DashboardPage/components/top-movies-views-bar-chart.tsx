import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function TopMoviesViewsBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.topMovies) return { titles: [], views: [] };

        const titles = data.topMovies.map((item: any) => item.title);
        const views = data.topMovies.map((item: any) => Number(item.views));

        return { titles, views };
    }, [data?.topMovies]);

    const option: EChartsOption = {
        title: { text: 'Top 10 phim được xem nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.titles },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.views, itemStyle: { color: '#fa541c' }, barWidth: '60%' }]
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
