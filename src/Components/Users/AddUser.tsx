import { Input, Modal, Form as FormAnt, Switch, Select } from "antd";
import { userController } from "../../API/LayoutApi/users";
import { useTeamData } from "../../Hooks/Teams";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useRoleData } from "../../Hooks/Role";

const AddUser = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen(open: boolean): void;
}) => {
  const [form] = FormAnt.useForm();
  const [showInfo, setShowInfo] = useState(true);
  const handleCancel = () => {
    setOpen(!open);
  };
  const TeamData = useTeamData('');

  const roleData = useRoleData();

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
            await userController.addUserController(values).then((data: any) => {
              const formattedPassword = data.data.password;
              if (formattedPassword) {
                for (var i = 0; i < formattedPassword.length; i++) {
                  message.error({ content: formattedPassword[i] });
                }
              }
            });
            setOpen(!open);
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
            rules={[{ required: true, message: "password is required!" }]}
          >
            <div className="input-container" style={{ width: "100%" }}>
              <Input
                type="password"
                addonAfter={
                  <span
                    className="info-icon-container"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(true)}
                  >
                    <InfoCircleOutlined
                      className="info-icon"
                      style={{ color: "blue" }}
                    />
                  </span>
                }
              />
            </div>
            {showInfo && (
              <ul
                className="info-container"
                style={{
                  position: "absolute",
                  top: -4,
                  padding: 20,
                  width: 300,
                  background: "#fff",
                  marginLeft: 420,
                  borderRadius: 10,
                }}
              >
                <li
                  style={{
                    fontSize: 11,
                    fontStyle: "italic",
                    fontWeight: 300,
                    listStyle: "",
                  }}
                >
                  Your password can’t be too similar to your other personal
                  information
                </li>
                <li
                  style={{ fontSize: 11, fontStyle: "italic", fontWeight: 300 }}
                >
                  Your password must contain at least 8 characters.
                </li>
                <li
                  style={{ fontSize: 11, fontStyle: "italic", fontWeight: 300 }}
                >
                  Your password can’t be a commonly used password.
                </li>
                <li
                  style={{ fontSize: 11, fontStyle: "italic", fontWeight: 300 }}
                >
                  Your password can’t be entirely numeric.
                </li>
              </ul>
            )}
          </FormAnt.Item>
          <FormAnt.Item
            label="Password Confirmation"
            name="password"
            rules={[{ required: true, message: "password is required!" }]}
          >
            <Input type="password" />
          </FormAnt.Item>
          <FormAnt.Item
            label="Team"
            name="team_id"
            rules={[{ required: false }]}
          >
            <Select
              options={TeamData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
            />
          </FormAnt.Item>
          <FormAnt.Item label="Role" name="groups" rules={[{ required: true }]}>
            <Select
              options={roleData?.data?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
            />
          </FormAnt.Item>
          <FormAnt.Item
            label="Is Active"
            name="is_active"
            rules={[{ required: false }]}
          >
            <Switch defaultChecked={true} />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default AddUser;
