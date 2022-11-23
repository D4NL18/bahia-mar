import { Bar } from "react-chartjs-2";

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
