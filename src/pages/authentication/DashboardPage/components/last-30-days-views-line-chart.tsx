import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function Last30DaysViewsLineChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.last30DaysViews) return { dates: [], views: [] };

        const dates = data.last30DaysViews.map((item: any) => item.date);
        const views = data.last30DaysViews.map((item: any) => Number(item.views));

        return { dates, views };
    }, [data?.last30DaysViews]);

    const option: EChartsOption = {
        title: { text: 'Lượt xem 30 ngày gần nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.dates },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'line', data: chartData.views, itemStyle: { color: '#722ed1' } }]
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
