import React from "react";
import { Modal, Spin, Table } from "antd";

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
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Points",
            dataIndex: "points",
            key: "points",
        },
    ];
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                isSuper !== "false" && document.location.replace(`/#/services/${record.id}`);
                            },
                        };
                    }}
                    dataSource={data?.map((u: any, i: number): serviceSource => {
      
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
