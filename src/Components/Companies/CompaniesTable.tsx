import React, { useState } from "react";
import { Button, Space, Table, message } from "antd";
import { Link } from "react-router-dom";
import { SyncOutlined, EyeOutlined } from "@ant-design/icons";
import { companyController } from "../../API/LayoutApi/companies";
import moment from "moment";
import { useTeamData } from "../../Hooks/Teams";
import { TCompany } from "../../types/Company/TCompany";
const isSuper = localStorage.getItem("isSuperUser");
type numStr = string | number;

interface companySource {
  no: numStr;
  id: numStr;
  name: numStr;
  owner: numStr;
  is_active: boolean;
  usdot: numStr;
  api_key: numStr;
  created_at: numStr;
  action: { id: numStr; api: numStr };
  key: React.Key;
  team: numStr;
}

function CompanyTable({
  data,
  isLoading,
}: {
  data?: TCompany[];
  isLoading?: boolean;
}){
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
    },
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      width: "25%",
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
      title: "USDOT",
      dataIndex: "usdot",
      key: "usdot",
    },
    {
      title: "x-api-key",
      dataIndex: "api_key",
      key: "api_key",
      render: (status: string, record: companySource) => (
        <span className={getStatusClassName()}>{status}</span>
      ),
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
      render: ({ id, api }: { id: string; api: string }) => {
        const enterLoading = (index: number, api: string) => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
          });
          if (api && api !== "") {
            companyController.SyncCompany(index, api);
          } else {
            message.error({
              content: "This company doesn't have an api key",
              duration: 2,
            });
          }
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
              {isSuper === "true" && <Button type="primary">Edit</Button>}
              {isSuper === "false" && (
                <Button type="primary" icon={<EyeOutlined />}></Button>
              )}
            </Link>

            {isSuper === "true" && (
              <Button
                type="primary"
                icon={<SyncOutlined />}
                loading={loadings[Number(id)]}
                onClick={() => enterLoading(Number(id), api)}
              />
            )}
          </Space>
        );
      },
    },
  ];

  function getStatusClassName() {
    if (isSuper === "false") {
      return "isnot";
    } else if (isSuper === "true") {
      return "super";
    }
  }

  const TeamData = useTeamData("");
  return (
    <div>
      <Table
        dataSource={data?.map((u: any, i: number): companySource => {
          let createCr = u.created_at;
          const obj: companySource = {
            no: i + 1,
            name: u?.name,
            owner: u?.owner,
            id: u?.id,
            is_active: u.is_active,
            api_key: u?.api_key,
            usdot: u?.usdot,
            created_at: createCr
              ? moment(createCr).format("YYYY-MM-DD, h:mm:ss a")
              : "",
            action: { id: u.id, api: u?.api_key },
            key: u.id,
            team: TeamData?.data?.data.map((team: any) => {
              if (team.id === u?.team_id) {
                return team.name;
              }
            }),
          };
          return obj;
        })}
        loading={isLoading}
        columns={columns}
      />
    </div>
  );
};

export default CompanyTable;
