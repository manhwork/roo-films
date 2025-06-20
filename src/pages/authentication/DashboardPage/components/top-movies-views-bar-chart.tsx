import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopMoviesViewsBarChart({ onRendered }: { onRendered?: () => void } = {}) {
    const [movies, setMovies] = useState<string[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/top-content/views').then((res) => {
            setMovies(res.data.map((item: any) => item.title));
            setViews(res.data.map((item: any) => Number(item.views)));
        });
    }, []);

    const option: EChartsOption = {
        title: { text: 'Top phim được xem nhiều nhất', left: 'center' },
        xAxis: { type: 'category', data: movies },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: views, itemStyle: { color: '#eb2f96' }, barWidth: '60%' }]
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
