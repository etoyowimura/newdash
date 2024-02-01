import { role } from "../../App";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{ background: "#f1f1f1", padding: 10, borderRadius: 5 }}
      >
        <p className="dataBold">
          Date: <span>{label}</span>
        </p>
        {payload.map((data: any) => (
          <>
            <p className="dataBold">
              {role === "Checker" ? "Points:" : "Tasks created:"}{" "}
              <span>{data.value}</span>
            </p>
            {role === "Checker" && (
              <p className="dataBold">
                Tasks: <span>{data.payload.number_of_tasks}</span>
              </p>
            )}
          </>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
