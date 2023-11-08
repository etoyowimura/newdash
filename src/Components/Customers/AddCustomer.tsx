import { Input, Modal, Form as FormAnt, Select } from "antd";
import { customerController } from "../../API/LayoutApi/customers";
import { useState } from "react";

import { useCompanyData } from "../../Hooks/Companies";

const AddCustomer = ({
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

  const [companyName, setCompanyName] = useState<string>("");
  const { data } = useCompanyData({ name: companyName });
  

  return (
    <div>
      <Modal
        open={open}
        title="Add customer"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form.validateFields().then(async (values) => {
            form.resetFields();
            await customerController.addCustomerController(values);
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Role"
            name="profession"
            rules={[{ required: false, message: "Please input Role!" }]}
          >
            <Input defaultValue="driver" />
          </FormAnt.Item>
          <FormAnt.Item
            label="Company"
            name="company_id"
            rules={[{ required: false, message: "Please input company!" }]}
          >
            <Select
              showSearch
              placeholder="Search Company"
              onSearch={(value: any) => setCompanyName(value)}
              options={data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
              value={companyName}
              filterOption={false}
              autoClearSearchValue={false}
              allowClear
            />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddCustomer;
