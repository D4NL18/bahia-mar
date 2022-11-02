import { defaults } from "chart.js";
import React from "react";

import { Line } from "react-chartjs-2";

function Linha(props) {
  return (
    <Line
      data={props.chartData}
      options={{
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '25',
            borderColor: 'red',
            borderWidth: 2
          }]
        },
        plugins: {
          legend: {
            display: false
          },
        },
        maintainAspectRatio: false,
      }}
    />
  )
}

export default Linha;
