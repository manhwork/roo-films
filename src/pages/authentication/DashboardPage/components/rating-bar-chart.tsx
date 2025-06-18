import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const months = [
  "Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023", "May 2023", "Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Dec 2023",
  "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024"
];

const ratings = [
  8.1, 8.2, 8.0, 8.3, 8.4, 8.2, 8.5, 8.3, 8.1, 8.4, 8.2, 8.3,
  8.5, 8.6, 8.4, 8.7, 8.8
];

export default function RatingBarChart() {
  const option: EChartsOption = {
    title: {
      text: "Điểm đánh giá trung bình theo tháng",
      left: "center"
    },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 10
    },
    tooltip: {},
    series: [
      {
        type: "bar",
        data: ratings,
        itemStyle: { color: "#1890ff" },
        barWidth: "60%"
      }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
