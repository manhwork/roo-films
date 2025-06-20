import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthlyViewsBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [months, setMonths] = useState<string[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/views/month').then((res) => {
            const data = Array.isArray(res.data) ? res.data : [];
            setMonths(data.map((item: any) => `${item.month}/${item.year}`));
            setViews(data.map((item: any) => Number(item.views)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Tổng lượt xem theo tháng', left: 'center' },
        xAxis: { type: 'category', data: months },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: views, itemStyle: { color: '#1890ff' }, barWidth: '60%' }]
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
