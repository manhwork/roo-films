import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewsByGenrePieChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/views/genre').then((res) => {
            setData(
                res.data.map((item: any) => ({
                    value: item.views,
                    name: item.genrename
                }))
            );
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Lượt xem theo thể loại', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
            {
                name: 'Lượt xem',
                type: 'pie',
                radius: '60%',
                data,
                emphasis: {
                    itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                }
            }
        ]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 350, width: 'auto' }} option={option} />
        </Card>
    );
}
