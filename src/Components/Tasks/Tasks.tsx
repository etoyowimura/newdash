import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { Button, Input, Select, Space, message } from "antd";
import TaskTable from "./TaskTable";
import Search from "antd/es/input/Search";
import { useTeamData } from "../../Hooks/Teams";
import {
  StepForwardOutlined,
  StepBackwardOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useTasks } from "../../Hooks/Tasks";
import { TTask } from "../../types/Tasks/TTasks";
import { role } from "../../App";

const isMobile = window.innerWidth <= 768;
const { Option } = Select;
const Task = () => {
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState<TTask[] | undefined>();
  const [team, setTeam] = useState<any>();
  const [company, setCompany] = useState<string>();
  const [customer, setCustomer] = useState<string>();
  const [user, setUser] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [page, setPage] = useState<any>(1);
  const token = localStorage.getItem("access_token");

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const reconnectingMessageKey = "reconnectingMessage";
  const reconnectingMessageContent = "Reconnecting...";

  useEffect(() => {
    let reconnectingTimeout: NodeJS.Timeout | null = null;

    const handleOnlineStatus = () => {
      setIsOnline(true);
      message.success({ content: "Reconnected!" });
      if (isOnline === false) {
        message.destroy(reconnectingMessageKey);
      }
      if (reconnectingTimeout) {
        clearTimeout(reconnectingTimeout);
      }
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      if (isOnline !== false) {
        message.loading({
          content: reconnectingMessageContent,
          key: reconnectingMessageKey,
          duration: 0,
        });
        reconnectingTimeout = setTimeout(() => {
          message.destroy(reconnectingMessageKey);
        }, 30 * 60 * 1000); // 30 minutes
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
      if (reconnectingTimeout) {
        clearTimeout(reconnectingTimeout);
      }
    };
  }, [isOnline]);

  let taskSocket: WebSocket;
  interface newData {
    type: string;
    task: TTask;
  }
  const [socketData, setSocketData] = useState<newData>();
  useEffect(() => {
    const connect = async () => {
      try {
        if (!taskSocket || taskSocket.readyState === WebSocket.CLOSED) {
          taskSocket = new WebSocket(
            `ws://10.10.10.37:8000/tasks/?token=${token}`
          );
          // taskSocket = new WebSocket(
          //   `wss://api.tteld.co/tasks/?token=${token}`
          // );

          taskSocket.addEventListener("open", (event) => {
            console.log("open");
          });
          taskSocket.addEventListener("message", (event) => {
            const newData: newData = JSON.parse(event.data);
            setSocketData(newData);
            console.log(newData);
          });
          taskSocket.addEventListener("error", (errorEvent) => {
            console.error("WebSocket error:", errorEvent);
          });

          taskSocket.addEventListener("close", (event) => {
            console.log("close");
          });
        }
      } catch (err) {}
    };
    isOnline === true && connect();
  }, [isOnline]);

  useEffect(() => {
    if (
      socketData &&
      (team === undefined || team.includes(socketData.task.assigned_to.id))
    ) {
      setCharacters((prev: TTask[] | undefined) => {
        if (prev && prev?.length >= 15) {
          prev?.pop();
        }
        if (socketData.type === "task_create") {
          return [socketData.task, ...(prev || [])];
        } else if (socketData.type === "task_update") {
          if (role !== "Checker") {
            const updatedData =
              prev?.filter((b: TTask) => b.id !== socketData.task.id) || [];
            const data: TTask[] = [socketData.task, ...updatedData];
            data.sort((a: TTask, b: TTask) => {
              if (a.status === "New" && b.status === "New") {
                return 0;
              }
              if (a.status === "New") {
                return -1;
              }
              if (b.status === "New") {
                return 1;
              }
              return 0;
            });
            return data;
          } else {
            const data = (prev || []).map((b: TTask) =>
              b.id === socketData.task.id ? socketData.task : b
            );
            return data;
          }
        } else if (socketData.type === "task_delete") {
          const data = (prev || []).filter(
            (b: TTask) => b.id !== socketData.task.id
          );
          return data;
        }
        return prev;
      });
    }
  });

  const teamData = useTeamData("");
  const teamOptions: { label: string; value: any }[] | undefined =
    teamData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));

  const { data, isLoading, refetch } = useTasks({
    company,
    customer,
    user,
    status,
    team,
    page,
  });

  useEffect(() => {
    if (data) {
      setCharacters(data?.data);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [company, customer, user, status, team]);

  const showModal = () => {
    setOpen(true);
  };

  const Next = () => {
    const a = Number(page) + 1;
    setPage(a);
  };
  const Previos = () => {
    Number(page);
    if (page > 1) {
      const a = Number(page) - 1;
      setPage(a);
    }
  };

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        {open && <AddTask open={open} setOpen={setOpen} />}
        {isMobile ? (
          <Space></Space>
        ) : (
          <div
            className="search"
            style={{ display: "flex", width: "100%", marginRight: 15 }}
          >
            <Search
              style={{ marginRight: 10, width: "18%"}}
              type="text"
              placeholder="Search by Company"
              onChange={(event) => setCompany(event.target.value)}
              value={company}
              allowClear
            />
            <Search
              style={{ marginRight: 10, width: "18%" }}
              type="text"
              placeholder="Search by Customer"
              onChange={(event) => {
                setCustomer(event.target.value);
              }}
              value={customer}
              allowClear
            />
            <Search
              style={{ width: "18%" }}
              type="text"
              placeholder="Search by User"
              onChange={(event) => setUser(event.target.value)}
              value={user}
              allowClear
            />
            <Select
              style={{ width: "20%", marginLeft: 10 }}
              placeholder="status"
              onChange={(value: any) => setStatus(value)}
              mode="multiple"
            >
              <Option value="New">New</Option>
              <Option value="Checking">Checking</Option>
              <Option value="Done">Done</Option>
            </Select>
            {role !== "Checker" && (
              <Select
                mode="multiple"
                style={{ width: "20%", marginLeft: 10 }}
                placeholder="team"
                onChange={(value: any) => setTeam(value)}
                options={teamOptions}
              />
            )}
          </div>
        )}
        <Space>
          <Button
            type="primary"
            size={isMobile ? "small" : "middle"}
            onClick={() => {
              refetch();
            }}
          >
            <RedoOutlined />
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            size={isMobile ? "small" : "middle"}
            onClick={showModal}
            disabled={role === "Checker"}
          >
            Add Task
          </Button>
        </Space>
      </span>
      <TaskTable
        data={{ characters }}
        isLoading={isLoading}
        refetch={refetch}
      />
      <Space style={{ width: "100%", marginTop: 10 }} direction="vertical">
        <Space style={{ width: "100%", justifyContent: "flex-end" }} wrap>
          <Button
            type="primary"
            icon={<StepBackwardOutlined />}
            onClick={Previos}
            disabled={page === 1 ? true : false}
          ></Button>
          <Input
            style={{ width: 50, textAlign: "right" }}
            value={page}
            onChange={(e) => {
              let num = e.target.value;
              if (Number(num) && num !== "0") {
                setPage(num);
              }
            }}
          />
          <Button
            type="primary"
            icon={<StepForwardOutlined />}
            onClick={Next}
          ></Button>
        </Space>
      </Space>
    </div>
  );
};

export default Task;
