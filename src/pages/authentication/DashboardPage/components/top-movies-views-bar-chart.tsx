import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const movies = [
  "Phim 1", "Phim 2", "Phim 3", "Phim 4", "Phim 5", "Phim 6", "Phim 7", "Phim 8", "Phim 9", "Phim 10"
];
const views = [1200, 1100, 1050, 1000, 950, 900, 850, 800, 750, 700];

export default function TopMoviesViewsBarChart() {
  const option: EChartsOption = {
    title: { text: "Top phim được xem nhiều nhất", left: "center" },
    xAxis: { type: "category", data: movies },
    yAxis: { type: "value" },
    tooltip: {},
    series: [
      { type: "bar", data: views, itemStyle: { color: "#eb2f96" }, barWidth: "60%" }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 300, width: "auto" }} option={option} />
    </Card>
  );
}
