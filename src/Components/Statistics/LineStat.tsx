import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { role } from "../../App";

const LineStat = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        style={{ cursor: "pointer" }}
        width={480}
        height={480}
        data={data?.daily_stats}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={{ stroke: "black" }}
          tickLine={{ stroke: "black" }}
          dataKey="date"
          tickFormatter={(value) =>
            value && value.length > 5
              ? value.substring(5).replace(/-/g, "/")
              : value
          }
        />
        <YAxis axisLine={{ stroke: "black" }} tickLine={{ stroke: "black" }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={role === "Checker" ? "points" : "number_of_tasks"}
          stroke="rgb(59, 110, 165)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineStat;
