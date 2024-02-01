import React, { useState } from "react";
import { Button, Space, Card, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { common } from "../Utils/common";
import { Navigate, useLocation } from "react-router-dom";
import { resetPassEmail } from "../API/auth/resetPass";

const ResetByEmail: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const confirmation_token = queryParameters.get("confirmation_token");
  const user_id = queryParameters.get("user_id");
  const onFinish = (values: any) => {
    values.confirmation_token = confirmation_token;
    values.user_id = user_id;
    if(values.user_id){
        resetPassEmail(values).then(() => {
            <Navigate
              to={{
                pathname: "/auth/login",
              }}
            />
        });
    }
    
  };

  return (
    <div className="">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
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
            title="Reset Password"
            className="login-form-card "
            style={{ width: 400, textAlign: "left" }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex", gap: "20px", margin: "auto" }}
            >
              <Form.Item
                name="new_password"
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
                      if (!value || getFieldValue("new_password") === value) {
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
                <Button type="primary" htmlType="submit">
                  Reset
                </Button>
              </Form.Item>
            </Space>
          </Card>
        </Space>
      </Form>
    </div>
  );
};

export default ResetByEmail;
