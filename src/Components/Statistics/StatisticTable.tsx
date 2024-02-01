import { Table } from "antd";
import { TStat } from "../../types/Statistic/TStat";

const StatTable = ({
  data,
  isLoading,
}: {
  data: { data: TStat[] | undefined; };
  isLoading: boolean;
}) => {
  return (
    <div>
      <Table
        size="small"
        loading={isLoading}
        dataSource={data?.data?.map((u, i) => ({
          no: i + 1,
          ...u,
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "5%",
          },
          {
            title: "Support specialist",
            dataIndex: "username",
            key: "username",
          },
          {
            title: "Team",
            dataIndex: "team_name",
            key: "team_name ",
          },
          {
            title: "Points",
            dataIndex: "total_points",
            key: "total_points",
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default StatTable;
