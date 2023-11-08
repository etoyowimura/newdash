import { Button, Space, Table, Tooltip } from "antd";
import moment from "moment";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerData } from "../../Hooks/Customers";
import { useUserData } from "../../Hooks/Users";
import { updateController } from "../../API/LayoutApi/update";
import { CloseCircleOutlined } from "@ant-design/icons";
import { BsPinAngle } from "react-icons/bs";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { TUpdate } from "../../types/Update/TUpdate";
import { useEffect, useState } from "react";

const UpdateTable = ({
  data = [],
  isLoading,
  refetch,
}: {
  data: TUpdate[] | undefined;
  isLoading?: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TUpdate[], unknown>>;
}) => {
  const rowClassName = (record: TUpdate) => {
    if (record.is_pinned === true) {
      return "new-status-row";
    }
    return "";
  };

  const CompanyData = useCompanyData({});
  const CustomerData = useCustomerData({});
  const AdminData = useUserData({});

  const [isTextSelected, setIsTextSelected] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      setIsTextSelected(selection !== null && selection.toString() !== "");
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const Row = (record: TUpdate, event: any) => {
    if (isTextSelected) {
      return;
    }
    if (event.target.classList.contains("ant-table-cell")) {
      document.location.replace(`/#/updates/${record.id}`);
    }
  };

  return (
    <div>
      <Table
        onRow={(record) => ({
          onClick: (event) => Row(record, event),
        })}
        dataSource={data?.map((u, i) => ({
          no: i + 1,
          ...u,
          company_name: CompanyData?.data?.find(
            (company: any) => company.id === u.company_id
          )?.name,
          customer_name: CustomerData?.data?.find(
            (customer: any) => customer.id === u.customer_id
          )?.name,
          in_charge_name: AdminData?.data?.find(
            (admin: any) => admin.id === u.provider_id
          )?.username,
          executor_name: AdminData?.data?.find(
            (admin: any) => admin.id === u.executor_id
          )?.username,
          created: moment(u?.created_at, "YYYY-MM-DD HH:mm:ss").format(
            "DD.MM.YYYY HH:mm"
          ),
          action: { ...u },
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            width: "5%",
          },
          {
            title: "Company",
            dataIndex: "company_name",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Customer",
            dataIndex: "customer_name",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Created by",
            dataIndex: "in_charge_name",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Complited by",
            dataIndex: "executor_name",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
            ellipsis: {
              showTitle: false,
            },
            render: (status: string) => (
              <span
                className={`status-${status.toLowerCase().replace(/\s/g, "-")}`}
              >
                {status}
              </span>
            ),
          },
          {
            title: "Note",
            dataIndex: "note",
            width: "20%",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Solution",
            dataIndex: "solution",
            width: "20%",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Created at",
            dataIndex: "created",
            ellipsis: {
              showTitle: false,
            },
            render: (note: string) => (
              <Tooltip placement="topLeft" title={note}>
                {note}
              </Tooltip>
            ),
          },
          {
            title: "Actions",
            dataIndex: "action",
            fixed: "right",
            width: "8%",
            render: (record: TUpdate) => {
              return (
                <div className="notedit">
                  {record.status !== "Done" && (
                    <Space>
                      {record.is_pinned ? (
                        <Button
                          type="dashed"
                          size="small"
                          onClick={(e) => {
                            const updateData = {
                              is_pinned: false,
                            };
                            updateController
                              .updatePatch(updateData, record.id)
                              .then(() => {
                                refetch();
                              });
                          }}
                        >
                          <CloseCircleOutlined />
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          size="small"
                          style={{ paddingTop: 2 }}
                          onClick={(e) => {
                            const updateData = {
                              is_pinned: true,
                            };
                            updateController
                              .updatePatch(updateData, record.id)
                              .then(() => {
                                refetch();
                              });
                          }}
                        >
                          <BsPinAngle />
                        </Button>
                      )}
                    </Space>
                  )}
                </div>
              );
            },
          },
        ]}
        rowClassName={rowClassName}
        loading={isLoading}
        scroll={{ x: "calc(800px + 40%)" }}
      />
    </div>
  );
};

export default UpdateTable;
