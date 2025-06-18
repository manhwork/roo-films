import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const days = Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`);
const views = Array.from({ length: 30 }, () => Math.floor(Math.random() * 200 + 100));

export default function Last30DaysViewsLineChart() {
  const option: EChartsOption = {
    title: { text: "Số lượt xem trong 30 ngày gần nhất", left: "center" },
    xAxis: { type: "category", data: days },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "line", data: views, itemStyle: { color: "#fa541c" } }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
