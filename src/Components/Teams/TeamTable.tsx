

import React from "react";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { teamController } from "../../API/LayoutApi/teams";
import moment from "moment";

const { confirm } = Modal;

type numStr = string | number;

interface teamSource {
    no: numStr;
    name: numStr;
    is_active: numStr;
    id: numStr;
    created_at: numStr;
    action: { id: numStr };
    key: React.Key;
}
const TeamTable = ({
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
            title: "name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "created_at",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Is Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (tag: boolean) => (
                <Tag color={tag ? "geekblue" : "red"}>{tag ? "True" : "False"}</Tag>
            ),
            filters: [
                {
                    text: "True",
                    value: true,
                },
                {
                    text: "False",
                    value: false,
                },
            ],
            onFilter: (value: any, record: any) => {
                return record.is_active === value;
            },
        },
        // {
        //     title: "Actions",
        //     dataIndex: "action",
        //     key: "action",
        //     render: ({
        //         id,
        //         queryClient,
        //     }: {
        //         id: string;
        //         queryClient: any;
        //     }) => {
        //         const showConfirm = () => {
        //             confirm({
        //                 title: "Teams",
        //                 icon: <ExclamationCircleFilled />,
        //                 content: "Do you want to delete this Team ?",
        //                 onOk: async () => {
        //                     return new Promise(async (resolve, reject) => {
        //                         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        //                         await teamController.deleteTeamController(id);

        //                     })
        //                 },
        //                 onCancel() { },
        //             });
        //         };
        //         return (
        //             <Space>
        //                 {/* <Link to={`${id}`}>
        //                     <Button>Edit</Button>
        //                 </Link> */}
        //                 {/* <Button onClick={showConfirm}>Delete</Button> */}
        //             </Space>
        //         );
        //     },
        // },
    ];
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            console.log(record);
                            document.location.replace(`/#/teams/${record.id}`);
                        },
                    };
                }}
                    onChange={onChange}
                    dataSource={data?.map((u: any, i: number): teamSource => {
                        let createCr = u.created_at;
                        const obj: teamSource = {
                            no: i + 1,
                            name: u?.name,
                            is_active: u?.is_active,
                            id: u?.id,
                            created_at: createCr
                                ? moment(createCr).format("YYYY-MM-DD, h:mm:ss a")
                                : "",
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

export default TeamTable;
