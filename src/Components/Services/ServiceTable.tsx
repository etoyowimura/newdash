import React from "react";
import { Button, Modal, Space, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { serviceController } from "../../API/LayoutApi/services";

const { confirm } = Modal;

type numStr = string | number;

interface serviceSource {
    no: numStr;
    title: numStr;
    points: numStr;
    id: numStr;
    action: { id: numStr };
    key: React.Key;
}
const isSuper = localStorage.getItem("isSuperUser");
const ServiceTable = ({
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
            title: "title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "points",
            dataIndex: "points",
            key: "points",
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
                        title: "Services",
                        icon: <ExclamationCircleFilled />,
                        content: "Do you want to delete this Service ?",
                        onOk: async () => {
                            return new Promise(async (resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                await serviceController.deleteServiceController(id);
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
                            <Button disabled={isSuper === "false"}>Edit</Button>
                        </Link>
                        <Button disabled={isSuper === "false"} onClick={showConfirm}>Delete</Button>
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
                    dataSource={data?.map((u: any, i: number): serviceSource => {
                        let createCr = u.created_at;
                        const obj: serviceSource = {
                            no: i + 1,
                            title: u?.title,
                            points: u?.points,
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

export default ServiceTable;
