import React, { useState } from "react";
import { Modal, Spin, Table } from "antd";
import { useTeamData } from "../../Hooks/Teams";

const { confirm } = Modal;

type numStr = string | number;

interface statSource {
    no: numStr;
    admin: numStr;
    points: numStr;
    team: numStr;
    id: numStr;
    key: React.Key;
}

const StatTable = ({
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
            title: "admin",
            dataIndex: "admin",
            key: "admin",
        },
        {
            title: "team",
            dataIndex: "team",
            key: "team",
        },
        {
            title: "points",
            dataIndex: "points",
            key: "points",
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
        //                 title: "Stats",
        //                 icon: <ExclamationCircleFilled />,
        //                 content: "Do you want to delete this Stat ?",
        //                 onOk: async () => {
        //                     return new Promise(async (resolve, reject) => {
        //                         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        //                         await statController.deleteStatController(id);
        //                         refetch();
        //                     }).catch(() => {
        //                         refetch();
        //                     });
        //                 },
        //                 onCancel() { },
        //             });
        //         };
        //         return (
        //             <Space>
        //                 <Link to={`${id}`}>
        //                     <Button>Edit</Button>
        //                 </Link>
        //                 <Button onClick={showConfirm}>Delete</Button>
        //             </Space>
        //         );
        //     },
        // },
    ];

    const TeamData = useTeamData('');
    return (
        <div>
            <Spin size="large" spinning={isLoading || isFetching}>
                <Table
                    onChange={onChange}
                    dataSource={data?.map((u: any, i: number): statSource => {
                        const obj: statSource = {
                            no: i + 1,
                            team: TeamData?.data?.data.map((team: any)=> {if(team.id === u?.team_id){return team.name}}),
                            admin: u?.admin,
                            points: u?.total_points,
                            id: u?.id,
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

export default StatTable;
