import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PopularBrowsersBarChart() {
    const [browsers, setBrowsers] = useState<string[]>([]);
    const [counts, setCounts] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/popular-browsers').then((res) => {
            setBrowsers(res.data.map((item: any) => item.browser));
            setCounts(res.data.map((item: any) => Number(item.count)));
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Trình duyệt phổ biến',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: browsers
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Lượt truy cập',
                type: 'bar',
                data: counts,
                itemStyle: { color: '#1890ff' }
            }
        ]
    };

    return (
        <Card title='Trình duyệt phổ biến'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
