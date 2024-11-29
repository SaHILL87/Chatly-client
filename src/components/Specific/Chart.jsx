import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import { getLast7Days } from "../../lib/Features";

// To use charts you need to register some scales.
//to Identify these scales you need to see console errors lol.

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: "#e3f2fd", // Light Blue background fill
        borderColor: "#1a1a1a", // Dark Grey border color for the line
        pointBackgroundColor: "#ffffff", // White points on the line
        pointBorderColor: "#1a1a1a", // Dark Grey border for the points
        pointHoverBackgroundColor: "#1a1a1a", // Dark Grey hover effect on points
        pointHoverBorderColor: "#e3f2fd", // Light Blue border on hover
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: ["#1a1a1a", "#e3f2fd"], // Dark Grey and Light Blue
        hoverBackgroundColor: ["#333333", "#cfe0fd"], // Slightly darker shades for hover
        borderColor: ["#1a1a1a", "#e3f2fd"], // Same as background colors for clean edges
        offset: 40,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };
