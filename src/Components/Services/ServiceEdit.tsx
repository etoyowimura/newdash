import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServiceOne } from "../../Hooks/Services";
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
} from "antd";
import { serviceController } from "../../API/LayoutApi/services";
import { AppleOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";

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
const ServiceEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useServiceOne(id);
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await serviceController.servicePatch(value, id);
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
                              label="title"
                              name="title"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="points"
                              name="points"
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

export default ServiceEdit;
