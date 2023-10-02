import { Input, Modal, Form as FormAnt, Switch } from "antd";
import { teamController } from "../../API/LayoutApi/teams";

const AddTeam = ({  
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
        title="Add team"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              await teamController.addTeamController(values);
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
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input team name!" },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Is Active"
            name="is_active"
            rules={[{ required: false, message: "Please input company status!" }]}
          >
            <Switch defaultChecked={true} />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddTeam;