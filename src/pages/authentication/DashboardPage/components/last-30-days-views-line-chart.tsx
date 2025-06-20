import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Last30DaysViewsLineChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [days, setDays] = useState<string[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/views/day').then((res) => {
            setDays(res.data?.map((item: any) => item.date));
            setViews(res.data?.map((item: any) => Number(item.views)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Số lượt xem trong 30 ngày gần nhất', left: 'center' },
        xAxis: { type: 'category', data: days },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'line', data: views, itemStyle: { color: '#fa541c' } }]
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
