import { Button, Space, Table, Tag, Tooltip } from "antd";
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
import { timeZone } from "../../App";
import { useNavigate } from 'react-router-dom';

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
  const moment = require("moment-timezone");
  const navigate = useNavigate();

  const rowClassName = (record: TUpdate) => {
    if (record.is_pinned === true) {
      return "new-status-row";
    }
    return "";
  };

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
      navigate(`/updates/${record.id}`)
    }
  };

  return (
    <div>
      <Table
        size="middle"
        onRow={(record) => ({
          onClick: (event) => Row(record, event),
        })}
        dataSource={data?.map((u, i) => ({
          no: i + 1,
          ...u,
          created: moment(u?.created_at).tz(timeZone).format(
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
            dataIndex: "company",
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
            dataIndex: "customer",
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
            dataIndex: "provider",
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
            title: "Completed by",
            dataIndex: "executor",
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
              <span>
                {status === "Done" && <Tag color="gold">Done</Tag>}
                {status === "In Progress" && <Tag color="green">Checking</Tag>}
                {status === "New" && <Tag color="blue">New</Tag>}
                {status === "Setup" && <Tag color="red">Setup</Tag>}
                {status === "Paper" && <Tag color="cyan">Paper</Tag>}
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
