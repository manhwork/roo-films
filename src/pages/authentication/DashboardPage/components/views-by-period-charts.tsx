import type { EChartsOption } from 'echarts';
import { Card, Tabs } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewsByPeriodCharts({ onRendered }: { onRendered?: () => void } = {}) {
    const [monthData, setMonthData] = useState<any[]>([]);
    const [seasonData, setSeasonData] = useState<any[]>([]);
    const [yearData, setYearData] = useState<any[]>([]);
    const [dayData, setDayData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/dw/views/month').then((res) => setMonthData(res.data));
        axios.get('http://localhost:3000/dw/views/year').then((res) => setYearData(res.data));
        axios.get('http://localhost:3000/dw/views/season').then((res) => setSeasonData(res.data));
        axios.get('http://localhost:3000/dw/views/day').then((res) => setDayData(res.data));
    }, []);

    const options: Record<string, EChartsOption> = {
        month: {
            title: { text: 'Lượt xem theo tháng', left: 'center' },
            xAxis: { type: 'category', data: monthData.map((d: any) => `${d.month}/${d.year}`) },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: monthData.map((d: any) => Number(d.views)) }]
        },
        season: {
            title: { text: 'Lượt xem theo mùa', left: 'center' },
            xAxis: { type: 'category', data: seasonData.map((d: any) => `Q${d.season}/${d.year}`) },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: seasonData.map((d: any) => Number(d.views)) }]
        },
        year: {
            title: { text: 'Lượt xem theo năm', left: 'center' },
            xAxis: { type: 'category', data: yearData.map((d: any) => `${d.year}`) },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: yearData.map((d: any) => Number(d.views)) }]
        },
        day: {
            title: { text: 'Lượt xem theo ngày', left: 'center' },
            xAxis: { type: 'category', data: dayData.map((d: any) => d.date) },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: dayData.map((d: any) => Number(d.views)) }]
        }
    };

    return (
        <Card style={{ marginTop: 20 }}>
            <Tabs
                defaultActiveKey='month'
                items={[
                    {
                        key: 'month',
                        label: 'Tháng',
                        children: <ReactECharts option={options.month} style={{ height: 300 }} />
                    },
                    {
                        key: 'season',
                        label: 'Mùa',
                        children: <ReactECharts option={options.season} style={{ height: 300 }} />
                    },
                    {
                        key: 'year',
                        label: 'Năm',
                        children: <ReactECharts option={options.year} style={{ height: 300 }} />
                    },
                    {
                        key: 'day',
                        label: 'Ngày',
                        children: <ReactECharts option={options.day} style={{ height: 300 }} />
                    }
                ]}
            />
        </Card>
    );
}
