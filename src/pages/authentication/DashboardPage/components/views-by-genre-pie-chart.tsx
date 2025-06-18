import type { EChartsOption } from "echarts";
import { Card } from "antd";
import ReactECharts from "echarts-for-react";

const genres = [
  "Hành động", "Tình cảm", "Hài", "Kinh dị", "Hoạt hình", "Phiêu lưu"
];
const data = [
  { value: 3200, name: "Hành động" },
  { value: 2100, name: "Tình cảm" },
  { value: 1800, name: "Hài" },
  { value: 1500, name: "Kinh dị" },
  { value: 1200, name: "Hoạt hình" },
  { value: 900, name: "Phiêu lưu" }
];

export default function ViewsByGenrePieChart() {
  const option: EChartsOption = {
    title: { text: "Lượt xem theo thể loại", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Lượt xem",
        type: "pie",
        radius: "60%",
        data,
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" }
        }
      }
    ]
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <ReactECharts opts={{ height: 350, width: "auto" }} option={option} />
    </Card>
  );
}
