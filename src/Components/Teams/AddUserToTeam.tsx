import { Input, Modal, Form as FormAnt, Select } from "antd";
import { userController } from "../../API/LayoutApi/users";
import { useTeamOne } from "../../Hooks/Teams";

import { message } from "antd";
import { useRoleData } from "../../Hooks/Role";
import { common } from "../../Utils/common";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { TUser } from "../../types/User/TUser";

const AddUserToTeam = ({
  open,
  setOpen,
  refetch,
  team,
}: {
  team: string;
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

  const oneTeam = useTeamOne(team);

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
            values.team_id = team;
            await userController.addUserController(values).then((data: any) => {
              const formattedPassword = data.data.password;
              if (formattedPassword) {
                for (var i = 0; i < formattedPassword.length; i++) {
                  message.error({ content: formattedPassword[i] });
                }
              }
            });
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input />
          </FormAnt.Item>
          <FormAnt.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Your password must contain at least 8 characters.",
              },
              () => ({
                validator(_, value) {
                  if (!value || /[^0-9]+/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Your password can’t be entirely numeric.")
                  );
                },
              }),
              () => ({
                validator(_, value) {
                  // Список общеупотребимых паролей (пример)
                  const commonPasswords = common;
                  if (!value || !commonPasswords.includes(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Your password can’t be a commonly used password."
                    )
                  );
                },
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const personalInfo = getFieldValue("username");
                  if (!value || !value.includes(personalInfo)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Your password can’t be too similar to your other personal information."
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </FormAnt.Item>
          <FormAnt.Item
            name="Confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </FormAnt.Item>
          <FormAnt.Item
            label="Team"
            name="team_id"
            rules={[{ required: false }]}
          >
            <Input defaultValue={oneTeam?.data?.name} readOnly />
          </FormAnt.Item>
          <FormAnt.Item label="Role" name="groups" rules={[{ required: true }]}>
            <Select
              options={roleData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
            />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddUserToTeam;
