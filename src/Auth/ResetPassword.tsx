import React, { useState } from "react";
import { Button, Card, Input, Space } from "antd";
import { Form, Field } from "react-final-form";
import { UserOutlined } from "@ant-design/icons";
import { resetPass } from "../API/auth/resetPass";
import Success from "./Success";

const ResetPassword: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const validate = (val: any) => {
    const err: any = {};
    if (!val.login) {
      err.login = "Required";
    }
    return err;
  };

  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: any) => {
    setEmail(values.login);
    await sleep(300);
    await resetPass({ login: values.login }).then(() => {
      setOpen(true);
    });
  };

  return (
    <div className="ContainerClassName" style={{ height: "100vh" }}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ submitError, handleSubmit, submitting }) => (
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
              title="Login"
              className="login-form-card "
              style={{ width: 400 }}
            >
              <form onSubmit={handleSubmit}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex", gap: "30px" }}
                >
                  <Field name="login">
                    {({ input, meta }) => (
                      <div>
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          size={"large"}
                          {...input}
                          type="text"
                          placeholder="username or e-mail"
                        />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span style={{ color: "red" }}>
                            {meta.error || meta.submitError}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>
                  {submitError && (
                    <div style={{ color: "red" }} className="error">
                      {submitError}
                    </div>
                  )}

                  <Button
                    className="Login-form-button"
                    size={"large"}
                    htmlType="submit"
                    type="primary"
                    disabled={submitting}
                  >
                    Send
                  </Button>
                </Space>
              </form>
            </Card>
          </Space>
        )}
      />
      <Success open={open} setOpen={setOpen} email={email} />
    </div>
  );
};

export default ResetPassword;
