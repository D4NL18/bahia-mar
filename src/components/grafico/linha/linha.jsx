import React from "react";

import { Line } from "react-chartjs-2";

function Linha(props) {
  return <Line data={props.chartData} />;
}

export default Linha;
