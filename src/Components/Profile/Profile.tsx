import React, { useEffect, useState } from 'react'
import { prof } from '../../API/LayoutApi/profile';
import { Button, Col, Form, Input, Row, Select, Space, Spin, Tabs, Watermark, Switch } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Notfound from '../../Utils/Notfound';
import { userController } from '../../API/LayoutApi/users';

const Profile = () => {
    const [profData, setProfData] = useState<any>(); const [AdminData, setAdminData] = useState<any>();
    useEffect(() => {
        prof.read().then(data => {
            setProfData(data);
        })
    }, [])
    useEffect(() => {
        prof.self().then(data => {
            setAdminData(data)
        })
    }, [])


    const [point, setpoint] = useState<string>('');
    const [first, setFirst] = useState<string>('alskdjfhg1029384756?&%$');
    const [last, setLast] = useState<string>('alskdjfhg1029384756?&%$');
    const [username, setUsername] = useState<string>('alskdjfhg1029384756?&%$');
    const [team, setTeam] = useState<string>('');
    const [staff, setStaff] = useState<boolean | null>(null);

    useEffect(() => {
        if (profData !== undefined) {
            setpoint(profData?.data.total_points)
        }
    }, [profData])
    useEffect(() => {
        if (AdminData !== undefined) {
            setFirst(AdminData?.data.first_name)
            setLast(AdminData?.data.last_name)
            setUsername(AdminData.data.username)
            setTeam(AdminData?.data.team)
            setStaff(AdminData?.data.is_staff)
        }
    }, [AdminData])
    console.log(profData);
    console.log(AdminData);

    const onSubmit = async (value: any) => {
        await prof.profPatch(value);
    };

    return (
        <div>
            <Spin size="large" spinning={!profData}>
                <Watermark style={{ height: "100%" }}>
                    <Spin size="large" spinning={!profData}>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ display: "flex" }}
                        >
                            <Tabs defaultActiveKey="1">
                                <TabPane key="1">
                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        style={{ display: "flex" }}
                                    >
                                        <Form
                                            name="basic"
                                            layout="vertical"
                                            wrapperCol={{ span: 16 }}
                                            initialValues={{ ...AdminData }}
                                            autoComplete="off"
                                            onFinish={onSubmit}
                                        >
                                            <Row gutter={[16, 10]}>
                                                {first !== 'alskdjfhg1029384756?&%$' && <Col span={6}>
                                                    <Form.Item
                                                        wrapperCol={{ span: "100%" }}
                                                        label="First name"
                                                        name="first_name"
                                                    >
                                                        <Input defaultValue={first} />
                                                    </Form.Item>
                                                </Col>}
                                                {last !== 'alskdjfhg1029384756?&%$' && <Col span={6}>
                                                    <Form.Item
                                                        wrapperCol={{ span: "100%" }}
                                                        label="Last name"
                                                        name="last_name"
                                                    >
                                                        <Input defaultValue={last} />
                                                    </Form.Item>
                                                </Col>}
                                                {username !== 'alskdjfhg1029384756?&%$' && <Col span={6}>
                                                    <Form.Item
                                                        wrapperCol={{ span: "100%" }}
                                                        label="Username"
                                                        name="username"
                                                    >
                                                        <Input defaultValue={username} />
                                                    </Form.Item>
                                                </Col>}
                                            </Row>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <Form
                                            name="basic"
                                            layout="vertical"
                                            wrapperCol={{ span: 16 }}
                                            initialValues={{ ...AdminData }}
                                            autoComplete="off"
                                        >
                                            <Row gutter={[16, 10]}>
                                                {team !== '' && <Col span={6}>
                                                    <Form.Item
                                                        wrapperCol={{ span: "100%" }}
                                                        label="Team"
                                                        name="team"
                                                    >
                                                        <Input defaultValue={team} readOnly />
                                                    </Form.Item>
                                                </Col>}
                                                {/* {staff !== null && <Col span={6}>
                                                    <Form.Item
                                                        wrapperCol={{ span: "100%" }}
                                                        label="Is Staff"
                                                        name="is_staff"
                                                    >
                                                        <Switch defaultChecked={staff} />
                                                    </Form.Item>
                                                </Col>} */}
                                            </Row>
                                        </Form>
                                        <Form
                                            name="basic"
                                            layout="vertical"
                                            wrapperCol={{ span: 16 }}
                                            initialValues={{ ...profData }}
                                            autoComplete="off"
                                        >
                                            {point !== '' && <Col span={1}>
                                                <Form.Item
                                                    wrapperCol={{ span: "100%" }}
                                                    label="Points"
                                                    name="total_points"
                                                >
                                                    <Input defaultValue={point} readOnly />
                                                </Form.Item>
                                            </Col>}
                                        </Form>
                                    </Space>
                                </TabPane>
                            </Tabs>
                        </Space>
                    </Spin>
                </Watermark>
            </Spin>
        </div>
    )
}


export default Profile;