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
} from "antd";
import { serviceController } from "../../API/LayoutApi/services";
import { FormOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
const isSuper = localStorage.getItem("isSuperUser");
const TabPane = Tabs.TabPane;

type params = {
  readonly id: any;
};
type MyObjectType = {
  [key: string | number]: any;
};
const ServiceEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useServiceOne(id);
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await serviceController.servicePatch(value, id);
    refetch();
    document.location.replace('/#/services')
  };
  
  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту сервис?"
    );
    if (shouldDelete && id !== undefined) {
      serviceController.deleteServiceController(id).then((data: any) => {
        document.location.replace(`/#/services`);
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
                        {isSuper === "true" && (
                            <Button
                              onClick={() => ClickDelete()}
                              type="primary"
                              style={{marginRight: 10}}
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

export default ServiceEdit;
