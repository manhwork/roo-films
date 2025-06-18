import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const movies = [
  "Phim A", "Phim B", "Phim C", "Phim D", "Phim E", "Phim F", "Phim G", "Phim H", "Phim I", "Phim J"
];
const ratings = [9.8, 9.7, 9.6, 9.5, 9.4, 9.3, 9.2, 9.1, 9.0, 8.9];

export default function TopMoviesRatingBarChart() {
  const option: EChartsOption = {
    title: { text: "Top phim có điểm đánh giá cao nhất", left: "center" },
    xAxis: { type: "category", data: movies },
    yAxis: { type: "value", min: 0, max: 10 },
    tooltip: {},
    series: [
      { type: "bar", data: ratings, itemStyle: { color: "#13c2c2" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
