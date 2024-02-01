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
  } from "recharts";
  
  const BarCreatorsStat = (data: any) => {
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
          <span style={{ color: "rgb(59, 110, 165)" }}>Number of tasks</span>
        </div>
      );
    };
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          style={{ width: "100%", height: "100%", margin: "auto" }}
          data={data?.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="full_name" />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="number_of_tasks"
            width={40}
            fill="rgb(59, 110, 165)"
            barSize={40}
            activeBar={
              <Rectangle  fill="rgb(59, 110, 165)" stroke="rgb(59, 110, 165)" />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default BarCreatorsStat;
  