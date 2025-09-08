import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,

  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportChart({ getFiltered }) {
  const filtered = getFiltered();
  console.log(filtered)
  // if (!filtered || filtered.length === 0) {
  //   return <div>No data available for the selected filter.</div>;
  // }
  const labels = filtered.map((label) => {
    const saleDate = new Date(label?.date);
    return `${saleDate.getDate()}/${saleDate.getMonth() + 1}`;
  });
  const data = filtered.map((d) => d?.totalAmount);
  console.log(data,labels)

  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title:{
      //   display:true,
      //   text:'I am Developer',
      //   color:'black'
      // }
    },
  };

  const chart = {
    labels: labels,
    datasets: [
      {
        label: "Sale",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className=" ">
      <Bar options={option} data={chart} />;
    </div>
  );
}
