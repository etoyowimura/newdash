import React, { useState } from "react";
import { Button, Space, Table, message } from "antd";
import { Link } from "react-router-dom";
import { SyncOutlined, EyeOutlined } from "@ant-design/icons";
import { companyController } from "../../API/LayoutApi/companies";
import { useTeamData } from "../../Hooks/Teams";
import { TCompany } from "../../types/Company/TCompany";
const isSuper = localStorage.getItem("isSuperUser");

function CompanyTable({
  data,
  isLoading,
}: {
  data?: TCompany[] | undefined;
  isLoading?: boolean;
}) {
  const moment = require('moment')
  const [loadings, setLoadings] = useState<boolean[]>([]);
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
        dataSource={data?.map((u, i) => ({
          ...u,
          no: i + 1,
          team: TeamData?.data?.find((team) => team.id === u?.team_id)?.name || "",
          created: moment(u?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY HH:mm'),
          key: u?.id,
          action: {...u},
        }))}
        loading={isLoading}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            width: "5%",
          },
          {
            title: "Company",
            dataIndex: "name",
            width: "25%",
          },
          {
            title: "Owner",
            dataIndex: "owner",
          },
          {
            title: "Team",
            dataIndex: "team",
          },
          {
            title: "USDOT",
            dataIndex: "usdot",
          },
          {
            title: "x-api-key",
            dataIndex: "api_key",
            render: (status: string, record: TCompany) => (
              <span className={getStatusClassName()}>{status}</span>
            ),
          },
          {
            title: "Created at",
            dataIndex: "created",
          },
          {
            title: "Actions",
            dataIndex: "action",
            render: ({ id, api }: { id: string; api: string }) => {
              const enterLoading = (index: number, api: string) => {
                setLoadings((prevLoadings) => {
                  const newLoadings = [...prevLoadings];
                  newLoadings[index] = true;
                  return newLoadings;
                });
                if (api && api !== "") {
                  companyController.SyncCompany(index);
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
        ]}
      />
    </div>
  );
}

export default CompanyTable;
