import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserLocationMapChart() {
    const [data, setData] = useState<{ value: number; name: string }[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/user/location').then((res) => {
            const data = Array.isArray(res.data) ? res.data : [];
            setData(
                data.map((item: any) => ({
                    value: item.user_count,
                    name: item.city
                }))
            );
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Phân bố người dùng theo tỉnh thành',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c} người dùng'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                fontSize: 12
            }
        },
        yAxis: {
            type: 'category',
            data: data.map((item) => item.name),
            axisLabel: {
                fontSize: 11,
                interval: 0,
                width: 80,
                overflow: 'truncate'
            }
        },
        series: [
            {
                name: 'Người dùng',
                type: 'bar',
                data: data.map((item) => item.value),
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    fontSize: 10
                },
                barWidth: '60%'
            }
        ]
    };

    return (
        <Card title='Phân bố người dùng theo tỉnh thành'>
            <ReactECharts opts={{ height: 1000, width: 'auto' }} option={option} style={{ height: '1000px' }} />
        </Card>
    );
}
