import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function PopularBrowsersBarChart() {
    const [data, setData] = useState<any[]>([]);

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
        legend: {
            data: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
            top: '10%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Windows', 'macOS', 'Linux', 'iOS', 'Android']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Chrome',
                type: 'bar',
                stack: 'total',
                data: [320, 302, 301, 334, 390]
            },
            {
                name: 'Firefox',
                type: 'bar',
                stack: 'total',
                data: [120, 132, 101, 134, 90]
            },
            {
                name: 'Safari',
                type: 'bar',
                stack: 'total',
                data: [220, 182, 191, 234, 290]
            },
            {
                name: 'Edge',
                type: 'bar',
                stack: 'total',
                data: [150, 212, 201, 154, 190]
            },
            {
                name: 'Opera',
                type: 'bar',
                stack: 'total',
                data: [50, 32, 21, 34, 90]
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch data from API
        // getPopularBrowsersData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Trình duyệt phổ biến'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
