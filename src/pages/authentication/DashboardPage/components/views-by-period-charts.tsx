import type { EChartsOption } from "echarts";
import { Card, Tabs } from "antd";
import ReactECharts from "echarts-for-react";
import { useState } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const seasons = ["Xuân", "Hạ", "Thu", "Đông"];
const years = ["2021", "2022", "2023", "2024"];
const days = Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`);

const data = {
  month: [1200, 1500, 1800, 1700, 2100, 2500, 2300, 2200, 2000, 2400, 2600, 2800],
  season: [6000, 7000, 8000, 9000],
  year: [15000, 18000, 21000, 24000],
  day: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200 + 100))
};

export default function ViewsByPeriodCharts() {
  const [tab, setTab] = useState("month");
  const options: Record<string, EChartsOption> = {
    month: {
      title: { text: "Lượt xem theo tháng", left: "center" },
      xAxis: { type: "category", data: months },
      yAxis: { type: "value" },
      series: [{ type: "line", data: data.month }]
    },
    season: {
      title: { text: "Lượt xem theo mùa", left: "center" },
      xAxis: { type: "category", data: seasons },
      yAxis: { type: "value" },
      series: [{ type: "line", data: data.season }]
    },
    year: {
      title: { text: "Lượt xem theo năm", left: "center" },
      xAxis: { type: "category", data: years },
      yAxis: { type: "value" },
      series: [{ type: "line", data: data.year }]
    },
    day: {
      title: { text: "Lượt xem theo ngày", left: "center" },
      xAxis: { type: "category", data: days },
      yAxis: { type: "value" },
      series: [{ type: "line", data: data.day }]
    }
  };
  return (
    <Card style={{ marginTop: 20 }}>
      <Tabs
        defaultActiveKey="month"
        onChange={setTab}
        items={[
          { key: "month", label: "Tháng", children: <ReactECharts option={options.month} style={{ height: 300 }} /> },
          { key: "season", label: "Mùa", children: <ReactECharts option={options.season} style={{ height: 300 }} /> },
          { key: "year", label: "Năm", children: <ReactECharts option={options.year} style={{ height: 300 }} /> },
          { key: "day", label: "Ngày", children: <ReactECharts option={options.day} style={{ height: 300 }} /> }
        ]}
      />
    </Card>
  );
}
