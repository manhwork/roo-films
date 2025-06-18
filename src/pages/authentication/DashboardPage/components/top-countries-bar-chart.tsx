import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function TopCountriesBarChart() {
    const [data, setData] = useState<any[]>([]);

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
            data: [
                'Việt Nam',
                'Hoa Kỳ',
                'Nhật Bản',
                'Hàn Quốc',
                'Thái Lan',
                'Singapore',
                'Malaysia',
                'Indonesia',
                'Philippines',
                'Australia'
            ]
        },
        series: [
            {
                name: 'Lượt xem',
                type: 'bar',
                data: [
                    { value: 18203, itemStyle: { color: '#1890ff' } },
                    { value: 15432, itemStyle: { color: '#52c41a' } },
                    { value: 12345, itemStyle: { color: '#faad14' } },
                    { value: 9876, itemStyle: { color: '#f5222d' } },
                    { value: 8765, itemStyle: { color: '#722ed1' } },
                    { value: 7654, itemStyle: { color: '#13c2c2' } },
                    { value: 6543, itemStyle: { color: '#eb2f96' } },
                    { value: 5432, itemStyle: { color: '#fa8c16' } },
                    { value: 4321, itemStyle: { color: '#a0d911' } },
                    { value: 3210, itemStyle: { color: '#2f54eb' } }
                ],
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                }
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch data from API
        // getTopCountriesData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Top quốc gia có lượng xem cao'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
