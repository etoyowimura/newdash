import { Spin, Table, Tag } from "antd";
import { useTeamData } from "../../Hooks/Teams";

type numStr = string | number;
interface userSource {
  no: numStr;
  first_name: numStr;
  last_name: numStr;
  username: numStr;
  is_active: numStr;
  team: numStr;
  id: numStr;
  action: { id: numStr };
  key: React.Key;
}

const UserTable = ({ data = [] }: { data: any | undefined }) => {
  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    // {
    //   title: "First name",
    //   dataIndex: "first_name",
    //   key: "first_name",
    // },
    // {
    //   title: "Last name",
    //   dataIndex: "last_name",
    //   key: "last_name",
    // },
    {
      title: "Is Active",
      dataIndex: "is_active",
      key: "is_active",
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
      onFilter: (value: any, record: any) => {
        return record.is_active === value;
      },
    },
  ];
  const TeamData = useTeamData("");

  return (
    <div>
      <Table
        onRow={(record) => {
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
                return
              }
              document.location.replace(`/#/users/${record.id}`);
            },
          };
        }}
        dataSource={data?.map((u: any, i: number): userSource => {
          const obj: userSource = {
            no: i + 1,
            first_name: u?.first_name,
            last_name: u?.last_name,
            username: u?.username,
            is_active: u?.is_active,
            team: TeamData?.data?.data.map((team: any) => {
              if (team.id === u?.team_id) {
                return team?.name;
              }
            }),
            id: u?.id,
            action: { id: u.id },
            key: u.id,
          };
          return obj;
        })}
        columns={columns}
      />
    </div>
  );
};

export default UserTable;
