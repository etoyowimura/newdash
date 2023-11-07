import React from "react";
import { Spin, Table, Tag } from "antd";
import moment from "moment";
import { TTeam } from "../../types/Team/TTeam";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

const TeamTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: TTeam[] | undefined;
  isLoading: boolean | undefined;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TTeam[], unknown>>;
}) => {

    
  return (
    <Table
      loading={isLoading}
      onRow={(record) => {
        return {
          onClick: () => {
            document.location.replace(`/#/teams/${record.id}`);
          },
        };
      }}
      dataSource={data?.map((u, i) => ({
        ...u,
        no: i + 1,
        action: { id: u.id },
        key: u.id,
      }))}
      columns={[
        {
          title: "No",
          dataIndex: "no",
          width: "5%",
        },
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Created at",
          dataIndex: "created_at",
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
          onFilter: (value: string | number | boolean, record: TTeam) => {
            return record.is_active === value;
          },
        },
      ]}
    />
  );
};

export default TeamTable;
