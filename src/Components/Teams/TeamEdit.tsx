import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeamOne } from "../../Hooks/Teams";
import {
  Form,
  Spin,
  Watermark,
  Space,
  Tabs,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "antd";
import { teamController } from "../../API/LayoutApi/teams";
import { FormOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { role } from "../../App";
import { useUserData } from "../../Hooks/Users";
import AddUserToTeam from "./AddUserToTeam";
const TabPane = Tabs.TabPane;

type params = {
  readonly id: any;
};

type MyObjectType = {
  [key: string | number]: any;
};
const TeamEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useTeamOne(id);
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await teamController.teamPatch(value, id);
    refetch();
    navigate(-1);
  };

  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту команду?"
    );
    if (shouldDelete && id !== undefined) {
      teamController.deleteTeamController(id).then((data: any) => {
        navigate(-1);
      });
    }
  };

  const userData = useUserData({ name: '', team: id });

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <Spin size="large" spinning={!data}>
        <Watermark style={{ height: "100%" }}>
          {status === "loading" ? (
            <Spin size="large" spinning={!data} />
          ) : data ? (
            <Spin size="large" spinning={!data}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={
                      <span>
                        <FormOutlined />
                        MAIN FIELDS
                      </span>
                    }
                    key="1"
                  >
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: "flex" }}
                    >
                      <Form
                        name="basic"
                        layout="vertical"
                        wrapperCol={{ span: 16 }}
                        initialValues={{ ...data }}
                        onFinish={onSubmit}
                        autoComplete="off"
                      >
                        <Row gutter={[16, 10]}>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Name"
                              name="name"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item>
                          {role !== "Checker" && (
                            <Button
                              onClick={() => ClickDelete()}
                              type="primary"
                              style={{ marginRight: 10 }}
                              danger
                            >
                              Delete
                            </Button>
                          )}
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Space>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <FormOutlined />
                        Users
                      </span>
                    }
                    key="2"
                  >
                    <Table
                      dataSource={userData?.data?.map((item, i) => ({
                        no: i + 1,
                        ...item,
                      }))}
                      columns={[
                        {
                          title: "No",
                          dataIndex: "no",
                        },
                        {
                          title: "Username",
                          dataIndex: "username",
                        },
                        {
                          title: "First name",
                          dataIndex: "first_name",
                        },
                        {
                          title: "Last name",
                          dataIndex: "last_name",
                        },
                      ]}
                    />
                    <AddUserToTeam team={id} refetch={refetch} open={open} setOpen={setOpen} />
                    <Button
                      type="primary"
                      style={{ marginLeft: "auto" }}
                      size={"large"}
                      onClick={showModal}
                    >
                      Add User
                    </Button>
                  </TabPane>
                </Tabs>
              </Space>
            </Spin>
          ) : (
            <Notfound />
          )}
        </Watermark>
      </Spin>
    </div>
  );
};

export default TeamEdit;
