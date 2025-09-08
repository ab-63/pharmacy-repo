// import React, { useRef, useEffect } from "react";
// import * as echarts from "echarts";

// export function Chart({ className, style = {}, ...props }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     // Initialize chart instance
//     const chart = echarts.init(chartRef.current);

//     // Prepare chart data
//     const xAxisData = [];
//     const data1 = [];
//     const data2 = [];
//     for (let i = 0; i < 100; i++) {
//       xAxisData.push(`A${i}`);
//       data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
//       data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
//     }

//     // Define chart options
//     const option = {
//       title: { text: "Bar Animation Delay" },
//       legend: { data: ["bar", "bar2"] },
//       toolbox: {
//         feature: {
//           magicType: { type: ["stack"] },
//           dataView: {},
//           saveAsImage: { pixelRatio: 2 },
//         },
//       },
//       tooltip: {},
//       xAxis: {
//         data: xAxisData,
//         splitLine: { show: false },
//       },
//       yAxis: {},
//       series: [
//         {
//           name: "bar",
//           type: "bar",
//           data: data1,
//           emphasis: { focus: "series" },
//           animationDelay: (idx) => idx * 10,
//         },
//         {
//           name: "bar2",
//           type: "bar",
//           data: data2,
//           emphasis: { focus: "series" },
//           animationDelay: (idx) => idx * 10 + 100,
//         },
//       ],
//       animationEasing: "elasticOut",
//       animationDelayUpdate: (idx) => idx * 5,
//     };

//     // Apply options
//     chart.setOption(option);

//     // Handle resizing
//     const resizeHandler = () => chart.resize();
//     window.addEventListener("resize", resizeHandler);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", resizeHandler);
//       chart.dispose();
//     };
//   }, []);

//   return (
//     <div
//     ref={chartRef}
//     className={`w-full h-16`} // Full-width, 24 rem height (~384px)
//     {...props}
//   />
  
//   );
// }
