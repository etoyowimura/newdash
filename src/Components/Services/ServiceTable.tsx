import React from "react";
import { Modal, Spin, Table } from "antd";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { TService } from "../../types/Service/TService";

const { confirm } = Modal;

type numStr = string | number;

interface serviceSource {
  no: numStr;
  title: numStr;
  points: numStr;
  id: numStr;
  action: { id: numStr };
  key: React.Key;
}
const isSuper = localStorage.getItem("isSuperUser");
const ServiceTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: TService[] | undefined;
  isLoading: boolean | undefined;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TService[], unknown>>;
}) => {
  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Points",
      dataIndex: "points",
    },
  ];
  return (
    <div>
      <Table
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              isSuper !== "false" &&
                document.location.replace(`/#/services/${record.id}`);
            },
          };
        }}
        dataSource={data?.map((u: any, i: number): serviceSource => {
          const obj: serviceSource = {
            no: i + 1,
            title: u?.title,
            points: u?.points,
            id: u?.id,
            action: { id: u.id },
            key: u.id,
          };
          return obj
        })}
        columns={columns}
      />
    </div>
  );
};

export default ServiceTable;
