import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialBarChart = (props) => {
  const state = {
    series: [props.value],
    options: {
      stroke: {
        lineCap: "round",
      },
      labels: [props.label],
      plotOptions: {
        radialBar: {
          track: {
            background: "#d9d9d9",
            dropShadow: {
              enabled: true,
              top: -0,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: 25,
              show: true,
              color: "#353535",
              fontSize: "14px",
            },
            value: {
              offsetY: -20,
              color: props.color,
              fontSize: "30px",
              fontWeight: "800",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "solid",
        colors: [props.color],
      },
    },
  };
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="radialBar"
      width={240}
      height={240}
    />
  );
};
export default RadialBarChart;
