import { Table } from "antd";
import { useCompanyData } from "../../Hooks/Companies";
import { TCustomer } from "../../types/Customer/TCustomer";

const isSuper = localStorage.getItem("isSuperUser");

function CustomerTable({
  data,
  isLoading,
}: {
  data?: TCustomer[] | undefined;
  isLoading?: boolean;
}) {
  const CompanyData = useCompanyData({
    name: undefined,
    page: undefined,
    is_active: undefined,
  });

  type RowProps = {
    id: number;
  };

  const Row = (record: RowProps) => {
    return {
      onClick: () => {
        isSuper !== "false" &&
          document.location.replace(`/#/customers/${record.id}`);
      },
    };
  };
  return (
    <div>
      <Table
        onRow={(record) => Row(record)}
        loading={isLoading}
        dataSource={data?.map((u, i) => ({
          ...u,
          no: i + 1,
          company_id: CompanyData?.data?.find((company: any) => company.id === u?.company_id)?.name || "",
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
            dataIndex: "company_id",
          },
        ]}
      />
    </div>
  );
}

export default CustomerTable;
