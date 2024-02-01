import { Input, Modal, Form as FormAnt, Select } from "antd";
import { useRoleData } from "../../Hooks/Role";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { TUser } from "../../types/User/TUser";
import { inviteVerify } from "../../API/auth/invite";

const AddUser = ({
  open,
  setOpen,
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TUser[], unknown>>;
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const [form] = FormAnt.useForm();
  const handleCancel = () => {
    setOpen(!open);
  };
  const roleData = useRoleData();
  const filteredRoleData = roleData?.data?.filter(role => role.name !== 'Owner');

  return (
    <div>
      <Modal
        open={open}
        title="Add user"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form.validateFields().then(async (values) => {
            if (typeof values.groups === "number") {
              values.groups = [values.groups];
            }
            form.resetFields();
            delete values.Confirm;
            inviteVerify(values);
            setOpen(!open);
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
            label="E-mail"
            name="email"
            rules={[
              { required: true },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Role"
            name="role_id"
            rules={[{ required: true }]}
          >
            <Select
              options={filteredRoleData?.map(role => ({
                label: role.name,
                value: role.id,
              }))}
            />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddUser;
