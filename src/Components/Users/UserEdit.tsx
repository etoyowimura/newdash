import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUserOne } from "../../Hooks/Users";
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
  Switch,
  Select,
} from "antd";
import { userController } from "../../API/LayoutApi/users";
import { FormOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useTeamData } from "../../Hooks/Teams";

const TabPane = Tabs.TabPane;

// type Data = {
//     data?: {
//         data: Array<any>,
//         count: number
//     }
// }
type params = {
  readonly id: any;
};

type MyObjectType = {
  [key: string | number]: any; // Индексная подпись с параметром типа 'string'
};
const UserEdit = () => {
  const { id } = useParams<params>();

  const { data, refetch, status }: MyObjectType = useUserOne(id);
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await userController.userPatch(value, id);
    refetch();
    navigate(-1);
  };

  const [teamId, setTeamId] = useState<any>();
  const TeamData = useTeamData(teamId);
  const TeamOption: { label: string; value: any }[] | undefined =
    TeamData?.data?.data?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id
      })
    )
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
                              label="First name"
                              name="first_name"
                            >
                              <Input readOnly/>
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Last name"
                              name="last_name"
                            >
                              <Input readOnly/>
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Username"
                              name="username"
                            >
                              <Input readOnly/>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Team"
                              name='team_id'
                            >
                              <Select
                                onChange={(value: any) => setTeamId(value)}
                                options={TeamOption}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[16, 10]}>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Is Staff"
                              name="is_staff"
                            >
                              <Switch defaultChecked={data?.is_staff} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Space>
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

export default UserEdit;
