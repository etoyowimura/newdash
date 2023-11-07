import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import moment from "moment";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerData } from "../../Hooks/Customers";
import { useUserData } from "../../Hooks/Users";
import { updateController } from "../../API/LayoutApi/update";
import { CloseCircleOutlined } from "@ant-design/icons";
import {BsPinAngle} from "react-icons/bs"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { TUpdate } from "../../types/Update/TUpdate";

type numStr = string | number;

interface updateSource {
  no: numStr;
  company_id: numStr;
  customer_id: numStr;
  in_charge_id: numStr;
  status: numStr;
  note: numStr;
  solution: numStr;
  created_at: numStr;
  is_pinned: boolean
  executor_id: numStr;
  action: any;
  key: React.Key;
  id: number;
}
const UpdateTable = ({
  data = [],
  isLoading,
  refetch,
}: {
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<TUpdate[], unknown>>
  data: any;
  isLoading?: boolean;
}) => {
  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
    },
    {
      title: "Company",
      dataIndex: "company_id",
      key: "company_id",
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
      dataIndex: "customer_id",
      key: "customer_id",
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
      dataIndex: "in_charge_id",
      key: "in_charge_id",
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
      dataIndex: "executor_id",
      key: "executor_id",
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
      key: "status",
      minWidth: "7%",
      ellipsis: {
        showTitle: false,
      },
      render: (status: string) => (
        <span className={`status-${status.toLowerCase().replace(/\s/g, "-")}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
      key: "solution",
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
      dataIndex: "created_at",
      key: "created_at",
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
      key: "action",
      fixed: "right",
      width: "8%",
      render: (record: any) => {
        return (
          <div className="notedit">
            {record.status !== 'Done' && (<Space>
              {record.is_pinned ? (
                <Button
                  type="dashed"
                  size="small"
                  onClick={(e) => {
                    const updateData = {
                      is_pinned: false,
                    }
                    updateController
                      .updatePatch(updateData , record.id)
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
                  style={{paddingTop: 2}}
                  onClick={(e) => {
                    const updateData = {
                      is_pinned: true,
                    }
                    updateController
                      .updatePatch(updateData , record.id)
                      .then(() => {
                        refetch();
                      });
                  }}
                >
                  <BsPinAngle />
                </Button>
              )}
            </Space>)}
          </div>
        );
      },
    },
  ];

  const rowClassName = (record: updateSource) => {
    if (record.is_pinned === true) {
      return "new-status-row";
    }
    return "";
  };

  const CompanyData = useCompanyData("");
  const CustomerData = useCustomerData("");
  const AdminData = useUserData("");

  const handleRowClick = (record: any, event: any) => {
    if (
      event.target.classList.contains("ant-table-cell")
    ) {
      document.location.replace(`/#/updates/${record.id}`);
    }
  };

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
            onClick: (event) => {
              if (isTextSelected) {
                return 
              }
               handleRowClick(record, event);
            },
          };
        }}
        dataSource={data?.map((u: any, i: number): updateSource => {
          let createCr = u.created_at;
          const obj: updateSource = {
            no: i + 1,
            is_pinned: u.is_pinned,
            company_id: CompanyData?.data?.data.map((company: any) => {
              if (company.id === u?.company_id) {
                return company.name;
              }
            }),
            customer_id: CustomerData?.data?.map((customer: any) => {
              if (customer.id === u?.customer_id) {
                return customer.name;
              }
            }),
            in_charge_id: AdminData?.data?.data.map((admin: any) => {
              if (admin.id === u.provider_id) {
                return admin.username;
              }
            }),
            executor_id: AdminData?.data?.data.map((admin: any) => {
              if (admin.id === u.executor_id) {
                return admin.username;
              }
            }),
            status: u?.status,
            note: u?.note,
            solution: u?.solution,
            id: u?.id,
            created_at: u.created_at
              ? moment(u.created_at).format("YYYY-MM-DD, h:mm")
              : "",
            action: u,
            key: u.id,
          };
          return obj;
        })}
        rowClassName={rowClassName}
        loading={isLoading}
        columns={columns}
        scroll={{ x: "calc(800px + 40%)" }}
      />
    </div>
  );
};

export default UpdateTable;
