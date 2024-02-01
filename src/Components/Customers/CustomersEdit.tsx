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
} from "antd";
import { customerController } from "../../API/LayoutApi/customers";
import { FormOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useCompanyOne } from "../../Hooks/Companies";
import { role } from "../../App";

const TabPane = Tabs.TabPane;

type params = {
  readonly id: any;
};

const CustomerEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status } = useCustomerOne(id);
  let navigate = useNavigate();
  const onSubmit = async (value: any) => {
    await customerController.customerPatch(value, id);
    refetch();
    window.location.replace('/#/customers/')
  };

  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить этот customer?"
    );
    if (shouldDelete && id !== undefined) {
      customerController.deleteCustomerController(id).then((data: any) => {
        navigate(-1)
      });
    }
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
                              name='company'
                            >
                              <Input readOnly />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item>
                          {(role === "Tech Support" || "Owner") && (
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
