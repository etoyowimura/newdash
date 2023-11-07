import React, { useEffect, useState } from "react";
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
  Tag,
} from "antd";
import { companyController } from "../../API/LayoutApi/companies";
import { FormOutlined, DashboardOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useTeamData } from "../../Hooks/Teams";
import Table, { ColumnsType } from "antd/es/table";
import instance from "../../API/api";
import AddDriver from "./AddDriver";

const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};
const isSuper = localStorage.getItem("isSuperUser");
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
    TeamData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    })); 

  const [customerData, setCustomerData] = useState<any>();

  useEffect(() => {
    if (id !== undefined) {
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`customers-by-company/${id}`);
          setCustomerData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNewData();
    }
  }, [id]);

  interface DataType {
    no: number | string;
    name: string;
    id: number;
    profession: string;
    is_active: boolean;
    key: React.Key;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Is Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (tag: boolean) => (
        <Tag color={tag ? "geekblue" : "red"}>{tag ? "True" : "False"}</Tag>
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
  ];
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту компанию?"
    );
    if (shouldDelete && id !== undefined) {
      companyController.deleteCompanyController(id).then((data: any) => {
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
                          <Col span={6}>
                            <Form.Item
                              wrapperCol={{ span: "100%" }}
                              label="Team"
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
                              style={{marginRight: 10}}
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
                      dataSource={customerData?.map(
                        (u: any, i: number): DataType => {
                          const obj: DataType = {
                            no: i + 1,
                            id: u?.id,
                            name: u?.name,
                            is_active: u?.is_active,
                            profession: u?.profession,
                            key: u?.id,
                          };
                          return obj;
                        }
                      )}
                      columns={columns}
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
