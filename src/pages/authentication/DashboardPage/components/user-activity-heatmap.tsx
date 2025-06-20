import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserActivityHeatmap({ onRendered }: { onRendered?: () => void } = {}) {
    const [heatmapData, setHeatmapData] = useState<any[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [hours, setHours] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/user/activity-heatmap').then((res) => {
            // Chuẩn hóa dữ liệu cho heatmap: [hourIndex, dayIndex, value]
            const dayNames = Array.from(new Set(res.data.map((item: any) => item.dayname)));
            const hourNums = Array.from(new Set<number>(res.data.map((item: any) => Number(item.hour)))).sort(
                (a, b) => a - b
            );
            setDays(dayNames as string[]);
            setHours(hourNums as number[]);
            setHeatmapData(
                res.data.map((item: any) => [
                    hourNums.indexOf(Number(item.hour)),
                    dayNames.indexOf(item.dayname),
                    Number(item.activity)
                ])
            );
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Hành vi người dùng theo thời gian trong ngày',
            left: 'center'
        },
        tooltip: {
            position: 'top',
            formatter: function (params: any) {
                return `${days[params.data[1]]} ${hours[params.data[0]]}:00<br/>Hoạt động: ${params.data[2]}`;
            }
        },
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: hours.map((h) => `${h}:00`),
            splitArea: {
                show: true
            },
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'category',
            data: days,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 300,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffcc',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            }
        },
        series: [
            {
                name: 'Hoạt động',
                type: 'heatmap',
                data: heatmapData,
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <Card title='Hành vi người dùng theo thời gian trong ngày'>
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
