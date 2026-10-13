import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import useTheme from "../hooks/useTheme";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function FinanceChart({

  income,

  expense

}) {

  const { theme } = useTheme();

  const textColor = theme === "dark" ? "#e5e7eb" : "#374151";

  const options = {
    plugins: {
      legend: {
        labels: { color: textColor },
      },
    },
  };

  const data = {

    labels: [

      "Income",

      "Expenses"

    ],

    datasets: [

      {

        data: [

          income,

          expense

        ],

        backgroundColor: [

          "#22c55e",

          "#ef4444"

        ],

      },

    ],

  };

  return (

    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">

        Financial Overview

      </h2>

      <div className="max-w-sm mx-auto">

        <Pie data={data} options={options} />

      </div>

    </div>

  );

}

export default FinanceChart;