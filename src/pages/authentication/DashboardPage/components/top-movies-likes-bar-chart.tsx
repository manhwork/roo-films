import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const movies = [
  "Phim 1", "Phim 2", "Phim 3", "Phim 4", "Phim 5", "Phim 6", "Phim 7", "Phim 8", "Phim 9", "Phim 10"
];
const likes = [900, 850, 800, 780, 760, 740, 720, 700, 680, 660];

export default function TopMoviesLikesBarChart() {
  const option: EChartsOption = {
    title: { text: "Top 10 phim có nhiều lượt thích nhất", left: "center" },
    xAxis: { type: "category", data: movies },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: likes, itemStyle: { color: "#f759ab" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
