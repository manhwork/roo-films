import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const users = [
  "user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"
];
const avgWatchTime = [120, 110, 105, 100, 98, 95, 90, 88, 85, 80]; // phút

export default function AvgWatchtimeUserBarChart() {
  const option: EChartsOption = {
    title: { text: "Thời gian xem trung bình của người dùng (phút)", left: "center" },
    xAxis: { type: "category", data: users },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: avgWatchTime, itemStyle: { color: "#faad14" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
