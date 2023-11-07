import { Input, Modal, Form as FormAnt, Select, Upload, Switch } from "antd";
import { taskController } from "../../API/LayoutApi/tasks";
import { useEffect, useState } from "react";
import { useServiceData } from "../../Hooks/Services";
import { customerController } from "../../API/LayoutApi/customers";
import { UploadOutlined } from "@ant-design/icons";
import { useTeamData } from "../../Hooks/Teams";
import instance from "../../API/api";
const { Option } = Select;
const AddTask = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const [form] = FormAnt.useForm();

  const handleCancel = () => {
    setOpen(!open);
  };
  const [fileIds, setFileIds] = useState([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [customerName, setCustomerName] = useState<any>("");
  const [characters, setCharacters] = useState<any>([]);
  const [customerData, setCustomerData] = useState<any>([]);
  const ServiceData = useServiceData();
  const TeamData = useTeamData('');
  const [companyId, setCompanyId] = useState<any>();
  const [options, setOptions] = useState<any>();
  const [cusOptions, setCusOptions] = useState<any>();

  const ServiceOption: { label: string; value: any }[] | undefined =
    ServiceData?.data?.map((item) => ({
      label: item?.title,
      value: item?.id,
    }));

  type Data = {
    data?: {
      data: Array<any>;
      count: number | string;
    };
    isLoading?: boolean;
    refetch?: any;
    isFetching?: boolean;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: Data = await instance(`companies/?name=${companyName}`);
        setCharacters(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [companyName]);
  useEffect(() => {
    const CompanyOption: { label: string; value: any }[] | undefined =
      characters?.map((item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id,
      }));
    setOptions(CompanyOption);
  }, [characters]);

  useEffect(() => {
    if (companyId !== undefined) {
      customerController
        .customerByCompany(companyId, customerName)
        .then((data) => {
          setCustomerData(data);
        });
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId !== undefined) {
      const fetchData = async () => {
        try {
          const { data }: Data = await instance(
            `customers-by-company/${companyId}/?name=${customerName}`
          );
          setCustomerData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [customerName]);

  useEffect(() => {
    const CustomerOption: { label: string; value: any }[] | undefined =
      customerData?.map((item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id,
      }));
    setCusOptions(CustomerOption);
  }, [customerData]);
  
  const teamOptions: { label: string; value: any }[] | undefined =
    TeamData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));


const [previewImage, setPreviewImage] = useState<string | null>(null); // Состояние для предварительного просмотра

function handlePaste(event: any) {
  const clipboardData = event.clipboardData || window.Clipboard;
  if (clipboardData && clipboardData.items.length > 0) {
    const clipboardItem = clipboardData.items[0];
    if (clipboardItem.kind === "file") {
      const file = clipboardItem.getAsFile();
      const formData = new FormData();
      formData.append("file", file);
      
      // Предварительный просмотр изображения
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      taskController
        .addTaskFile(formData)
        .then((response) => {
          const fileId = response.id;
          setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
          const updatedValues = form.getFieldsValue();
          updatedValues.attachment_ids = [
            ...updatedValues.attachment_ids,
            fileId,
          ];
          form.setFieldsValue(updatedValues);
        })
        .catch((error) => {
          // Обработка ошибки при вставке из буфера обмена
        });
    }
  }
}
  return (
    <div onPaste={(event) => handlePaste(event)}>
      <Modal
        open={open}
        title="Add task"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form.validateFields().then(async (values) => {
            const updatedValues = { ...values };
            updatedValues.attachment_ids = fileIds;
            form.resetFields();
            await taskController.addTaskController(updatedValues);
            setOpen(!open);
          });
        }}
      >
        <FormAnt
          form={form}
          layout="horizontal"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <FormAnt.Item
            label="Company"
            name="company_id"
            rules={[{ required: false, message: "Please input company!" }]}
          >
            <Select
              showSearch
              placeholder="Search Company"
              onSearch={(value: any) => setCompanyName(value)}
              options={options}
              value={companyName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
              onChange={(value: any) => setCompanyId(value)}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Customer"
            name="customer_id"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search Customer"
              onSearch={(value: any) => setCustomerName(value)}
              options={cusOptions}
              value={customerName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Service"
            name="service_id"
            rules={[{ required: true, message: "Please select service!" }]}
          >
            <Select options={ServiceOption} />
          </FormAnt.Item>
          <FormAnt.Item
            label="Assigned to"
            name="assigned_to_id"
            rules={[
              { required: true, message: "Please select one of the teams!" },
            ]}
          >
            <Select options={teamOptions} />
          </FormAnt.Item>
          <FormAnt.Item
            label="Note"
            name="note"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Status"
            name="status"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Select defaultValue="New" style={{ width: 120 }}>
              <Option value="New">New</Option>
              <Option value="Checking">Checking</Option>
              <Option value="Done">Done</Option>
            </Select>
          </FormAnt.Item>
          <FormAnt.Item
            label="PTI"
            name="pti"
            rules={[
              { required: false, message: "Please input service points!" },
            ]}
          >
            <Switch />
          </FormAnt.Item>
        </FormAnt>
        <FormAnt>
          <FormAnt.Item label="File" name="attachment">
            <div >
              <Upload.Dragger
                name="file"
                multiple={true}
                onDrop={(event) => {
                  const data = event.dataTransfer.getData('File')
                }}
                customRequest={({ file, onSuccess }: any) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  taskController
                    .addTaskFile(formData)
                    .then((response) => {
                      const fileId = response.id;
                      setFileIds((prevFileIds): any => [
                        ...prevFileIds,
                        fileId,
                      ]);
                      onSuccess();
                      const updatedValues = form.getFieldsValue();
                      updatedValues.attachment_ids = [
                        ...updatedValues.attachment_ids,
                        fileId,
                      ];
                      form.setFieldsValue(updatedValues);
                    })
                    .catch((error) => {
                      onSuccess(error);
                    });
                }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ color: "#36cfc9" }} />
                </p>
                <p className="ant-upload-text" style={{ color: "#36cfc9" }}>
                  Click or drag a file here to upload
                </p>
              </Upload.Dragger>
             {previewImage && <img src={previewImage} alt="Предварительный просмотр"style={{width: 200, height:200}} />}
            </div>
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddTask;
