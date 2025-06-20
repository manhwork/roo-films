import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RatingBarChart() {
    const [months, setMonths] = useState<string[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/ratings/month').then((res) => {
            setMonths(res.data.map((item: any) => `${item.month}/${item.year}`));
            setRatings(res.data.map((item: any) => Number(item.avg_rating)));
        });
    }, []);

    const option: EChartsOption = {
        title: {
            text: 'Điểm đánh giá trung bình theo tháng',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLabel: { rotate: 45 }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 10
        },
        tooltip: {},
        series: [
            {
                type: 'bar',
                data: ratings,
                itemStyle: { color: '#1890ff' },
                barWidth: '60%'
            }
        ]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 300, width: 'auto' }} option={option} />
        </Card>
    );
}
