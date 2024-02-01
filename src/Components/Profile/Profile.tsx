import { useEffect, useState } from "react";
import { TProfilePutParams, prof } from "../../API/LayoutApi/profile";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Link } from "react-router-dom";
import {
  useMyHistoryData,
  useMystatsData,
  useProfData,
} from "../../Hooks/Profile";
import { role, timeZone } from "../../App";
import LineStat from "../Statistics/LineStat";

const { Option } = Select;

const Profile = () => {
  const { data: profData, refetch: profRefetch } = useProfData();
  const [range, setRange] = useState<any>(15);

  const onSubmit = async (value: TProfilePutParams) => {
    await prof.profPatch(value);
    profRefetch();
  };
  const [date, setDate] = useState();
  useEffect(() => {
    const moment = require("moment-timezone");
    const nowUtcPlus5 = moment.tz(timeZone);
    const formattedTimeMinusFiveSeconds = nowUtcPlus5
      .subtract(range, "days")
      .format("YYYY-MM-DDTHH:mm:ss");
    setDate(formattedTimeMinusFiveSeconds);
  }, [range]);
  const { data: historyData, isLoading: loadHistory } = useMyHistoryData({
    start_date: date,
  });

  const ChangePass = async (value: any) => {
    await prof.changePass(value);
    profRefetch();
  };


  const { RangePicker } = DatePicker;
  const moment = require("moment");
  const currentDate = moment();
  const start_date = `${currentDate.format("YYYY-MM")}-01 00:00:00`;
  const [startDate, setStartDate] = useState(start_date);
  const [endDate, setEndDate] = useState<string|undefined>(undefined);
  const datePick = (a: any, b: any) => {
    if (b[0] && b[1]) {
      setStartDate(`${b[0]}T00:00:00`);
      setEndDate(`${b[1]}T23:59:59`);
    }
  };

  const { data: lineData } = useMystatsData({ start_date: startDate, end_date: endDate, });

  return (
    <Tabs>
      <TabPane tab={<span>Statistics</span>} key="1">
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <RangePicker onCalendarChange={datePick} />
        </div>
        <div style={{ display: "flex", width: "100%", height: "70vh" }}>
          <div
            style={{
              marginBottom: 50,
              marginTop: 20,
              marginLeft: 30,
              width: "20%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <p className="card_stat">
              Average: <span>{lineData?.avg_stats_for_period} </span>pts/day
            </p>
            <p className="card_stat">
              Total: <span>{lineData?.total_for_period} </span>pts
            </p>
            <p className="card_stat">
              Contribution: <span>{lineData?.contribution}</span>%
            </p>
          </div>
          <div style={{ width: "90%", height: "100%", marginTop: 20, display:"flex", alignItems: "center", justifyContent: "space-around" }}>
            <LineStat data={lineData} />
          </div>
        </div>
      </TabPane>
      <TabPane tab={<span>Account</span>} key="2">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {profData !== undefined && (
            <Form
              name="basic"
              layout="vertical"
              wrapperCol={{ span: 16 }}
              initialValues={{ ...profData }}
              autoComplete="off"
              onFinish={onSubmit}
            >
              <Row gutter={[16, 10]}>
                <Col xs={4}>
                  <Form.Item
                    wrapperCol={{ span: "100%" }}
                    label="First name"
                    name="first_name"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    wrapperCol={{ span: "100%" }}
                    label="Last name"
                    name="last_name"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col xs={4}>
                  <Form.Item
                    wrapperCol={{ span: "100%" }}
                    label="E-mail"
                    name="email"
                    rules={[{ type: "email" }]}
                  >
                    <Input type="e-mail" />
                  </Form.Item>
                </Col> */}
                <Col xs={4}>
                  <Form.Item
                    wrapperCol={{ span: "100%" }}
                    label="Username"
                    name="username"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={2}>
                  <Form.Item>
                    <Button type="primary" size="middle" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Space>
      </TabPane>
      <TabPane tab={<span>History</span>} key="3">
        <Select
          style={{ width: "20%", marginBottom: 10 }}
          placeholder="1 day"
          onChange={(value: any) => (value ? setRange(value) : setRange("1"))}
          allowClear
        >
          <Option value="3">3 days</Option>
          <Option value="7">a week</Option>
          <Option value="30">a month</Option>
        </Select>
        {historyData && (
          <Table
            loading={loadHistory}
            dataSource={historyData?.map((u, i) => ({
              no: i + 1,
              task: { id: u.task },
              action: u?.action,
              description:
                role === "Checker"
                  ? "You finished this task and earned another 5 points!"
                  : `You ${u?.description.slice(
                      u?.description.indexOf(" ") + 1
                    )}`,
              timestamp: u.timestamp
                ? moment(u.timestamp).format("DD.MM.YYYY, HH:mm")
                : "",
              key: u.id,
            }))}
            columns={[
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
                render: ({ id }: { id: number }) => (
                  <Link to={`/tasks/${id}`}>Task #{id}</Link>
                ),
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
            ]}
          />
        )}
      </TabPane>
      <TabPane tab={<span>Access</span>} key="4">
        <Form
          layout="horizontal"
          name="Changing_Password"
          initialValues={{ modifier: "public" }}
          onFinish={ChangePass}
        >
          <Row gutter={[16, 10]}>
            <Col span={10}>
              <Form.Item
                label="Old Password"
                name="old_password"
                rules={[{ required: true, message: "Your old password!" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 10]}>
            <Col span={10}>
              <Form.Item
                name="new_password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 10]}>
            <Col span={10}>
              <Form.Item
                name="password_confirm"
                label="Confirm Password"
                dependencies={["new_password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <Form.Item>
                <Button type="primary" size="middle" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default Profile;
