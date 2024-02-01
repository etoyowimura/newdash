import { Table } from "antd";
import { TCustomer } from "../../types/Customer/TCustomer";
import { isMobile, role } from "../../App";
import { useNavigate } from 'react-router-dom'; 


function CustomerTable({
  data,
  isLoading,
}: {
  data?: TCustomer[] | undefined;
  isLoading?: boolean;
}) {
  const navigate = useNavigate();

  type RowProps = {
    id: number;
  };

  const Row = (record: RowProps) => {
    return {
      onClick: () => {
        role !== "Checker" &&
          navigate(`/customers/${record.id}`);
      },
    };
  };
  
  return (
    <div>
      <Table
        onRow={(record) => Row(record)}
        loading={isLoading}
        size="middle"
        pagination={{
          pageSize: 15,
        }}
        dataSource={data?.map((u, i) => ({
          ...u,
          no: i + 1,
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Role",
            dataIndex: "profession",
          },
          {
            title: "Company",
            dataIndex: "company",
          },
        ]}
      />
    </div>
  );
}

export default CustomerTable;
