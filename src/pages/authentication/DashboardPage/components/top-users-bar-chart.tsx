import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const users = [
  "user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"
];
const views = [320, 300, 290, 270, 260, 250, 240, 230, 220, 210];

export default function TopUsersBarChart() {
  const option: EChartsOption = {
    title: { text: "Top 10 người dùng xem nhiều nhất", left: "center" },
    xAxis: { type: "category", data: users },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: views, itemStyle: { color: "#52c41a" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
