import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function AvgWatchtimeUserBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.avgWatchtime) return { users: [], watchtime: [] };

        const users = data.avgWatchtime.map((item: any) => item.username);
        const watchtime = data.avgWatchtime.map((item: any) => Number(item.avg_minutes));

        return { users, watchtime };
    }, [data?.avgWatchtime]);

    const option: EChartsOption = {
        title: { text: 'Thời gian xem trung bình của người dùng', left: 'center' },
        xAxis: { type: 'category', data: chartData.users },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.watchtime, itemStyle: { color: '#52c41a' }, barWidth: '60%' }]
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
