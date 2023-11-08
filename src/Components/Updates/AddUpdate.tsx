import { Input, Modal, Form as FormAnt, Select, Upload } from "antd";
import { updateController } from "../../API/LayoutApi/update";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { taskController } from "../../API/LayoutApi/tasks";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerByComanyData } from "../../Hooks/Customers";
const { Option } = Select;
const AddUpdate = ({
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
  const [customerName, setCustomerName] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>();

  const companyData = useCompanyData({ name: companyName });
  const customerData = useCustomerByComanyData({
    id: companyId,
    name: customerName,
  });


  const [imgname, setImgname] = useState<any>([]);
  function handlePaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    if (clipboardData && clipboardData.items.length > 0) {
      const clipboardItem = clipboardData.items[0];
      if (clipboardItem.kind === "file") {
        const file = clipboardItem.getAsFile();
        const formData = new FormData();
        formData.append("file", file);
        taskController
          .addTaskFile(formData)
          .then((response) => {
            const fileId = response.id;
            const n = [response.file];
            setImgname((prev: any) => [...prev, ...n]);
            setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
            const updatedValues = form.getFieldsValue();
            updatedValues.attachment_ids = [
              ...updatedValues.attachment_ids,
              fileId,
            ];
            form.setFieldsValue(updatedValues);
          })
      }
    }
  }

  return (
    <div onPaste={(event) => handlePaste(event)}>
      <Modal
        open={open}
        title="Add update"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form.validateFields().then(async (values) => {
            const updatedValues = { ...values };
            updatedValues.attachment_ids = fileIds;
            form.resetFields();
            await updateController.addUpdateController(updatedValues);
            setOpen(!open);
            window.location.reload();
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
              options={companyData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
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
              options={customerData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
              value={customerName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Note"
            name="note"
            rules={[{ required: true, message: "Make note!" }]}
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
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
              <Option value="Paper">Paper</Option>
              <Option value="Setup">Setup</Option>
            </Select>
          </FormAnt.Item>
        </FormAnt>
        <FormAnt>
          <FormAnt.Item label="File" name="attachment">
            <Upload.Dragger
              name="file"
              multiple={true}
              customRequest={({ file, onSuccess }: any) => {
                const formData = new FormData();
                formData.append("file", file);
                taskController
                  .addTaskFile(formData)
                  .then((response) => {
                    const fileId = response.id;
                    setFileIds((prevFileIds): any => [...prevFileIds, fileId]);
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
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
            <p>{imgname.join(",\n")}</p>
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddUpdate;
