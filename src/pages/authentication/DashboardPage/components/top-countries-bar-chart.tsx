import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopCountriesBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [countries, setCountries] = useState<string[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/top-countries').then((res) => {
            setCountries(res.data.map((item: any) => item.country));
            setViews(res.data.map((item: any) => Number(item.views)));
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Top quốc gia có lượng xem cao',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c} lượt xem'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: countries
        },
        series: [
            {
                name: 'Lượt xem',
                type: 'bar',
                data: views,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                }
            }
        ]
    };

    return (
        <Card title='Top quốc gia có lượng xem cao'>
            <ReactECharts
                opts={{ height: 'auto', width: 'auto' }}
                option={option}
                onChartReady={() => {
                    onRendered?.();
                }}
            />
        </Card>
    );
}
