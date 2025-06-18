import type { EChartsOption } from 'echarts';
import { Card, Radio } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function LineChart() {
    const [value, setValue] = useState('week');

    const [data, setData] = useState<string[]>([]);

    const DATA_KEYS = {
        week: [
            'home.monday',
            'home.thursday',
            'home.wednesday',
            'home.thursday',
            'home.friday',
            'home.saturday',
            'home.sunday'
        ]
    };

    const option: EChartsOption = {
        dataZoom: {
            type: value === 'week' ? 'inside' : 'slider'
        },
        title: {
            text: '',
            subtext: ''
        },
        xAxis: {
            type: 'category',
            // @ts-expect-error: xxx
            data: DATA_KEYS[value]
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        series: [
            {
                type: 'line',
                data
            }
        ]
    };

    useEffect(() => {
        if (value) {
            // fetchLine({ range: value }).then(({ result }) => {
            // 	setData(result);
            // });
        }
    }, [value]);

    return (
        <Card
            title={'home.sales'}
            extra={
                <Radio.Group
                    defaultValue='week'
                    buttonStyle='solid'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <Radio.Button value='week'>{'home.thisWeek'}</Radio.Button>
                    <Radio.Button value='month'>{'home.thisMonth'}</Radio.Button>
                    <Radio.Button value='year'>{'home.thisYear'}</Radio.Button>
                </Radio.Group>
            }
        >
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
