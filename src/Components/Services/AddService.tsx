import { Input, Modal, Form as FormAnt } from "antd";
import { serviceController } from "../../API/LayoutApi/services";

const AddService = ({  
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
        title="Add service"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await serviceController.addServiceController(values);
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
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input service title!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Points"
            name="points"
            rules={[
              { required: true, message: "Please input service points!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddService;