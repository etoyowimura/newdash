import { Input, Modal, Form as FormAnt } from "antd";
import { customerController } from "../../API/LayoutApi/customers";
import { useCompanyOne } from "../../Hooks/Companies";

const AddDriver = ({  
  open,
  id,
  setOpen,
}: {
    id: any;
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const [form] = FormAnt.useForm();

  const handleCancel = () => {
    setOpen(!open);
  };
  
  const comvalue = useCompanyOne(id);
  
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
              const updatedValues = { ...values };
              updatedValues.company_id = id;
              await customerController.addCustomerController(updatedValues);
              setOpen(!open);
              window.location.reload();
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
            name='company_id'
            rules={[
              { required: false, message: "Please input company!" },
            ]}
          >
           {comvalue !== undefined && <Input defaultValue={comvalue.data.name} readOnly/>}
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddDriver;