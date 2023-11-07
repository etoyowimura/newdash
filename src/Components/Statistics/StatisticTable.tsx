import { Table } from "antd";
import { TStat } from "../../types/Statistic/TStat";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

const StatTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: {data: TStat[] | undefined, teamData: any};
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TStat[], unknown>>;
}) => {
  
  return (
    <div>
      <Table
        loading={isLoading}
        dataSource={data?.data?.map((u, i) => ({
          no: i + 1,
          team: data?.teamData?.data?.data?.map((team: any) => {
            if (team.id === u?.team_id) {
              return team.name;
            }
          }),
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
            dataIndex: "team",  
            key: "team",
          },
          {
            title: "Points",
            dataIndex: "total_points",
            key: "total_points",
          },
        ]}
      />
    </div>
  );
};

export default StatTable;
