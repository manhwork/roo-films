import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeviceDistributionPieChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/device/distribution').then((res) => {
            setData(
                res.data.map((item: any) => ({
                    value: item.count,
                    name: item.devicetype
                }))
            );
        });
    }, []);

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
                data,
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

    return (
        <Card title='Phân bổ thiết bị'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
