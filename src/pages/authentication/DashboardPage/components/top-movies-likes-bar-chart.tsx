import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopMoviesLikesBarChart() {
    const [movies, setMovies] = useState<string[]>([]);
    const [likes, setLikes] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/top-content/likes').then((res) => {
            setMovies(res.data.map((item: any) => item.title));
            setLikes(res.data.map((item: any) => Number(item.likes)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Top 10 phim có nhiều lượt thích nhất', left: 'center' },
        xAxis: { type: 'category', data: movies },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: likes, itemStyle: { color: '#f759ab' }, barWidth: '60%' }]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts opts={{ height: 300, width: 'auto' }} option={option} />
        </Card>
    );
}
