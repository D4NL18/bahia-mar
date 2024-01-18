import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as Chart } from "chart.js/auto"; // não mexer se não bicha o gráfico

function Barras(props) {
  return (
    <Bar
      data={props.chartData}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
}

export default Barras;
