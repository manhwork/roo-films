import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function PopularBrowsersBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.browsers) return { browsers: [], counts: [] };

        const browsers = data.browsers.map((item: any) => item.browser);
        const counts = data.browsers.map((item: any) => Number(item.count));

        return { browsers, counts };
    }, [data?.browsers]);

    const option: EChartsOption = {
        title: { text: 'Trình duyệt phổ biến', left: 'center' },
        xAxis: { type: 'category', data: chartData.browsers },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.counts, itemStyle: { color: '#722ed1' }, barWidth: '60%' }]
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
