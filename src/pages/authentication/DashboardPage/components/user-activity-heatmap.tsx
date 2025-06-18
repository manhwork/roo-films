import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function UserActivityHeatmap() {
    const [data, setData] = useState<any[]>([]);

    // Tạo dữ liệu mẫu cho heatmap
    const hours = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
    ];
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

    const heatmapData = [];
    for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < hours.length; j++) {
            // Tạo dữ liệu mẫu với giờ cao điểm (18-22h) có hoạt động cao hơn
            let value = Math.random() * 100;
            if (j >= 18 && j <= 22) {
                value = Math.random() * 200 + 100; // Cao điểm
            } else if (j >= 8 && j <= 12) {
                value = Math.random() * 150 + 50; // Trung bình
            } else {
                value = Math.random() * 50; // Thấp
            }
            heatmapData.push([j, i, Math.round(value)]);
        }
    }

    const option: EChartsOption = {
        title: {
            text: 'Hành vi người dùng theo thời gian trong ngày',
            left: 'center'
        },
        tooltip: {
            position: 'top',
            formatter: function (params: any) {
                return `${days[params.data[1]]} ${hours[params.data[0]]}<br/>Hoạt động: ${params.data[2]}`;
            }
        },
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: hours,
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

    useEffect(() => {
        // TODO: Fetch data from API
        // getUserActivityHeatmapData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Hành vi người dùng theo thời gian trong ngày'>
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
