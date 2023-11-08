import { Button, Modal, Space, Table, Tooltip } from "antd";
import "../../App.css";
import { useEffect, useState } from "react";
import { taskController } from "../../API/LayoutApi/tasks";
import { useNavigate } from "react-router-dom";
import { TPagination } from "../../types/common/TPagination";
import { TTask } from "../../types/Tasks/TTasks";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseQueryResult,
} from "react-query";
import { TCompany } from "../../types/Company/TCompany";
import { TService } from "../../types/Service/TService";
import { TCustomer } from "../../types/Customer/TCustomer";
import { TUser } from "../../types/User/TUser";

const admin_id = localStorage.getItem("admin_id");
const isSuper = localStorage.getItem("isSuperUser");
const TaskTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: {
    characters: TTask[] | undefined;
    CompanyData: UseQueryResult<TCompany[], unknown>;
    CustomerData: UseQueryResult<TCustomer[], unknown>;
    ServiceData: UseQueryResult<TService[], unknown>;
    AdminData: UseQueryResult<TUser[], unknown>;
  };
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TPagination<TTask[]>, unknown>>;
}) => {
  const moment = require('moment')
  const statusClick = (record: any) => {
    if (record.status === "New") {
      Modal.confirm({
        title: "Confirmation",
        content: `Are you sure you want to be in charge for this task?`,
        onOk: () => {
          const value = {
            status: "Checking",
          };
          taskController.taskPatch(value, record.id);
        },
      });
    }
    if (record.status === "Checking") {
      Modal.confirm({
        title: "Confirmation",
        content: `Are you sure you want to finish this task?`,
        onOk: () => {
          const value = {
            status: "Done",
          };
          taskController.taskPatch(value, record.id);
        },
      });
    }
  };

  const rowClassName = (record: TTask) => {
    if (record.status === "New") {
      return "new-status-row";
    }
    return "";
  };

  const navigate = useNavigate();
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

  const handleRowClick = (record: TTask, event: any) => {
    if (isTextSelected) {
      return;
    }
    if (
      event.target.classList.contains("ant-table-cell") &&
      (record.in_charge_id === null ||
        (!!admin_id && record.in_charge_id === +admin_id) ||
        isSuper === "true")
    ) {
      navigate(`/${record.id}`);
    }
  };

  return (
    <div>
      <Table
        onRow={(record) => ({
          onClick: (event) => handleRowClick(record, event),
        })}
        dataSource={data?.characters?.map((u, i) => ({
          ...u,
          no: i + 1,
          company_name: (data.CompanyData?.data || []).find(
            (company) => company.id === u?.company_id
          )?.name,
          customer_name: (data.CustomerData?.data || []).find(
            (customer) => customer.id === u?.customer_id
          )?.name,
          service_title: (data.ServiceData?.data || []).find(
            (service) => service.id === u?.service_id
          )?.title,
          in_charge_name: (data.AdminData?.data || []).find(
            (admin) => admin.id === u.in_charge_id
          )?.username,
          created: moment(u?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY HH:mm'),
          key: u?.id
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            width: "5%",
            fixed: "left",
          },
          {
            title: "Company",
            dataIndex: "company_name",
            width: "13%",
            ellipsis: {
              showTitle: false,
            },
            render: (in_charge_id: string) => (
              <Tooltip placement="topLeft" title={in_charge_id}>
                {in_charge_id}
              </Tooltip>
            ),
          },
          {
            title: "Customer",
            dataIndex: "customer_name",
            width: "13%",
            ellipsis: {
              showTitle: false,
            },
            render: (in_charge_id: string) => (
              <Tooltip placement="topLeft" title={in_charge_id}>
                {in_charge_id}
              </Tooltip>
            ),
          },
          {
            title: "Service",
            dataIndex: "service_title",
            width: "7%",
          },
          {
            title: "Status",
            dataIndex: "status",
            ellipsis: {
              showTitle: false,
            },
            render: (status: string) => (
              <span className={`status-${status.toLowerCase()}`}>{status}</span>
            ),
          },
          {
            title: "In charge",
            dataIndex: "in_charge_name",
            width: "13%",
            ellipsis: {
              showTitle: false,
            },
            render: (in_charge_id: string) => (
              <Tooltip placement="topLeft" title={in_charge_id}>
                {in_charge_id}
              </Tooltip>
            ),
          },
          {
            title: "Note",
            dataIndex: "note",
            width: "13%",
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
            title: "PTI",
            dataIndex: "pti",
            width: "8%",
            render: (pti: boolean) => (pti ? "No need" : "Do"),
          },
          {
            title: "Created at",
            dataIndex: "created",
            width: "12%",
          },
          {
            title: "Actions",
            dataIndex: "action",
            fixed: "right",
            width: "8%",
            render: (text, record) => {
              return (
                <div>
                  {isSuper === "false" ? (
                    <Space>
                      {record.status === "New" && (
                        <Button
                          type="primary"
                          style={{ background: "#595959" }}
                          onClick={() => statusClick(record)}
                        >
                          Assign
                        </Button>
                      )}
                      {record.status === "Checking" &&
                        !!admin_id &&
                        record.in_charge_id === +admin_id && (
                          <Button
                            type="primary"
                            style={{ background: "#595959" }}
                            onClick={() => statusClick(record)}
                          >
                            Finish
                          </Button>
                        )}
                    </Space>
                  ) : (
                    <Space>
                      <Button
                        type="primary"
                        danger
                        onClick={(e) => {
                          const shouldDelete = window.confirm(
                            "Вы уверены, что хотите удалить эту задачу?"
                          );
                          if (shouldDelete && record.id !== undefined) {
                            taskController.deleteTaskController(record.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Space>
                  )}
                </div>
              );
            },
          },
        ]}
        scroll={{ x: "calc(800px + 40%)" }}
        rowClassName={rowClassName}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};

export default TaskTable;
