import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function EngagementTimelineStackedLineChart() {
    const [data, setData] = useState<any[]>([]);

    const option: EChartsOption = {
        title: {
            text: 'Tổng số lượt like/comment theo ngày',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Like', 'Comment', 'Review'],
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
            boundaryGap: false,
            data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13', 'T14']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Like',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330, 310, 123]
            },
            {
                name: 'Comment',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122]
            },
            {
                name: 'Review',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410, 182, 191, 234, 290, 330, 310, 123]
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch data from API
        // getEngagementTimelineData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Tổng số lượt like/comment theo ngày'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
