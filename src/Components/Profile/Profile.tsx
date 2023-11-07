import { useEffect, useState } from "react";
import { TProfilePutParams, prof } from "../../API/LayoutApi/profile";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Watermark,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import instance from "../../API/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useMystatsData, useProfData } from "../../Hooks/Profile";
const { Option } = Select;
interface historySource {
  no: number;
  task: { id: number };
  action: string;
  description: string;
  timestamp: string;
  key: React.Key;
}

const Profile = () => {
  const { data, refetch } = useProfData();
  const statsData = useMystatsData();
  const [range, setRange] = useState<any>(1);

  const onSubmit = async (value: TProfilePutParams) => {
    await prof.profPatch(value)
    refetch()
  };

  const isSuper = localStorage.getItem("isSuperUser");

  const [historyData, setHistoryData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const moment = require("moment-timezone");
      const nowUtcPlus5 = moment.tz("Asia/Tashkent");
      const formattedTimeMinusFiveSeconds = nowUtcPlus5
        .subtract(range, "days")
        .format("YYYY-MM-DDTHH:mm:ss");
      try {
        const { data }: any = await instance(
          `my-task-history/?start_date=${formattedTimeMinusFiveSeconds}`
        );
        setHistoryData(data);
      } catch (error) {}
    };
    fetchData();
  }, [range]);

  const columns: object[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: ({ id }: { id: number }) => <Link to={`/${id}`}>{id}</Link>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

  return (
    <div>
      <Spin size="large" spinning={!data && !statsData}>
        <Watermark style={{ height: "100%" }}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Tabs>
              <TabPane tab={<span>Main fields</span>} key="1">
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  {data !== undefined && (
                    <Form
                      name="basic"
                      layout="vertical"
                      wrapperCol={{ span: 16 }}
                      initialValues={{ ...data }}
                      autoComplete="off"
                      onFinish={onSubmit}
                    >
                      <Row gutter={[16, 10]}>
                        <Col span={6}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="First name"
                            name="first_name"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="Last name"
                            name="last_name"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="Username"
                            name="username"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                  {data !== undefined && (
                    <Form
                      name="basic"
                      layout="vertical"
                      wrapperCol={{ span: 16 }}
                      initialValues={{ ...data }}
                      autoComplete="off"
                    >
                      <Row gutter={[16, 10]}>
                        {data && data.team !== "" && (
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Team"
                              name="team"
                            >
                              <Input readOnly />
                            </Form.Item>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  )}
                  {statsData && statsData.data !== undefined && (
                    <Form
                      name="basic"
                      layout="vertical"
                      wrapperCol={{ span: 16 }}
                      initialValues={{ ...statsData.data }}
                      autoComplete="off"
                    >
                      <Row gutter={[16, 10]}>
                        <Col span={4}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="Today's points"
                            name="todays_points"
                          >
                            <Input style={{ textAlign: "right" }} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="Yesterday's"
                            name="yesterdays_points"
                          >
                            <Input style={{ textAlign: "right" }} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="This month"
                            name="current_month_points"
                          >
                            <Input style={{ textAlign: "right" }} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            wrapperCol={{ span: "100%" }}
                            label="Last month"
                            name="last_month_points"
                          >
                            <Input style={{ textAlign: "right" }} readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Space>
              </TabPane>
              <TabPane tab={<span>History</span>} key="2">
                <Select
                  style={{ width: "20%", marginBottom: 10 }}
                  placeholder="1 day"
                  onChange={(value: any) =>
                    value ? setRange(value) : setRange("1")
                  }
                  allowClear
                >
                  <Option value="3">3 days</Option>
                  <Option value="7">a week</Option>
                  <Option value="30">a month</Option>
                </Select>
                <Table
                  dataSource={historyData?.map(
                    (u: any, i: number): historySource => {
                      let createCr = u.timestamp;
                      const obj: historySource = {
                        no: i + 1,
                        task: { id: u.task },
                        action: u?.action,
                        description:
                          isSuper === "false"
                            ? "You finished this task and earned another 5 points!"
                            : `You ${u?.description.slice(
                                u?.description.indexOf(" ") + 1
                              )}`,
                        timestamp: createCr
                          ? moment(createCr).format("DD.MM.YYYY, HH:mm")
                          : "",
                        key: u.id,
                      };
                      return obj;
                    }
                  )}
                  columns={columns}
                />
                {/* {isSuper === "false" && (
                    <p>total points: {total?.total_points}</p>
                  )} */}
              </TabPane>
            </Tabs>
          </Space>
        </Watermark>
      </Spin>
    </div>
  );
};

export default Profile;
