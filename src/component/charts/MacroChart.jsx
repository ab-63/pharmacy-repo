import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const MacroChart = ({ saleData = [] }) => {
  // Aggregate totals by weekday (Mon..Sun)
  const { categories, totals } = useMemo(() => {
    const cats = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const totalsArr = Array(7).fill(0);

    for (const d of saleData) {
      const amount = Number(d.totalAmount) || 0;
      // Try a few common date fields; adjust if yours differs
      const raw = d.date || d.day || d.createdAt;
      const t = raw ? new Date(raw) : null;
      if (t && !isNaN(t)) {
        // JS: 0=Sun..6=Sat  → Mon-first index
        const monFirstIdx = (t.getDay() + 6) % 7;
        totalsArr[monFirstIdx] += amount;
      }
    }
    return { categories: cats, totals: totalsArr };
  }, [saleData]);

  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: { left: 40, right: 20, top: 30, bottom: 30, containLabel: true },
      legend: { data: ["Sale"] },
      xAxis: [{ type: "category", data: categories }],
      yAxis: [
        {
          type: "value",
          min: 0,
          // pad the top a bit based on data
          max: (v) => Math.ceil((v.max || 0) * 1.15),
          axisLabel: { formatter: "{value}" },
        },
      ],
      series: [
        {
          name: "Sale",
          type: "bar",
          data: totals,
          tooltip: { valueFormatter: (val) => `${val}` },
        },
      ],
      // optional: nicer animation with lots of bars
      animationThreshold: 4000,
    }),
    [categories, totals]
  );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ReactECharts option={option} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default MacroChart;
