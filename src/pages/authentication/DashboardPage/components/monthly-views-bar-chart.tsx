import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function MonthlyViewsBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.monthlyViews) return { months: [], views: [] };

        const months = data.monthlyViews.map((item: any) => `${item.month}/${item.year}`);
        const views = data.monthlyViews.map((item: any) => Number(item.views));

        return { months, views };
    }, [data?.monthlyViews]);

    const option: EChartsOption = {
        title: { text: 'Tổng lượt xem theo tháng', left: 'center' },
        xAxis: { type: 'category', data: chartData.months },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.views, itemStyle: { color: '#1890ff' }, barWidth: '60%' }]
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
