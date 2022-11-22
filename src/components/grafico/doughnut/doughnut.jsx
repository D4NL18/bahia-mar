import { Doughnut } from "react-chartjs-2";

function Barras(props) {
    return (
        <Doughnut
            width={10}
            height={5}
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
