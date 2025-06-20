import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RatingDistributionHistogram() {
    const [bins, setBins] = useState<string[]>([]);
    const [counts, setCounts] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/ratings/distribution').then((res) => {
            setBins(res.data.map((item: any) => `${item.rating_bin}-${Number(item.rating_bin) + 1}`));
            setCounts(res.data.map((item: any) => Number(item.count)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Phổ điểm đánh giá', left: 'center' },
        xAxis: { type: 'category', data: bins },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: counts, itemStyle: { color: '#722ed1' }, barWidth: '60%' }]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 300, width: 'auto' }} option={option} />
        </Card>
    );
}
