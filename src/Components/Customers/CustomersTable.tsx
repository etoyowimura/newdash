import React from "react";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { customerController } from "../../API/LayoutApi/customers";
import moment from "moment";

const { confirm } = Modal;

type numStr = string | number;

interface customerSource {
    no: numStr;
    first_name: numStr;
    last_name: numStr;
    company_id: numStr;
    profession: numStr;
    username: numStr;
    id: numStr;
    action: { id: numStr };
    key: React.Key;
}

const CustomerTable = ({
    data = [],
    onChange,
    isLoading,
    isFetching,
    refetch,
}: {
    data: any | undefined;
    onChange(current: any): void;
    isLoading: boolean | undefined;
    isFetching: boolean | undefined;
    refetch(): void;
}) => {
    const columns: object[] = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "first_name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "last_name",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "username",
            dataIndex: "username",
            key: "username",
        }, 
        {
            title: "profession",
            dataIndex: "profession",
            key: "profession",
        }, 
        {
            title: "company_id",
            dataIndex: "company_id",
            key: "company_id",
        },
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            render: ({
                id,
                queryClient,
            }: {
                id: string;
                queryClient: any;
            }) => {
                const showConfirm = () => {
                    confirm({
                        title: "Customers",
                        icon: <ExclamationCircleFilled />,
                        content: "Do you want to delete this Customer ?",
                        onOk: async () => {
                            return new Promise(async (resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                await customerController.deleteCustomerController(id);
                                refetch();
                            }).catch(() => {
                                refetch();
                            });
                        },
                        onCancel() { },
                    });
                };
                return (
                    <Space>
                        <Link to={`${id}`}>
                            <Button>Edit</Button>
                        </Link>
                        <Button onClick={showConfirm}>Delete</Button>
                    </Space>
                );
            },
        },
    ];
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                    onChange={onChange}
                    dataSource={data?.map((u: any, i: number): customerSource => {
                        let createCr = u.created_at;
                        const obj: customerSource = {
                            no: i + 1,
                            first_name: u?.first_name,
                            last_name: u?.last_name,
                            profession: u?.profession,
                            username: u?.username,
                            company_id: u?.company_id,
                            id: u?.id,
                            action: { id: u.id },
                            key: u.id,
                        };
                        return obj;
                    })}
                    columns={columns}
                />
            </Spin>
        </div>
    );
};

export default CustomerTable;
