import { Input, Modal, Form as FormAnt, Select } from "antd";
import { customerController } from "../../API/LayoutApi/customers";
import { useCompanyData } from "../../Hooks/Companies";
import { useState } from "react";

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
  const [id, setId] = useState<any>();
  const CompanyData = useCompanyData(id)
  const CompanyOption: { label: string; value: any }[] | undefined =
  CompanyData?.data?.data?.map(
      (item: { name: string; id: string }) => ({
        label: item?.name,
        value: item?.id,
      })
    );

  return (
    <div>
      <Modal
        open={open}
        title="Add customer"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await customerController.addCustomerController(values);
              setOpen(!open);
            })
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
            rules={[
              { required: true, message: "Please input Name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Role"
            name="profession"
            rules={[
              { required: false, message: "Please input Role!" },
            ]}
          > 
            <Input defaultValue='driver' />
          </FormAnt.Item>
          <FormAnt.Item
            label="Company"
            name="company_id"
            rules={[
              { required: false, message: "Please input company!" },
            ]}
          >
            <Select 
              onChange={(value: any) => setId(value)}
              options={CompanyOption}
            />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddCustomer;