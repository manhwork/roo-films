import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function TopCountriesBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const chartData = useMemo(() => {
        if (!data?.topCountries) return { countries: [], views: [] };

        const countries = data.topCountries.map((item: any) => item.country);
        const views = data.topCountries.map((item: any) => Number(item.views));

        return { countries, views };
    }, [data?.topCountries]);

    const option: EChartsOption = {
        title: { text: 'Top quốc gia có lượt xem nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: chartData.countries },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: chartData.views, itemStyle: { color: '#13c2c2' }, barWidth: '60%' }]
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
