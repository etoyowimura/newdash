import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskOne } from "../../Hooks/Tasks";
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
  Upload,
} from "antd";
import { taskController } from "../../API/LayoutApi/tasks";
import {
  FormOutlined,
  LinkOutlined,
  InfoCircleOutlined,
  InboxOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { useServiceData } from "../../Hooks/Services";
import { companyController } from "../../API/LayoutApi/companies";
import { customerController } from "../../API/LayoutApi/customers";
import Table, { ColumnsType } from "antd/es/table";
import { useTeamData } from "../../Hooks/Teams";
import { serviceController } from "../../API/LayoutApi/services";
import { Switch } from "antd";
import moment from "moment";

const { Option } = Select;
const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};
type MyObjectType = {
  [key: string | number]: any;
};
const TaskEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useTaskOne(id);
  const onSubmit = async (value: any) => {
    await taskController.taskPatch(value, id);
    refetch();
    navigate(-1);
    document.location.replace("/");
  };
  const isSuper = localStorage.getItem("isSuperUser");
  const admin_id = localStorage.getItem("admin_id");
  const [companyId, setCompanyId] = useState<any>(null);
  const [companyValue, setCompanyValue] = useState<any>();
  const [serviceValue, setServiceValue] = useState<any>();
  const [companyData, setCompanyData] = useState<MyObjectType>();
  const [customerId, setCustomerId] = useState<any>(null);
  const [serviceId, setServiceId] = useState<any>(null);
  const [customerValue, setCustomerValue] = useState<any>();
  const [customerData, setCustomerData] = useState<MyObjectType>();
  const [serviceData, setServiceData] = useState<MyObjectType>();
  useEffect(() => {
    if (data) {
      if (data.company_id === null) {
        setCompanyId(null);
      }
      if (data.customer_id === null) {
        setCustomerId(null);
      }
      if (data.service_id === null) {
        setServiceId(null);
      }
      const companyIdFromData = data.company_id;
      const customerIdFromData = data.customer_id;
      const serviceIdFromData = data.service_id;
      setCompanyId(companyIdFromData);
      setCustomerId(customerIdFromData);
      setServiceId(serviceIdFromData);
    }
  }, [data]);
  useEffect(() => {
    if (companyId !== null) {
      companyController.companyOne(companyId).then((CompanyData) => {
        setCompanyData(CompanyData);
      });
    }
  }, [companyId]);
  useEffect(() => {
    if (customerId !== null) {
      customerController.customerOne(customerId).then((CustomerData) => {
        setCustomerData(CustomerData);
      });
    }
  }, [customerId]);
  useEffect(() => {
    if (serviceId !== null) {
      serviceController.serviceOne(serviceId).then((data) => {
        setServiceData(data);
      });
    }
  }, [serviceId]);

  useEffect(() => {
    if (companyData && companyData.name) {
      setCompanyValue(companyData.name);
    }
  }, [companyData]);
  useEffect(() => {
    if (customerData && customerData.name) {
      setCustomerValue(customerData.name);
    }
  }, [customerData]);
  useEffect(() => {
    if (serviceData && serviceData.title) {
      setServiceValue(serviceData.title);
    }
  }, [serviceData]);

  const ServiceData = useServiceData("");
  const ServiceOption: { label: string; value: any }[] | undefined =
    ServiceData?.data?.data?.map((item: { title: string; id: string }) => ({
      label: item?.title,
      value: item?.id,
    }));

  const [teamId, setTeamId] = useState<any>(data?.name);
  const TeamData = useTeamData("");
  const TeamOption: { label: string; value: any }[] | undefined =
    TeamData?.data?.data?.map((item: { name: string; id: string }) => ({
      label: item?.name,
      value: item?.id,
    }));

  const handleClickDelete = (id: any) => {
    if (id !== undefined) {
      taskController.deleteAttachmentController(id).then((e: any) => {
        refetch();
      });
    }
    refetch();
  };
  const [historyData, setHistoryData] = useState<any>();

  useEffect(() => {
    taskController.getHistory(id).then((data) => {
      setHistoryData(data);
    });
  }, [id]);

  interface DataType {
    admin: string;
    action: string;
    description: string;
    timestamp: string;
    key: React.Key;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];
  const [inCharge, setInChage] = useState<any>();
  const [adminData, setAdminData] = useState<any>([]);
  const [superData, setSuperData] = useState<any>([]);
  useEffect(() => {
    if (data?.in_charge_id) {
      setInChage(data.in_charge_id);
    }
    data?.attachment_set.map((item: any) => {
      if (item.uploaded_by == data.in_charge_id) {
        setAdminData((prevAdminData: any) => [...prevAdminData, item]);
      } else {
        setSuperData((prevSuperData: any) => [...prevSuperData, item]);
      }
    });
  }, [data]);
  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?"
    );
    if (shouldDelete && id !== undefined) {
      taskController.deleteTaskController(id).then((data: any) => {
        document.location.replace(`/`);
      });
    }
  };

  const [fileIds, setFileIds] = useState([]);
  const [imgname, setImgname] = useState<any>([]);
  function handlePaste(event: any) {
    // Обработка вставки из буфера обмена
    const clipboardData = event.clipboardData || window.Clipboard;
    if (clipboardData && clipboardData.items.length > 0) {
      const clipboardItem = clipboardData.items[0];
      if (clipboardItem.kind === "file") {
        const file = clipboardItem.getAsFile();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("task_id", id);
        taskController
          .addTaskFile(formData)
          .then((response) => {
            const fileId = response.id;
            const n = [response.file];
            setImgname((prev: any) => [...prev, ...n]);
            setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
          })
          .catch((error) => {
            // Обработка ошибки при вставке из буфера обмена
          });
      }
    }
  }

  const handleDownload = (item: any) => {
    const link = document.createElement("a");
    link.href = item.file_path;
    link.download = item.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {isSuper === "true" || inCharge == admin_id || inCharge == null ? (
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
                          name="newBasic"
                          layout="vertical"
                          wrapperCol={{ span: 16 }}
                          initialValues={{ ...data }}
                          autoComplete="off"
                        >
                          <Row gutter={[16, 10]}>
                            {companyId !== null && (
                              <Col span={6}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Company"
                                >
                                  {companyValue !== undefined && (
                                    <Input
                                      defaultValue={companyValue}
                                      readOnly
                                    />
                                  )}
                                </Form.Item>
                              </Col>
                            )}
                            {customerId !== null && (
                              <Col span={6}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Customer"
                                >
                                  {customerValue !== undefined && (
                                    <Input
                                      defaultValue={customerValue}
                                      readOnly
                                    />
                                  )}
                                </Form.Item>
                              </Col>
                            )}
                          </Row>
                        </Form>
                        <Form
                          name="basic"
                          layout="vertical"
                          wrapperCol={{ span: 16 }}
                          initialValues={{ ...data }}
                          onFinish={onSubmit}
                          autoComplete="off"
                        >
                          <Row gutter={[16, 10]}>
                            {isSuper !== "false" && (
                              <Col span={8}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Service"
                                  name="service_id"
                                >
                                  <Select
                                    onChange={(value: any) =>
                                      setServiceId(value)
                                    }
                                    options={ServiceOption}
                                    value={serviceId}
                                  />
                                </Form.Item>
                              </Col>
                            )}
                            {isSuper === "false" && (
                              <Col span={8}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Service"
                                >
                                  {serviceValue !== undefined && (
                                    <Input
                                      defaultValue={serviceValue}
                                      readOnly
                                    />
                                  )}
                                </Form.Item>
                              </Col>
                            )}
                            {isSuper !== "false" && (
                              <Col span={4}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Assigned to"
                                  name="assigned_to_id"
                                >
                                  <Select
                                    onChange={(value: any) => setTeamId(value)}
                                    options={TeamOption}
                                    value={teamId}
                                  />
                                </Form.Item>
                              </Col>
                            )}
                          </Row>
                          <Row gutter={[16, 10]}>
                            <Col span={4}>
                              <Form.Item
                                wrapperCol={{ span: "100%" }}
                                label="Note"
                                name="note"
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                wrapperCol={{ span: "100%" }}
                                label="Status"
                                name="status"
                              >
                                <Select style={{ width: 120 }}>
                                  <Option value="New">New</Option>
                                  <Option value="Checking">Checking</Option>
                                  <Option value="Done">Done</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item
                                wrapperCol={{ span: "100%" }}
                                label="PTI"
                                name="pti"
                              >
                                <Switch defaultChecked={data?.pti} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item>
                            {isSuper !== "false" && (
                              <Button
                                type="primary"
                                danger
                                onClick={ClickDelete}
                              >
                                Delete
                              </Button>
                            )}
                            <Button
                              style={{ margin: 10 }}
                              type="primary"
                              htmlType="submit"
                            >
                              Save
                            </Button>
                          </Form.Item>
                        </Form>
                      </Space>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <LinkOutlined />
                          ATTACHMENTS
                        </span>
                      }
                      key="2"
                    >
                      <div onPaste={(event) => handlePaste(event)}>
                        <Row gutter={[18, 10]}>
                          <Col span={12}>
                            <Space
                              direction="vertical"
                              size="middle"
                              style={{ display: "flex" }}
                            >
                              <Form
                                name="basicFuck"
                                layout="vertical"
                                wrapperCol={{ span: 16 }}
                                initialValues={{ ...data.attachment_set[0] }}
                                autoComplete="off"
                                onFinish={onSubmit}
                              >
                                <Form.Item wrapperCol={{ span: "100%" }}>
                                  {superData.map((item: any) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "rgb(239 239 239)",
                                        padding: 15,
                                        borderRadius: 8,
                                        marginBottom: 20,
                                      }}
                                      key={item.id}
                                    >
                                      <a
                                        style={{
                                          width: "20%",
                                          display: "flex",
                                          alignItems: "center",
                                          alignSelf: "center",
                                        }}
                                        href={item.file_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={item.file_path}
                                          alt="Image Preview"
                                          style={{ width: "100%" }}
                                        />
                                      </a>
                                      <div
                                        className=""
                                        style={{ width: "20%" }}
                                      >
                                        <Button
                                          type="primary"
                                          onClick={() => handleDownload(item)}
                                          icon={<DownloadOutlined />}
                                        ></Button>
                                        <Button
                                          onClick={() =>
                                            handleClickDelete(item.id)
                                          }
                                          type="primary"
                                          danger
                                          icon={<DeleteOutlined />}
                                        ></Button>
                                      </div>
                                    </div>
                                  ))}
                                </Form.Item>
                              </Form>
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space
                              direction="vertical"
                              size="middle"
                              style={{ display: "flex" }}
                            >
                              <Form
                                name="basicFuck"
                                layout="vertical"
                                wrapperCol={{ span: 16 }}
                                initialValues={{ ...data.attachment_set[0] }}
                                autoComplete="off"
                                onFinish={onSubmit}
                              >
                                <Form.Item wrapperCol={{ span: "100%" }}>
                                  {adminData.map((item: any) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "rgb(239 239 239)",
                                        padding: 15,
                                        borderRadius: 8,
                                        marginBottom: 20,
                                      }}
                                      key={item.id}
                                    >
                                      <a
                                        style={{
                                          width: "20%",
                                          display: "flex",
                                          alignItems: "center",
                                          alignSelf: "center",
                                        }}
                                        href={item.file_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={item.file_path}
                                          alt="Image Preview"
                                          style={{ width: "100%" }}
                                        />
                                      </a>
                                      <div
                                        className=""
                                        // style={{ width: "20%" }}
                                      >
                                        <Button
                                          type="primary"
                                          onClick={() => handleDownload(item)}
                                          icon={<DownloadOutlined />}
                                        ></Button>
                                        <Button
                                          style={{ marginLeft: 20 }}
                                          onClick={() =>
                                            handleClickDelete(item.id)
                                          }
                                          type="primary"
                                          danger
                                          icon={<DeleteOutlined />}
                                        ></Button>
                                      </div>
                                    </div>
                                  ))}
                                </Form.Item>
                              </Form>
                            </Space>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col span={18}>
                            <Form.Item label="" name="attachment">
                              <Upload.Dragger
                                name="file"
                                customRequest={({ file, onSuccess }: any) => {
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  formData.append("task_id", id);
                                  taskController
                                    .addTaskFile(formData)
                                    .then(() => {
                                      onSuccess();
                                      refetch();
                                    });
                                }}
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                  Support for a single or bulk upload. Strictly
                                  prohibited from uploading company data or
                                  other banned files.
                                </p>
                              </Upload.Dragger>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </Form.Item>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <InfoCircleOutlined />
                          History
                        </span>
                      }
                      key="3"
                    >
                      <Table
                        dataSource={historyData?.map((u: any): DataType => {
                          let createCr = u.timestamp;
                          const obj: DataType = {
                            admin: u?.admin,
                            action: u?.action,
                            description: u?.description,
                            timestamp: createCr
                              ? moment(createCr).format("DD.MM.YYYY, HH:mm")
                              : "",
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
      ) : (
        <div>
          <Spin size="large" spinning={!data}></Spin>
        </div>
      )}
    </div>
  );
};

export default TaskEdit;
