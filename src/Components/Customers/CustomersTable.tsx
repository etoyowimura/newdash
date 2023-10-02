import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { customerController } from "../../API/LayoutApi/customers";
import { useCompanyData } from "../../Hooks/Companies";

const { confirm } = Modal;

type numStr = string | number;

interface customerSource {
    no: numStr;
    name: numStr;
    company_id: numStr;
    profession: numStr;
    id: numStr;
    action: { id: numStr };
    key: React.Key;
}
const isSuper = localStorage.getItem("isSuperUser");

const CustomerTable = ({
    data = [],
    onChange,
}: {
    data: any | undefined;
    onChange(current: any): void;
}) => {
    const columns: object[] = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Role",
            dataIndex: "profession",
            key: "profession",
        },
        {
            title: "Company",
            dataIndex: "company_id",
            key: "company_id",
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
                            })
                        },
                        onCancel() { },
                    });
                };
                return (
                    <Space>
                        <Link to={`${id}`}>
                            <Button disabled={isSuper === "false"}>Edit</Button>
                        </Link>
                        <Button disabled={isSuper === "false"} onClick={showConfirm}>Delete</Button>
                    </Space>
                );
            },
        },
    ];


    const CompanyData = useCompanyData('');
    return (
        <div>
            <Table
                onChange={onChange}
                dataSource={data?.map((u: any, i: number): customerSource => {
                    const obj: customerSource = {
                        no: i + 1,
                        name: u?.name,
                        profession: u?.profession,
                        company_id: CompanyData?.data?.data.map((company: any) => { if (company.id === u?.company_id) { return company.name } }),
                        id: u?.id,
                        action: { id: u.id },
                        key: u.id,
                    };
                    return obj;
                })}
                columns={columns}
            />
        </div>
    );
};

export default CustomerTable;
