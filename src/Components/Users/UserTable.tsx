

import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { userController } from "../../API/LayoutApi/users";
import { useTeamData } from "../../Hooks/Teams";
import { useUserData } from "../../Hooks/Users";

const { confirm } = Modal;

type numStr = string | number;

interface userSource {
    no: numStr;
    first_name: numStr;
    last_name: numStr;
    username: numStr;
    is_staff: numStr;
    team: numStr;
    id: numStr;
    action: { id: numStr };
    key: React.Key;
}

const UserTable = ({
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
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Team",
            dataIndex: "team",
            key: "team",
        },
        {
            title: "First name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Last name",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "Is Staff",
            dataIndex: "is_staff",
            key: "is_staff",
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
                        title: "Users",
                        icon: <ExclamationCircleFilled />,
                        content: "Do you want to delete this User ?",
                        onOk: async () => {
                            return new Promise(async (resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                await userController.deleteUserController(id);
                                // refetch();
                            }).catch(() => {
                                // refetch();
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
    const TeamData = useTeamData('');
    
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                    onChange={onChange}
                    dataSource={data?.map((u: any, i: number): userSource => {
                        const obj: userSource = {
                            no: i + 1,
                            first_name: u?.first_name,
                            last_name: u?.last_name,
                            username: u?.username,
                            is_staff: u?.is_staff,
                            team: TeamData?.data?.data.map((team: any)=> {if(team.id === u?.team_id){return team.name}}),
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

export default UserTable;
