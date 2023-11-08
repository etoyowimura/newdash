import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskHistory, useTaskOne } from "../../Hooks/Tasks";
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
import { useServiceData, useServiceOne } from "../../Hooks/Services";
import Table from "antd/es/table";
import { useTeamData } from "../../Hooks/Teams";
import { Switch } from "antd";
import moment from "moment";
import { useCompanyOne } from "../../Hooks/Companies";
import { useCustomerOne } from "../../Hooks/Customers";
import { AttachmentSet } from "../../types/Tasks/TTasks";

const { Option } = Select;
const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};

const TaskEdit = () => {
  const [inCharge, setInChage] = useState<any>();
  const [adminData, setAdminData] = useState<AttachmentSet[]>([]);
  const [superData, setSuperData] = useState<AttachmentSet[]>([]);

  const navigate = useNavigate();
  const { id } = useParams<params>();
  const { data, refetch, status } = useTaskOne(id);

  const isSuper = localStorage.getItem("isSuperUser");
  const admin_id = localStorage.getItem("admin_id");

  const companyData = useCompanyOne(data?.company_id);
  const customerData = useCustomerOne(data?.customer_id);
  const serviceData = useServiceOne(data?.service_id);

  const ServiceData = useServiceData();
  const TeamData = useTeamData("");
  const historyData = useTaskHistory(id);

  useEffect(() => {
    if (data?.in_charge_id) {
      setInChage(data.in_charge_id);
    }
    setAdminData([]);
    setSuperData([]);
    data?.attachment_set?.map((item) => {
      if (item.uploaded_by == data.in_charge_id) {
        setAdminData((prev) => [...prev, item]);
      } else {
        setSuperData((prev) => [...prev, item]);
      }
    });
  }, [data]);

  const onSubmit = async (value: any) => {
    await taskController.taskPatch(value, id);
    refetch();
    navigate(-1);
    // document.location.replace("/");
  };
  const handleClickDelete = (id: any) => {
    if (id !== undefined) {
      taskController.deleteAttachmentController(id).then((e: any) => {
        refetch();
      });
    }
  };
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
    const clipboardData = event.clipboardData || window.Clipboard;
    if (clipboardData && clipboardData.items.length > 0) {
      const clipboardItem = clipboardData.items[0];
      if (clipboardItem.kind === "file") {
        const file = clipboardItem.getAsFile();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("task_id", id);
        taskController.addTaskFile(formData).then((response) => {
          const fileId = response.id;
          const n = [response.file];
          setImgname((prev: any) => [...prev, ...n]);
          setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
          refetch();
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
                            {companyData?.data && (
                              <Col span={6}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Company"
                                >
                                  <Input
                                    defaultValue={companyData?.data?.name}
                                    readOnly
                                  />
                                </Form.Item>
                              </Col>
                            )}
                            {customerData?.data && (
                              <Col span={6}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Customer"
                                >
                                  <Input
                                    defaultValue={customerData?.data?.name}
                                    readOnly
                                  />
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
                            {isSuper !== "false" && ServiceData?.data && (
                              <Col span={8}>
                                <Form.Item
                                  wrapperCol={{ span: "100%" }}
                                  label="Service"
                                  name="service_id"
                                >
                                  <Select
                                    options={ServiceData?.data?.map((item) => ({
                                      label: item?.title,
                                      value: item?.id,
                                    }))}
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
                                  {serviceData?.data && (
                                    <Input
                                      defaultValue={serviceData?.data?.title}
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
                                initialValues={{ ...data?.attachment_set?.[0] }}
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
                                initialValues={{ ...data?.attachment_set?.[0] }}
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
                        dataSource={historyData?.data?.map((u, i) => ({
                          ...u,
                          no: i + 1,
                          timestamp: moment(u?.timestamp).format(
                            "DD.MM.YYYY, HH:mm"
                          ),
                          key: u?.id,
                        }))}
                        columns={[
                          {
                            title: "Admin",
                            dataIndex: "user",
                          },
                          {
                            title: "Action",
                            dataIndex: "action",
                          },
                          {
                            title: "Description",
                            dataIndex: "description",
                          },
                          {
                            title: "Timestamp",
                            dataIndex: "timestamp",
                          },
                        ]}
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
