import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import CustomBarTool from "./CustomBarTool";

const BarStat = (data: any) => {
  console.log(data?.data);

  const CustomLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            background: "rgb(59, 110, 165)",
            marginRight: 10,
          }}
        ></div>
        <span style={{ color: "rgb(59, 110, 165)" }}>Total points</span>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart
        style={{ width: "100%", height: "100%", margin: "auto" }}
        data={data?.data}
        margin={{
          top: 25,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomBarTool />} />
        <Legend content={<CustomLegend />} />
        <Bar
          dataKey="total_points"
          width={40}
          fill="rgb(59, 110, 165)"
          barSize={40}
          activeBar={
            <Rectangle fill="rgb(59, 110, 165)" stroke="rgb(59, 110, 165)" />
          }
        >
          <LabelList dataKey="total_points" position="inside" fill="#fff"/>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarStat;
