import React, { useState } from "react";
import { Button, Space, Card, Form, Input } from "antd";
import { RegisterApi, validateUsername } from "../API/auth/register";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { message } from "antd";
import Success from "./Success";
import { common } from "../Utils/common";
import { useLocation } from "react-router-dom";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const business_id = queryParameters.get("business_id");
  const role_id = queryParameters.get("role_id");
  const emailDom = queryParameters.get("email");
  const onFinish = (values: any) => {
    if (role_id && business_id) {
      values.role_id = role_id;
      values.business_id = business_id;
    }
    if (emailDom) {
      values.email = emailDom;
    } 
    validateUsername(values.username).then((status) => {
      if (status === 204) {
        setLoading(true);
        RegisterApi(values).then((status) => {
          if (status === 201) {
            setLoading(false);
            setOpen(true);
            setEmail(values.email);
          } else {
            setLoading(false);
          }
        });
      } else if (status === 200) {
        setTimeout(() => {
          message.error({
            content: "This username already exists!",
            duration: 2,
          });
        }, 1000);
      }
    });
  };

  return (
    <div className="">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          email: emailDom
        }}
        scrollToFirstError
      >
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card
            bodyStyle={{ background: "rgb(250, 250, 250)" }}
            title="Sign Up"
            className="login-form-card "
            style={{ width: 400, textAlign: "left" }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex", gap: "20px", margin: "auto" }}
            >
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First name"
                />
              </Form.Item>

              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last name"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >    
                {emailDom ? (
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="E-mail"
                    defaultValue={emailDom}     
                    value={emailDom}
                    readOnly
                  />
                ) : (
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="E-mail"
                  />
                )}
              </Form.Item>

              <Form.Item
                name="username"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message:
                      "Your password must contain at least 8 characters.",
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="password_confirm"
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
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Re-enter Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Confirm
                </Button>
              </Form.Item>
            </Space>
          </Card>
        </Space>
      </Form>
      <Success open={open} setOpen={setOpen} email={email} />
    </div>
  );
};

export default Register;
