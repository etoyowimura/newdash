

import React from "react";
import { Spin, Table, Tag } from "antd";
import moment from "moment";

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
    isLoading,
    isFetching,
}: {
    data: any | undefined;
    isLoading: boolean | undefined;
    isFetching: boolean | undefined;
}) => {
    const columns: object[] = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: '5%'
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Created at",
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
    ];
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            document.location.replace(`/#/teams/${record.id}`);
                        },
                    };
                }}
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
