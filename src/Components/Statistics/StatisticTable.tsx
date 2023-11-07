import React, { useState } from "react";
import { Modal, Spin, Table } from "antd";
import { useTeamData } from "../../Hooks/Teams";

type numStr = string | number;

interface statSource {
  no: numStr;
  admin: numStr;
  points: numStr;
  team: numStr;
  fullName: numStr;
  id: numStr;
  key: React.Key;
  name: string;
}

const StatTable = ({
  data = [],
  // onChange,
}: {
  data: any | undefined;
  // onChange(current: any): void;
}) => {const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: '5%'
    },
    {
      title: "Support specialist",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
  ];
  const TeamData = useTeamData("");
  return (
    <div>
      <Table
        // onChange={onChange}
        dataSource={data?.map((u: any, i: number): statSource => {
          const obj: statSource = {
            no: i + 1,
            team: TeamData?.data?.data.map((team: any) => {
              if (team.id === u?.team_id) {
                return team.name;
              }
            }),
            admin: u?.username,
            name: u?.name,
            points: u?.total_points,
            fullName: u?.full_name,
            id: u?.id,
            key: u.id,
          };
          return obj;
        })}
        columns={columns}
      />
    </div>
  );
};

export default StatTable;
