import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer
]);

export default function PolarBarChart({ saleData }) {
  const option = {
    angleAxis: {},
    radiusAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    polar: {},
    series: [{
      type: "bar",
      coordinateSystem: "polar",
      data: saleData.map(d => d.totalAmount),
      encode: {
        angle: 0,   // sales value controls bar length
        radius: 1   // category index defines placement
      },
      name: "Sales",
      colorBy: "data",
      roundCap: true,
      label: {
        show: true,
        position: "insideStart",
        formatter: "{b}"
      }
    }],
    legend: {
      show: true,
      data: ["Sales"]
    }
  };

  return <ReactEChartsCore echarts={echarts} option={option} style={{ height: 240 }} />;
}
