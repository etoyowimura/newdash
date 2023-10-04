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
} from "antd";
import { companyController } from "../../API/LayoutApi/companies";
import { FormOutlined,DashboardOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useTeamData } from "../../Hooks/Teams";
import Table, { ColumnsType } from "antd/es/table";
import instance from "../../API/api";

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

  const [customerData, setCustomerData] = useState<any>();

  useEffect(() => {
    if(id !== undefined){
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`customers-by-company/${id}`);
          setCustomerData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNewData()
    }
  }, [id])
  console.log(customerData);
  console.log(data);
  
  interface DataType {
    name: string;
    profession: string;
    key: React.Key;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'role',
      dataIndex: 'profession',
      key: 'profession',
    },
  ]
  
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
                      dataSource={customerData?.map((u: any): DataType => {
                        const obj: DataType = {
                          name: u?.name,
                          profession: u?.profession,
                          key: u?.id,
                        };
                        return obj;
                      })}
                      columns={columns}
                    />
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
