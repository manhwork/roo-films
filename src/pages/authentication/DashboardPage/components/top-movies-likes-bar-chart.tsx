import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function TopMoviesLikesBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.topLikedMovies) return { titles: [], likes: [] };

        const titles = data.topLikedMovies.map((item: any) => item.title);
        const likes = data.topLikedMovies.map((item: any) => Number(item.likes));

        return { titles, likes };
    }, [data?.topLikedMovies]);

    const option: EChartsOption = {
        title: { text: 'Top 10 phim có lượt thích nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.titles },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.likes, itemStyle: { color: '#eb2f96' }, barWidth: '60%' }]
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
