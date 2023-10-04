import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomerOne } from "../../Hooks/Customers";
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
import { customerController } from "../../API/LayoutApi/customers";
import { FormOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useCompanyData } from "../../Hooks/Companies";

const TabPane = Tabs.TabPane;

type params = {
  readonly id: any;
};

type MyObjectType = {
  [key: string | number]: any; // Индексная подпись с параметром типа 'string'
};
const CustomerEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useCustomerOne(id);
  let navigate = useNavigate();
  const [companyId, setCompanyId] = useState<any>(data?.name);
  const CompanyData = useCompanyData(companyId);
  const CompnayOption: { label: string; value: any }[] | undefined =
    CompanyData?.data?.data?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id
      })
    )
  const onSubmit = async (value: any) => {
    await customerController.customerPatch(value, id);
    refetch();
    navigate(-1);
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
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Role"
                              name="profession"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[16, 10]}>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Company"
                              name='company_id'
                            >
                              <Select
                                onChange={(value: any) => setCompanyId(value)}
                                options={CompnayOption}
                                value={companyId}
                              />
                            </Form.Item>
                          </Col>
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

export default CustomerEdit;
