import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

export default function BarChart() {
    const option: EChartsOption = {
        title: {
            text: '',
            subtext: ''
        },
        xAxis: {
            type: 'category',
            data: ['home.directAccess', 'home.emailMarketing', 'home.affiliateAdvertise', 'home.videoAdvertise']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {},
        series: [
            {
                type: 'bar',
                data: [
                    { value: 335, name: 'home.directAccess' },
                    { value: 310, name: 'home.emailMarketing' },
                    { value: 234, name: 'home.affiliateAdvertise' },
                    { value: 135, name: 'home.videoAdvertise' }
                ]
            }
        ]
    };
    return (
        <Card title={'home.views'}>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
