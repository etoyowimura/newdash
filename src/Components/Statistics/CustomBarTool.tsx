const CustomBarTool = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{ background: "#f1f1f1", padding: 10, borderRadius: 5 }}
      >
        <p className="dataBold">
          Team: <span>{label}</span>
        </p>
        {payload.map((data: any) => (
          <>
            <p className="dataBold">
              Points: <span>{data.value}</span>
            </p>
            <p className="dataBold">
              Tasks: <span>{data.payload.number_of_tasks}</span>
            </p>
          </>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomBarTool;
