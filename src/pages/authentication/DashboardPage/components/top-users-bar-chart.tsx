import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopUsersBarChart() {
    const [users, setUsers] = useState<string[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/top-users').then((res) => {
            setUsers(res.data.map((item: any) => item.username));
            setViews(res.data.map((item: any) => Number(item.views)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Top 10 người dùng xem nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: users },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: views, itemStyle: { color: '#52c41a' }, barWidth: '60%' }]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 300, width: 'auto' }} option={option} />
        </Card>
    );
}
