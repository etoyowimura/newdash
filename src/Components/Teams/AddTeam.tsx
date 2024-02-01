import { useState } from "react";
import { Input, Modal, Form as FormAnt, Switch, Select } from "antd";
import { teamController } from "../../API/LayoutApi/teams";
import { useUserData } from "../../Hooks/Users";

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
const [team, setTeam] = useState('');
  const {data} = useUserData({name: '',team: team, role: 'Checker'});

  return (
    <div>
      <Modal
        open={open}
        title="Add new team"
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
            .catch(() => {
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
            label="Include users to this team"
            name="user_ids"
            rules={[{ required: false, message: "Please input company status!" }]}
          >
            <Select mode="multiple" options={data?.map((items) => ({
              label: items.username,
              value: items.id,
            }))}/>
          </FormAnt.Item>

        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddTeam;