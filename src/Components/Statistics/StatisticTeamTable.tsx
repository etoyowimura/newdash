
import { Table, Tag } from "antd";
import { TStatTeam } from "../../types/Statistic/TStat";
import { isMobile } from "../../App";

const StatTeamTable = ({
  data,
  isLoading,
}: {
  data: TStatTeam[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <div style={{ maxHeight: "400px", overflow: "auto" }}>
      <Table
        loading={isLoading}
        size="small"
        dataSource={data?.map((u, i) => ({
          no: i + 1,
          ...u,
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
          },
          {
            title: "Team",
            dataIndex: "name",
          },
          {
            title: "Total points",
            dataIndex: "total_points",
          },
          {
            title: "Is Active",
            dataIndex: "is_active",
            render: (tag: boolean) => (
              <Tag color={tag ? "geekblue" : "red"}>{tag ? "True" : "False"}</Tag>
            ),
            filters: [
              {
                text: "True",
                value: true,
              },
              {
                text: "False",
                value: false,
              },
            ],
            onFilter: (value: string | number | boolean, record: TStatTeam) => {
              return record.is_active === value;
            },
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default StatTeamTable;
