import { Button, Modal, Space, Spin, Table, Tooltip } from "antd";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerData } from "../../Hooks/Customers";
import { useServiceData } from "../../Hooks/Services";
import { useUserData } from "../../Hooks/Users";
import { useTeamData } from "../../Hooks/Teams";
import "../../App.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { taskController } from "../../API/LayoutApi/tasks";
import { useNavigate } from "react-router-dom";
import { TPagination } from "../../types/common/TPagination";
import { TTask } from "../../types/Tasks/TTasks";


const admin_id = localStorage.getItem("admin_id");
const isSuper = localStorage.getItem("isSuperUser");
const TaskTable = ({
  data,
  isLoading,
  refetch,
}: {
  data?: TPagination<TTask[]>;
  isLoading?: boolean;
  refetch?: any;
}) => {
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

  const CompanyData = useCompanyData("");
  const CustomerData = useCustomerData("");
  const AdminData = useUserData("");
  const ServiceData = useServiceData("");
  const TeamData = useTeamData("");

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

  const handleRowClick = (record: any, event: any) => {
    if (isTextSelected) {
      return;
    }
    if (
      event.target.classList.contains("ant-table-cell") &&
      (record.action.in_charge_id === null ||
        record.action.in_charge_id == admin_id ||
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
        dataSource={data?.data.map((u, i) => ({
          ...u,
          no: i + 1,
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
          service_id: ServiceData?.data?.data.map((service: any) => {
            if (service.id === u?.service_id) {
              return service.title;
            }
          }),
          assigned_to_id: TeamData?.data?.data.map((team: any) => {
            if (team.id === u?.assigned_to_id) {
              return team.name;
            }
          }),
          in_charge_id: AdminData?.data?.data.map((admin: any) => {
            if (admin.id === u.in_charge_id) {
              return admin.username;
            }
          }),
          created_at: u.created_at
            ? moment(u.created_at).format("DD.MM.YYYY, HH:mm")
            : "",
          action: u,
          key: u.id,
        }))}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "5%",
            fixed: "left",
          },
          {
            title: "Company",
            dataIndex: "company_id",
            key: "company_id",
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
            dataIndex: "customer_id",
            key: "customer_id",
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
            dataIndex: "service_id",
            key: "service_id",
            width: "7%",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",

            ellipsis: {
              showTitle: false,
            },
            render: (status: string) => (
              <span className={`status-${status.toLowerCase()}`}>{status}</span>
            ),
          },
          {
            title: "In charge",
            dataIndex: "in_charge_id",
            key: "in_charge_id",
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
            key: "note",
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
            key: "pti",
            width: "8%",
            render: (pti: boolean) => (pti ? "No need" : "Do"),
          },
          {
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
            width: "12%",
          },
          {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: "8%",
            render: (record: any) => {
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
                        record.in_charge_id == admin_id && (
                          <Button
                            type="primary"
                            style={{ background: "#595959" }}
                            onClick={() => statusClick(record)}
                          >
                            Finish
                          </Button>
                        )}
                    </Space>
                  ): (
                    <Space>
                      <Button
                      type="primary" 
                      danger
                      onClick={e => {
                        const shouldDelete = window.confirm(
                        "Вы уверены, что хотите удалить эту задачу?"
                      );
                      if (shouldDelete && record.id !== undefined) {
                        taskController.deleteTaskController(record.id)
                      }}}
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
