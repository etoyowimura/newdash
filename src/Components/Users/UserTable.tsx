import { Table, Tag } from "antd";
import { useTeamData } from "../../Hooks/Teams";
import { TUser } from "../../types/User/TUser";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useNavigate } from "react-router-dom";

const UserTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: TUser[] | undefined;
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TUser[], unknown>>;
}) => {
  const navigate = useNavigate();
  const TeamData = useTeamData("");

  const Row = (record: TUser) => {
    let isTextSelected = false;
    document.addEventListener("selectionchange", () => {
      const selection = window.getSelection();
      if (selection !== null && selection.toString() !== "") {
        isTextSelected = true;
      } else {
        isTextSelected = false;
      }
    });
    return {
      onClick: () => {
        if (isTextSelected) {
          return;
        }
        navigate(`/users/${record.id}`);
      },
    };
  };

  return (
    <div>
      <Table
        onRow={(record) => Row(record)}
        dataSource={data?.map((u, i) => ({
          no: i + 1,
          team: TeamData?.data?.map((team: any) => {
            if (team.id === u?.team_id) {
              return team?.name;
            } else {
              return null;
            }
          }),
          action: { id: u.id },
          ...u,
        }))}
        loading={isLoading}
        size="middle"
        columns={[
          {
            title: "No",
            dataIndex: "no",
          },
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Team",
            dataIndex: "team",
          },
          {
            title: "Is Active",
            dataIndex: "is_active",
            render: (tag: boolean) => (
              <Tag color={tag ? "geekblue" : "red"}>
                {tag ? "True" : "False"}
              </Tag>
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
            onFilter: (value: any, record: any) => {
              return record.is_active === value;
            },
          },
        ]}
      />
    </div>
  );
};

export default UserTable;
