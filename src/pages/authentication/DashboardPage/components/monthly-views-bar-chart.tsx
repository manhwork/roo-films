import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const views = [1200, 1500, 1800, 1700, 2100, 2500, 2300, 2200, 2000, 2400, 2600, 2800];

export default function MonthlyViewsBarChart() {
  const option: EChartsOption = {
    title: { text: "Tổng lượt xem theo tháng", left: "center" },
    xAxis: { type: "category", data: months },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: views, itemStyle: { color: "#1890ff" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
