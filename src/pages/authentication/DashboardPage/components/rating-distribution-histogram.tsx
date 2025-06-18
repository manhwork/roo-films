import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const bins = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-10"];
const counts = [2, 5, 10, 20, 40, 60, 80, 120, 90, 30];

export default function RatingDistributionHistogram() {
  const option: EChartsOption = {
    title: { text: "Phổ điểm đánh giá", left: "center" },
    xAxis: { type: "category", data: bins },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: counts, itemStyle: { color: "#722ed1" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
