import React, { useState} from 'react';
import {Button, Card, Input,  Space} from "antd";
import {LoginApi} from "../API/auth/Login";
import {Form, Field} from 'react-final-form'
import {LockOutlined, UserOutlined} from '@ant-design/icons';


const Login: React.FC = () => {
    // const isValidEmail = (email: any) => {
    //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }


    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string | number>('');
    const validate = (val: any) => {
        const err: any = {};
        if (!val.username) {
            err.username = 'Required';
        }
        // if (!isValidEmail(val.username)) {
        //     err.username = 'Invalid e-mail address';
        // }
        if (!val.password) {
            err.password = 'Required';
        }
        return err;
    };
    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

    const handleLogin = async () => {
        await LoginApi({username, password});
    }


    const onSubmit = async (values: any) => {

        await sleep(300)
        if (values.username !== '') {
            // return { username: 'Unknown username' }
        }
        if (values.password !== '') {
            // return { [FORM_ERROR]: 'Login Failed' }
        }
        await LoginApi({username: values.username, password: values.password})
    }

    return (
        <div className="ContainerClassName">
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({
                             submitError,
                             handleSubmit,
                             submitting,
                         }) => (

                    <Space direction="horizontal" style={{
                        width: '100%',
                        position: 'absolute',
                        top: '300px',
                        right: 0,
                        left: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        {/*<img style={{width:'150px', marginBottom:'50px'}} src={'logo.svg'}/>*/}

                        <Card bodyStyle={{background:'rgb(250, 250, 250)'}} title='Login' className='login-form-card ' style={{width: 400}}>

                            {/*<h3 style={{marginBottom:'10px', fontWeight:'400'}}>Login</h3>*/}

                            <form onSubmit={handleSubmit}>
                                <Space direction="vertical" size="middle"
                                       style={{display: 'flex', gap: '30px'}}>
                                    <Field name="username">
                                        {({input, meta}) => (
                                            <div>
                                                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                                       size={'large'}{...input} type="text" placeholder="Username"/>
                                                {(meta.error || meta.submitError) && meta.touched && (
                                                    <span style={{color: 'red'}}>{meta.error || meta.submitError}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({input, meta}) => (
                                            <div>
                                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                                size={'large'} {...input} type='password'
                                                                placeholder="Password"/>
                                                {meta.error && meta.touched &&
                                                    <span style={{color: 'red'}}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    {submitError && <div style={{color: 'red'}} className="error">{submitError}</div>}

                                    <Button className="Login-form-button" size={'large'} htmlType="submit"
                                            type="primary" disabled={submitting}>
                                        Log In
                                    </Button>


                                    {/*<Button*/}
                                    {/*    onClick={form.reset}*/}
                                    {/*    disabled={submitting || pristine}*/}
                                    {/*>*/}
                                    {/*    Reset*/}
                                    {/*</Button>*/}
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