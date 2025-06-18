import type { EChartsOption } from 'echarts';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function UserLocationMapChart() {
    const [data, setData] = useState<any[]>([]);

    // Dữ liệu mẫu cho các tỉnh thành Việt Nam
    const locationData = [
        { name: 'Hà Nội', value: 15432 },
        { name: 'TP. Hồ Chí Minh', value: 18203 },
        { name: 'Đà Nẵng', value: 8765 },
        { name: 'Hải Phòng', value: 6543 },
        { name: 'Cần Thơ', value: 5432 },
        { name: 'An Giang', value: 4321 },
        { name: 'Bà Rịa - Vũng Tàu', value: 3987 },
        { name: 'Bắc Giang', value: 3456 },
        { name: 'Bắc Kạn', value: 2345 },
        { name: 'Bạc Liêu', value: 1234 },
        { name: 'Bắc Ninh', value: 5678 },
        { name: 'Bến Tre', value: 4567 },
        { name: 'Bình Định', value: 3456 },
        { name: 'Bình Dương', value: 7890 },
        { name: 'Bình Phước', value: 2345 },
        { name: 'Bình Thuận', value: 3456 },
        { name: 'Cà Mau', value: 2345 },
        { name: 'Cao Bằng', value: 1234 },
        { name: 'Đắk Lắk', value: 3456 },
        { name: 'Đắk Nông', value: 2345 },
        { name: 'Điện Biên', value: 1234 },
        { name: 'Đồng Nai', value: 6789 },
        { name: 'Đồng Tháp', value: 3456 },
        { name: 'Gia Lai', value: 2345 },
        { name: 'Hà Giang', value: 1234 },
        { name: 'Hà Nam', value: 2345 },
        { name: 'Hà Tĩnh', value: 2345 },
        { name: 'Hải Dương', value: 3456 },
        { name: 'Hậu Giang', value: 2345 },
        { name: 'Hòa Bình', value: 2345 },
        { name: 'Hưng Yên', value: 3456 },
        { name: 'Khánh Hòa', value: 4567 },
        { name: 'Kiên Giang', value: 3456 },
        { name: 'Kon Tum', value: 1234 },
        { name: 'Lai Châu', value: 1234 },
        { name: 'Lâm Đồng', value: 3456 },
        { name: 'Lạng Sơn', value: 2345 },
        { name: 'Lào Cai', value: 2345 },
        { name: 'Long An', value: 4567 },
        { name: 'Nam Định', value: 3456 },
        { name: 'Nghệ An', value: 4567 },
        { name: 'Ninh Bình', value: 2345 },
        { name: 'Ninh Thuận', value: 2345 },
        { name: 'Phú Thọ', value: 2345 },
        { name: 'Phú Yên', value: 2345 },
        { name: 'Quảng Bình', value: 2345 },
        { name: 'Quảng Nam', value: 3456 },
        { name: 'Quảng Ngãi', value: 2345 },
        { name: 'Quảng Ninh', value: 4567 },
        { name: 'Quảng Trị', value: 2345 },
        { name: 'Sóc Trăng', value: 2345 },
        { name: 'Sơn La', value: 2345 },
        { name: 'Tây Ninh', value: 3456 },
        { name: 'Thái Bình', value: 3456 },
        { name: 'Thái Nguyên', value: 3456 },
        { name: 'Thanh Hóa', value: 4567 },
        { name: 'Thừa Thiên Huế', value: 3456 },
        { name: 'Tiền Giang', value: 3456 },
        { name: 'Trà Vinh', value: 2345 },
        { name: 'Tuyên Quang', value: 2345 },
        { name: 'Vĩnh Long', value: 2345 },
        { name: 'Vĩnh Phúc', value: 3456 },
        { name: 'Yên Bái', value: 2345 }
    ];

    const option: EChartsOption = {
        title: {
            text: 'Phân bố người dùng theo tỉnh thành',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c} người dùng'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                fontSize: 12
            }
        },
        yAxis: {
            type: 'category',
            data: locationData.map((item) => item.name),
            axisLabel: {
                fontSize: 11,
                interval: 0,
                width: 80,
                overflow: 'truncate'
            }
        },
        series: [
            {
                name: 'Người dùng',
                type: 'bar',
                data: locationData.map((item) => ({
                    value: item.value,
                    itemStyle: {
                        color:
                            item.value > 10000
                                ? '#1890ff'
                                : item.value > 5000
                                  ? '#52c41a'
                                  : item.value > 3000
                                    ? '#faad14'
                                    : '#d9d9d9'
                    }
                })),
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    fontSize: 10
                },
                barWidth: '60%'
            }
        ]
    };

    useEffect(() => {
        // TODO: Fetch user location data from API
        // getUserLocationData().then((response) => {
        //     setData(response.data);
        // });
    }, []);

    return (
        <Card title='Phân bố người dùng theo tỉnh thành'>
            <ReactECharts opts={{ height: 1000, width: 'auto' }} option={option} style={{ height: '1000px' }} />
        </Card>
    );
}
