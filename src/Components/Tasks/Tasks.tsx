import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { Button, Input, Select, Space, message } from "antd";
import TaskTable from "./TaskTable";
import Search from "antd/es/input/Search";
import { useTeamData } from "../../Hooks/Teams";
import { StepForwardOutlined, StepBackwardOutlined } from "@ant-design/icons";
import { useTasks } from "../../Hooks/Tasks";

const { Option } = Select;
const isSuper = localStorage.getItem("isSuperUser");
const Task = () => {
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState<any>([]);
  const [team, setTeam] = useState<any>("");
  const [company, setCompany] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<any>(1);
  const token = localStorage.getItem("token");

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
  useEffect(() => {
    const connect = async () => {
      try {
        if (!taskSocket || taskSocket.readyState === WebSocket.CLOSED) {
          taskSocket = new WebSocket(
            `ws://10.10.10.45:8000/tasks/?token=${token}`
          );
          // taskSocket = new WebSocket(
          //   `wss://api.tteld.co/tasks/?token=${token}`
          // );

          taskSocket.addEventListener("open", (event) => {
            console.log("open");
          });
          taskSocket.addEventListener("message", (event) => {
            const newData = JSON.parse(event.data);
            setCharacters((prev: any) => {
              if (prev?.length >= 15) {
                prev?.pop();
              }
              console.log(prev);

              if (newData.type === "task_create") {
                return [newData.task, ...prev];
              } else if (newData.type === "task_update") {
                if (isSuper === "true") {
                  const updatedData = prev.filter(
                    (b: any) => b.id !== newData.task.id
                  );
                  const data = [newData.task, ...updatedData];
                  data.sort((a: any, b: any) => {
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
                  const data = prev.map((b: any) =>
                    b.id === newData.task.id ? newData.task : b
                  );
                  return data;
                }
              } else if (newData.type === "task_delete") {
                const data = prev.filter((b: any) => b.id !== newData.task.id);
                return data;
              }
              return prev;
            });
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

  const teamData = useTeamData("");
  const teamOptions: { label: string; value: any }[] | undefined =
    teamData?.data?.data.map((item: { name: string; id: string }) => ({
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
        <div
          className="search"
          style={{ display: "flex", width: "100%", marginRight: 15 }}
        >
          <Search
            style={{ marginRight: 10, width: "18%" }}
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
          {isSuper === "true" && (
            <Select
              mode="multiple"
              style={{ width: "20%", marginLeft: 10 }}
              placeholder="team"
              onChange={(value: any) => setTeam(value)}
              options={teamOptions}
            />
          )}
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Task
        </Button>
      </span>
      <TaskTable
        data={{ data: characters, page_size: 15 }}
        isLoading={isLoading}
        refetch={refetch}
      />
      <Space style={{ width: "100%", marginTop: 10 }} direction="vertical">
        <Space style={{ width: "100%", justifyContent: "flex-end" }} wrap>
          <Button
            type="primary"
            icon={<StepBackwardOutlined />}
            onClick={Previos}
          ></Button>
          <Input
            style={{ width: 50, textAlign: "right" }}
            value={page}
            onChange={(e) => {
              let num = e.target.value;
              if(Number(num) && num !== '0'){
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
