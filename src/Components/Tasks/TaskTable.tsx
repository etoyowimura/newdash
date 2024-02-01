import { Button, Modal, Space, Table, Tag, Tooltip } from "antd";
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
} from "react-query";
import { admin_id, isMobile, role, timeZone } from "../../App";

const TaskTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: {
    characters: TTask[] | undefined;
  };
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TPagination<TTask[]>, unknown>>;
}) => {
  const moment = require("moment-timezone");
  const statusClick = (record: any) => {
    if (record.status === "New") {
      Modal.confirm({
        title: "Confirmation",
        content: `Are you sure you want to be in charge for this task?`,
        onOk: () => {
          const value = {
            status: "Checking",
          };
          taskController.taskPatch(value, record?.id);
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
          taskController.taskPatch(value, record?.id);
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
      (record.in_charge?.id === null ||
        (!!admin_id && record.in_charge?.id === admin_id) ||
        role !== "Checker")
    ) {
      navigate(`/tasks/${record?.id}`);
    }
  };
  return (
    <div>
      <Table
        onRow={(record) => ({
          onClick: (event) => handleRowClick(record, event),
        })}
        dataSource={data?.characters?.map((u, i) => {
          const convertedTimestamp = moment(u?.created_at).tz(timeZone);

          return {
            ...u,
            no: i + 1,
            service_title: u?.service?.title,
            in_charge_name: u?.in_charge?.username,
            created: convertedTimestamp.format("DD.MM.YYYY HH:mm"),
            key: u?.id,
          };
        })}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            width: "4%",
          },
          {
            title: "Company",
            dataIndex: "company",
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
            dataIndex: "customer",
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
              <span>
                {status === "Done" && <Tag className="tagz" color="green">Done</Tag>}
                {status === "Checking" && <Tag className="tagz" color="gold">Checking</Tag>}
                {status === "New" && <Tag className="tagz" color="blue">New</Tag>}
              </span>
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
            ellipsis: {
              showTitle: false,
            },
          },
          {
            title: "Actions",
            dataIndex: "action",
            width: "8%",
            render: (text, record) => {
              return (
                <div>
                  {role === "Checker" ? (
                    <Space>
                      {record.status === "New" && (
                        <Button
                          style={{ background: "#595959" }}
                          onClick={() => statusClick(record)}
                        >
                          Assign
                        </Button>
                      )}
                      {record.status === "Checking" &&
                        !!admin_id &&
                        record.in_charge?.id === admin_id && (
                          <Button
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
                          if (shouldDelete && record?.id !== undefined) {
                            taskController.deleteTaskController(record?.id);
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
        size="small"
        scroll={{ x: "calc(800px + 40%)" }}
        rowClassName={rowClassName}
        pagination={isMobile ? undefined : false}
        loading={isLoading}
      />
    </div>
  );
};

export default TaskTable;
