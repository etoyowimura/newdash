import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyOne } from "../../Hooks/Companies";
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
import { companyController } from "../../API/LayoutApi/companies";
import { AppleOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useTeamData } from "../../Hooks/Teams";

const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};

type MyObjectType = {
  [key: string | number]: any; 
};
const CompanyEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useCompanyOne(id);
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await companyController.companyPatch(value, id);
    refetch();
    navigate(-1);
  };

  const [teamId, setTeamId] = useState<any>(data?.name);
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
                        <AppleOutlined />
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
                              label="name"
                              name="name"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="owner"
                              name="owner"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="team_id"
                              name="team_id"
                            >
                              <Select
                                onChange={(value: any) => setTeamId(value)}
                                options={TeamOption}
                                value={teamId}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[16, 10]}>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="is_active"
                              name="is_active"
                            >
                              <Switch defaultChecked={data?.is_active} />
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

export default CompanyEdit;
