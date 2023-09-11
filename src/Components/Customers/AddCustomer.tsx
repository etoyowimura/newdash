import { Input, Modal, Form as FormAnt, Switch } from "antd";
import { customerController } from "../../API/LayoutApi/customers";

const AddCustomer = ({  
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen(open: boolean): void;
  refetch(): void;
}) => {
  const [form] = FormAnt.useForm();

  const handleCancel = () => {
    setOpen(!open);
  };

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
              console.log(values);
              setOpen(!open);
              refetch();
            })
            .catch((info) => {
              refetch();
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
            label="first_name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter customer name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="last_name"
            name="last_name"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="username"
            name="username"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="profession"
            name="profession"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="company_id"
            name="company_id"
            rules={[
              { required: true, message: "Please input owner name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddCustomer;