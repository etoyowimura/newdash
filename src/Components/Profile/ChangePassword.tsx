import { Modal, Form as FormAnt, Input } from "antd";
import { prof } from "../../API/LayoutApi/profile";

const ChangePassword = () => {
  const [form] = FormAnt.useForm();

  return (
    <div>
      <Modal
        title="Change Password"
        okText="Submit"
        cancelText="Cancel"
        onOk={() => {
          form.validateFields().then(async (values) => {
            form.resetFields();
            console.log(values);
            await prof.changePass(values);
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
            label="Old Password"
            name="old_password"
            rules={[{ required: true, message: "Your old password!" }]}
          >
            <Input.Password />
          </FormAnt.Item>
          <FormAnt.Item
            name="new_password"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </FormAnt.Item>
          <FormAnt.Item
            name="password_confirm"
            label="Confirm Password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </FormAnt.Item>
        </FormAnt>
      </Modal>
    </div>
  );
};

export default ChangePassword;
