import React, { useState } from "react";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled, SyncOutlined  } from "@ant-design/icons";
import { companyController } from "../../API/LayoutApi/companies";
import moment from "moment";
import { useTeamData } from "../../Hooks/Teams";

const { confirm } = Modal;
const isSuper = localStorage.getItem("isSuperUser");
type numStr = string | number;

interface companySource {
  no: numStr;
  id: numStr;
  name: numStr;
  owner: numStr;
  is_active: boolean;
  created_at: numStr;
  action: { id: numStr };
  key: React.Key;
  team: numStr;
}

const CompanyTable = ({
  data = [],
  onChange,
  // isLoading,
  // isFetching,
  // refetch,
}: {
  data: any | undefined;
  onChange(current: any): void;
  // isLoading: boolean | undefined;
  // isFetching: boolean | undefined;
  // refetch(): void;
}) => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
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
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: ({
        id,
        queryClient,
      }: {
        id: string;
        queryClient: any;
      }) => {
        const showConfirm = () => {
          confirm({
            title: "Companies",
            icon: <ExclamationCircleFilled />,
            content: "Do you want to delete this Company ?",
            onOk: async () => {
              return new Promise(async (resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                await companyController.deleteCompanyController(id);
                // refetch();
              }).catch(() => {
                // refetch();
              });
            },
            onCancel() {},
          });
        };
        const enterLoading = (index: number) => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
          });
          setTimeout(() => {
            setLoadings((prevLoadings) => {
              const newLoadings = [...prevLoadings];
              newLoadings[index] = false;
              return newLoadings;
            });
          }, 6000);
        };
        return (
          <Space>
            <Link to={`${id}`}>
              <Button disabled={isSuper === "false"}>Edit </Button>
            </Link>
            <Button disabled={isSuper === "false"} onClick={showConfirm}>Delete</Button>
            {isSuper === 'true' && <Button
              type="primary"
              icon={<SyncOutlined />}
              loading={loadings[Number(id)]}
              onClick={() => enterLoading(Number(id))}
            />}
          </Space>
        );
      },
    },
  ];
  // const [loadings, setLoadings] = useState<boolean[]>([]);

  // const enterLoading = (index: number) => {
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });

  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 6000);
  // };


  const TeamData = useTeamData('');
  return (
    <div>
      {/* <Spin size="large" spinning={isLoading || isFetching}> */}
        <Table
          onChange={onChange}
          dataSource={data?.map((u: any, i: number): companySource => {
            let createCr = u.created_at;
            const obj: companySource = {
              no: i + 1,
              name: u?.name,
              owner: u?.owner,
              id: u?.id,
              is_active: u.is_active,
              created_at: createCr
                ? moment(createCr).format("YYYY-MM-DD, h:mm:ss a")
                : "",
              action: { id: u.id },
              key: u.id,
              team: TeamData?.data?.data.map((team: any)=> {if(team.id === u?.team_id){return team.name}}),
            };
            return obj;
          })}
          columns={columns}
        />
      {/* </Spin> */}
    </div>
  );
};

export default CompanyTable;
