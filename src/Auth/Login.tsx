import React from "react";
import { Button, Card, Input, Space } from "antd";
import { LoginApi } from "../API/auth/login";
import { Form, Field } from "react-final-form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const validate = (val: any) => {
    const err: any = {};
    if (!val.login) {
      err.login = "Required";
    }
    if (!val.password) {
      err.password = "Required";
    }
    
    return err;
  };     
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values:any) => {
    await sleep(300);
    await LoginApi({ login: values.login, password: values.password });
  };

  return (
    <div className="ContainerClassName" style={{height: '100vh'}}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ submitError, handleSubmit, submitting }) => (
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              height: '100vh',
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
                  <Field name="password">
                    {({ input, meta }) => (
                      <div>
                        <Input.Password
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          size={"large"}
                          {...input}
                          type="password"
                          placeholder="Password"
                        />
                        {meta.error && meta.touched && (
                          <span style={{ color: "red" }}>{meta.error}</span>
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
                    Log In
                  </Button>
                  {/* <h5>
                    <Link to='/auth/reset_password'>Forgot password?</Link>
                    <br />
                    Don't have an account?
                    <Link to='/auth/register'> Create one now</Link>
                  </h5> */}
                </Space>
              </form>
            </Card>
          </Space>
        )}
      />
    </div>
  );
};

export default Login;
