import type { EChartsOption } from 'echarts';
import { Card, Col, Row } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { useDashboardData } from '../DashboardPage';

export default function ViewsByPeriodCharts({ onRendered }: { onRendered?: () => void } = {}) {
    const { data } = useDashboardData();

    const yearData = useMemo(() => {
        if (!data?.viewsYear) return { years: [], views: [] };

        const years = data.viewsYear.map((item: any) => item.year);
        const views = data.viewsYear.map((item: any) => Number(item.views));

        return { years, views };
    }, [data?.viewsYear]);

    const seasonData = useMemo(() => {
        if (!data?.viewsSeason) return { seasons: [], views: [] };

        const seasons = data.viewsSeason.map((item: any) => `Q${item.season} ${item.year}`);
        const views = data.viewsSeason.map((item: any) => Number(item.views));

        return { seasons, views };
    }, [data?.viewsSeason]);

    const yearOption: EChartsOption = {
        title: { text: 'Lượt xem theo năm', left: 'center' },
        xAxis: { type: 'category', data: yearData.years },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: yearData.views, itemStyle: { color: '#1890ff' }, barWidth: '60%' }]
    };

    const seasonOption: EChartsOption = {
        title: { text: 'Lượt xem theo mùa', left: 'center' },
        xAxis: { type: 'category', data: seasonData.seasons },
        yAxis: { type: 'value' },
        tooltip: {},
        series: [{ type: 'bar', data: seasonData.views, itemStyle: { color: '#52c41a' }, barWidth: '60%' }]
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={12}>
                <Card style={{ marginTop: 20 }}>
                    <ReactECharts
                        opts={{ height: 300, width: 'auto' }}
                        option={yearOption}
                        onChartReady={() => {
                            onRendered?.();
                        }}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{ marginTop: 20 }}>
                    <ReactECharts
                        opts={{ height: 300, width: 'auto' }}
                        option={seasonOption}
                        onChartReady={() => {
                            onRendered?.();
                        }}
                    />
                </Card>
            </Col>
        </Row>
    );
}
