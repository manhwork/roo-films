import type { EChartsOption } from 'echarts';
import { Card, Segmented } from 'antd';
import ReactECharts from 'echarts-for-react';

import { useEffect, useState } from 'react';

export default function PieChart() {
    const [data, setData] = useState<any[]>([]);
    const [value, setValue] = useState<string | number>('home.allChannels');

    const DATA_KEY = {
        electronics: 'home.electronics',
        home_goods: 'home.homeGoods',
        apparel_accessories: 'home.apparelAccessories',
        food_beverages: 'home.foodBeverages',
        beauty_skincare: 'home.beautySkincare'
    };

    const option: EChartsOption = {
        title: {
            text: '',
            subtext: '',
            right: '10%'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'home.salesCategoryProportion',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data
                // emphasis: {
                // 	itemStyle: {
                // 		shadowBlur: 10,
                // 		shadowOffsetX: 0,
                // 		shadowColor: "rgba(0, 0, 0, 0.5)",
                // 	},
                // },
            }
        ]
    };

    useEffect(() => {
        if (value) {
            // fetchPie({ by: value }).then(({ result }) => {
            // 	setData(
            // 		result.map((item) => {
            // 			const code = item.code as keyof typeof DATA_KEY;
            // 			return {
            // 				...item,
            // 				name: DATA_KEY[code],
            // 			};
            // 		}),
            // 	);
            // });
        }
    }, [value]);

    return (
        <Card
            title={'home.salesCategoryProportion'}
            extra={
                <Segmented
                    options={['home.allChannels', 'home.online', 'home.site']}
                    value={value}
                    onChange={(segmentedValue) => setValue(segmentedValue)}
                />
            }
        >
            <ReactECharts opts={{ height: 'auto', width: 'auto' }} option={option} />
        </Card>
    );
}
