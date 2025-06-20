import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EngagementTypePieChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/engagement/type').then((res) => {
            setData(
                res.data.map((item: any) => ({
                    value: item.count,
                    name: item.engagementtype
                }))
            );
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Phân loại tương tác',
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
                name: 'Loại tương tác',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data
            }
        ]
    };

    return (
        <Card title='Phân loại tương tác'>
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
