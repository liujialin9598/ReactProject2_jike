import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Home() {
  const chartRef = useRef();
  //useEffect 保证dom获取得到
  useEffect(() => {
    //获取渲染图标的节点
    const chartDom = chartRef.current;
    //初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [100, 140, 70],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  });
  return (
    <div>
      <div
        id="main"
        ref={chartRef}
        style={{ width: "500px", height: "400px" }}
      ></div>
    </div>
  );
}
