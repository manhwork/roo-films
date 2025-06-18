import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function DeviceDistributionPieChart() {
    const [data, setData] = useState<any[]>([]);

    const option: EChartsOption = {
        title: {
            text: 'Phân bổ thiết bị',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [
            {
                name: 'Thiết bị',
                type: 'pie',
                radius: '55%',
                center: ['60%', '50%'],
                data: [
                    { value: 335, name: 'Desktop' },
                    { value: 310, name: 'Mobile' },
                    { value: 234, name: 'Tablet' },
                    { value: 135, name: 'Smart TV' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch data from API
        // getDeviceDistributionData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Phân bổ thiết bị'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
