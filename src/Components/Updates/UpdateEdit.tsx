import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateOne } from "../../Hooks/Update";
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
import { updateController } from "../../API/LayoutApi/update";
import { FormOutlined, UploadOutlined, LinkOutlined } from "@ant-design/icons";
import Notfound from "../../Utils/Notfound";
import { companyController } from "../../API/LayoutApi/companies";
import { customerController } from "../../API/LayoutApi/customers";
import { taskController } from "../../API/LayoutApi/tasks";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const TabPane = Tabs.TabPane;
type params = {
  readonly id: any;
};
type MyObjectType = {
  [key: string | number]: any;
};
const UpdateEdit = () => {
  const { id } = useParams<params>();
  const { data, refetch, status }: MyObjectType = useUpdateOne(id);
  const onSubmit = async (value: any) => {
    if (value.status === "Done") {
      if (value.solution !== "") {
        await updateController.updatePut(value, id);
        refetch();
        document.location.replace("/#/updates/");
      } else {
        alert("solution is empty!!!!!!!!!!!!!!!!!!!!!");
      }
    } else {
      await updateController.updatePut(value, id);
      refetch();
      document.location.replace("/#/updates/");
    }
  };
  const isSuper = localStorage.getItem("isSuperUser");
  const admin_id = localStorage.getItem("admin_id");
  const [companyId, setCompanyId] = useState<any>(null);
  const [companyValue, setCompanyValue] = useState<any>();
  const [companyData, setCompanyData] = useState<MyObjectType>();
  const [customerId, setCustomerId] = useState<any>(null);
  const [customerValue, setCustomerValue] = useState<any>();
  const [customerData, setCustomerData] = useState<MyObjectType>();
  useEffect(() => {
    if (data) {
      if (data.company_id === null) {
        setCompanyId(null);
      }
      if (data.customer_id === null) {
        setCustomerId(null);
      }
      const companyIdFromData = data.company_id;
      const customerIdFromData = data.customer_id;
      setCompanyId(companyIdFromData);
      setCustomerId(customerIdFromData);
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
    if (companyData && companyData.name) {
      setCompanyValue(companyData.name);
    }
  }, [companyData]);
  useEffect(() => {
    if (customerData && customerData.name) {
      setCustomerValue(customerData.name);
    }
  }, [customerData]);

  const handleClickDelete = (id: any) => {
    if (id !== undefined) {
      taskController.deleteAttachmentController(id);
    }
  };

  const [inCharge, setInChage] = useState<any>();
  useEffect(() => {
    if (data?.in_charge_id) {
      setInChage(data.in_charge_id);
    }
  }, [data]);

  const ClickDelete = () => {
    const shouldDelete = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?"
    );
    if (shouldDelete && id !== undefined) {
      updateController.deleteUpdateController(id).then((data: any) => {
        document.location.replace(`/#/updates/`);
      });
    }
  };

  const [sol, setSol] = useState<any>(data?.solution);

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
        formData.append("shift_update_id", id);
        taskController.addTaskFile(formData).then((response) => {
          const fileId = response.id;
          const n = [response.file];
          setImgname((prev: any) => [...prev, ...n]);
          setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
        });
      }
    }
  }

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
                            <Col span={8}>
                              <Form.Item
                                wrapperCol={{ span: "100%" }}
                                label="Note"
                                name="note"
                              >
                                <TextArea />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                wrapperCol={{ span: "100%" }}
                                label="Solution"
                                name="solution"
                              >
                                <TextArea
                                  onChange={(e) => setSol(e.target.value)}
                                />
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
                                  <Option value="In Progress">
                                    In Progress
                                  </Option>
                                  <Option value="Done">Done</Option>
                                  <Option value="Paper">Paper</Option>
                                  <Option value="Setup">Setup</Option>
                                </Select>
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
                      <div
                        onPaste={(event) => handlePaste(event)}
                        style={{ height: 800, width: 1000 }}
                      >
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
                            <Row gutter={[16, 10]}>
                              <Col span={24}>
                                <Form.Item wrapperCol={{ span: "100%" }}>
                                  {data.attachment_set.map((item: any) => (
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
                                          style={{
                                            width: "30%",
                                            maxHeight: "200px",
                                            marginRight: 20,
                                          }}
                                        />
                                        {item.file_name}
                                      </a>
                                      <Button
                                        onClick={() =>
                                          handleClickDelete(item.id)
                                        }
                                        type="primary"
                                        danger
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  ))}
                                </Form.Item>
                                <Form.Item label="File" name="attachment">
                                  <Upload.Dragger
                                    name="file"
                                    customRequest={({
                                      file,
                                      onSuccess,
                                    }: any) => {
                                      const formData = new FormData();
                                      formData.append("file", file);
                                      formData.append("shift_update_id", id);
                                      taskController
                                        .addTaskFile(formData)
                                        .then(() => {
                                          onSuccess();
                                        })
                                        .catch((error) => {
                                          onSuccess(error);
                                        });
                                    }}
                                  >
                                    <p className="ant-upload-drag-icon">
                                      <UploadOutlined
                                        style={{ color: "#b5f5ec" }}
                                      />
                                    </p>
                                    <p
                                      className="ant-upload-text"
                                      style={{ color: "#b5f5ec" }}
                                    >
                                      Click or drag file to this area to upload
                                    </p>
                                  </Upload.Dragger>
                                  <p>{imgname.join(",\n")}</p>
                                </Form.Item>
                                <Form.Item>
                                  <Button type="primary" htmlType="submit">
                                    Save
                                  </Button>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </Space>
                      </div>
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

export default UpdateEdit;
