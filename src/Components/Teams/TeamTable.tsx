import { Table, Tag } from "antd";
import { TTeam } from "../../types/Team/TTeam";
import { useNavigate } from 'react-router-dom';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { isMobile, timeZone } from "../../App";

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
  const navigate = useNavigate();
  const moment = require('moment-timezone')
    
  return (
    <Table
      loading={isLoading}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/teams/${record.id}`)
          },
        };
      }}
      dataSource={data?.map((u, i) => ({
        ...u,
        no: i + 1,
        action: { id: u.id },
        created: moment(u?.created_at).tz(timeZone).format('DD.MM.YYYY HH:mm'),
        key: u.id,
      }))}
      size="middle"
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
          dataIndex: "created",
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
