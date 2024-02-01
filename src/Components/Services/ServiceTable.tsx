import { Table } from "antd";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { TService } from "../../types/Service/TService";
import { isMobile, role } from "../../App";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <div>
      <Table
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              role !== "Checker" &&
                navigate(`/services/${record.id}`)
            },
          };
        }}
        dataSource={data?.map((u, i) => ({
          no: i + 1,
          title: u?.title,
          points: u?.points,
          id: u?.id,
          action: { id: u.id },
          key: u.id,
        }))}
        columns={[
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
        ]}
        size="middle"
      />
    </div>
  );
};

export default ServiceTable;
