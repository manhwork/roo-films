import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AvgWatchtimeUserBarChart() {
    const [users, setUsers] = useState<string[]>([]);
    const [avgWatchTime, setAvgWatchTime] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/avg-watchtime-user').then((res) => {
            setUsers(res.data.map((item: any) => item.username));
            setAvgWatchTime(res.data.map((item: any) => Number(item.avg_minutes)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Thời gian xem trung bình của người dùng (phút)', left: 'center' },
        xAxis: { type: 'category', data: users },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: avgWatchTime, itemStyle: { color: '#faad14' }, barWidth: '60%' }]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 300, width: 'auto' }} option={option} />
        </Card>
    );
}
