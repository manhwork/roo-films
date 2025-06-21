import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function TopUsersBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.topUsers) return { users: [], views: [] };

        const users = data.topUsers.map((item: any) => item.username);
        const views = data.topUsers.map((item: any) => Number(item.views));

        return { users, views };
    }, [data?.topUsers]);

    const option: EChartsOption = {
        title: { text: 'Top 10 người dùng xem nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.users },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.views, itemStyle: { color: '#52c41a' }, barWidth: '60%' }]
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
