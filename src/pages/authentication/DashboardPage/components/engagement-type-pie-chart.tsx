import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function EngagementTypePieChart() {
    const [data, setData] = useState<any[]>([]);

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
                data: [
                    { value: 1048, name: 'Review' },
                    { value: 735, name: 'Comment' },
                    { value: 580, name: 'Like' },
                    { value: 484, name: 'Watchlist_Add' }
                ]
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch data from API
        // getEngagementTypeData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Phân loại tương tác'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
