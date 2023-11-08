import { useState } from "react";
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
  Select,
  Tag,
} from "antd";
import { companyController } from "../../API/LayoutApi/companies";
import { FormOutlined, DashboardOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useTeamData } from "../../Hooks/Teams";
import Table from "antd/es/table";
import AddDriver from "./AddDriver";
import { useCustomerByComanyData } from "../../Hooks/Customers";

const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};
const isSuper = localStorage.getItem("isSuperUser");
type MyObjectType = {
  [key: string | number]: any;
};
const CompanyEdit = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<params>();

  const TeamData = useTeamData('');
  const customerData = useCustomerByComanyData({ id: id });
  const { data, refetch, status }: MyObjectType = useCompanyOne(id);

  const showModal = () => {
    setOpen(true);
  };
  let navigate = useNavigate();

  const onSubmit = async (value: any) => {
    await companyController.companyPatch(value, id);
    refetch();
    navigate(-1);
  };

  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту компанию?"
    );
    if (shouldDelete && id !== undefined) {
      companyController.deleteCompanyController(id).then(() => {
        document.location.replace(`/#/companies`);
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
                              label="Owner"
                              name="owner"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          {TeamData?.data && (
                            <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Team"
                              name="team_id"
                            >
                              <Select
                                options={TeamData?.data?.map((item) => ({
                                  label: item?.name,
                                  value: item?.id,
                                }))}
                              />
                            </Form.Item>
                          </Col>
                          )}
                          
                        </Row>
                        <Row gutter={[16, 10]}>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="USDOT"
                              name="usdot"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="API Key"
                              name="api_key"
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
                              style={{ marginRight: 10 }}
                              danger
                            >
                              Delete
                            </Button>
                          )}
                          {isSuper === "true" && (
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          )}
                        </Form.Item>
                      </Form>
                    </Space>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <DashboardOutlined />
                        Drivers
                      </span>
                    }
                    key="2"
                  >
                    <Table
                      onRow={(record) => {
                        let isTextSelected = false;
                        document.addEventListener("selectionchange", () => {
                          const selection = window.getSelection();
                          if (
                            selection !== null &&
                            selection.toString() !== ""
                          ) {
                            isTextSelected = true;
                          } else {
                            isTextSelected = false;
                          }
                        });
                        return {
                          onClick: (event: any) => {
                            if (isTextSelected) {
                            }
                            document.location.replace(
                              `/#/customers/${record.id}`
                            );
                          },
                        };
                      }}
                      dataSource={customerData?.data?.map((u, i) => ({
                        ...u,
                        no: i + 1,
                        key: u?.id,
                      }))}
                      columns={[
                        {
                          title: "No",
                          dataIndex: "no",
                        },
                        {
                          title: "Name",
                          dataIndex: "name",
                        },
                        {
                          title: "Role",
                          dataIndex: "profession",
                        },
                        {
                          title: "Is Active",
                          dataIndex: "is_active",
                          render: (tag: boolean) => (
                            <Tag color={tag ? "geekblue" : "red"}>
                              {tag ? "True" : "False"}
                            </Tag>
                          ),
                          filters: [
                            {
                              text: "True",
                              value: true,
                            },
                            {
                              text: "False",
                              value: false,
                            },
                          ],
                          onFilter: (value: any, record: any) => {
                            return record.isActive === value;
                          },
                        },
                      ]}
                    />
                    {open && (
                      <AddDriver id={id} open={open} setOpen={setOpen} />
                    )}
                    <Button
                      type="primary"
                      style={{ marginLeft: "auto" }}
                      size={"middle"}
                      onClick={showModal}
                      disabled={isSuper === "false"}
                    >
                      Add Driver
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

export default CompanyEdit;
