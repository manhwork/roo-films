import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopMoviesRatingBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [movies, setMovies] = useState<string[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/top-content/rating').then((res) => {
            setMovies(res.data.map((item: any) => item.title));
            setRatings(res.data.map((item: any) => Number(item.rating)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Top phim có điểm đánh giá cao nhất', left: 'center' },
        xAxis: { type: 'category', data: movies },
        yAxis: { type: 'value', min: 0, max: 10 },
        tooltip: {},
        series: [{ type: 'bar', data: ratings, itemStyle: { color: '#13c2c2' }, barWidth: '60%' }]
    };
    return (
        <Card style={{ marginTop: 20 }}>
            <ReactECharts
                opts={{ height: 300, width: 'auto' }}
                option={option}
                onChartReady={() => {
                    onRendered?.();
                }}
            />
        </Card>
    );
}
