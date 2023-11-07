
import { Table, Tag } from "antd";
import { TStatTeam } from "../../types/Statistic/TStat";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

const StatTeamTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: TStatTeam[] | undefined;
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TStatTeam[], unknown>>;
}) => {

  return (
    <div>
      <Table
        loading={isLoading}
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
      />
    </div>
  );
};

export default StatTeamTable;
