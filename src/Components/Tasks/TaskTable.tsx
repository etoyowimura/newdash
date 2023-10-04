import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled, CloudDownloadOutlined } from "@ant-design/icons";
import { taskController } from "../../API/LayoutApi/tasks";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerData } from "../../Hooks/Customers";
import { useServiceData } from "../../Hooks/Services";
import { useUserData } from "../../Hooks/Users";
import { useTeamData } from "../../Hooks/Teams";
import '../../App.css'
import { useEffect, useState } from "react";
import instance from "../../API/api";
const { confirm } = Modal;

type numStr = string | number;

interface taskSource {
    no: numStr;
    company_id: numStr;
    customer_id: numStr;
    service_id: numStr;
    assigned_to_id: numStr;
    in_charge_id: numStr;
    id: numStr;
    note: numStr;
    status: numStr;
    action: { id: numStr, inCharge: numStr };
    key: React.Key;
}
const admin_id = localStorage.getItem("admin_id");
const isSuper = sessionStorage.getItem("isSuperUser");
const TaskTable = ({
    data = [],
    onChange,
    // isLoading,
    // isFetching,
    // refetch,
}: {
    data: any | undefined;
    onChange(current: any): void;
    // isLoading: boolean | undefined;
    // isFetching: boolean | undefined;
    // refetch(): void;
}) => {
    const columns: object[] = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Company",
            dataIndex: "company_id",
            key: "company_id",
        },
        {
            title: "Customer",
            dataIndex: "customer_id",
            key: "customer_id",
        },
        {
            title: "Service",
            dataIndex: "service_id",
            key: "service_id",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span className={getStatusClassName(status)}>{status}</span>
            ),
        },
        {
            title: "In charge",
            dataIndex: "in_charge_id",
            key: "in_charge_id",
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            render: ({
                id,
                inCharge,
            }: {
                id: string;
                inCharge: numStr;
            }) => {
                const showConfirm = () => {
                    confirm({
                        title: "Tasks",
                        icon: <ExclamationCircleFilled />,
                        content: "Do you want to delete this Task ?",
                        onOk: async () => {
                            return new Promise(async (resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                await taskController.deleteTaskController(id);
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
                            {isSuper === 'true' || inCharge == null ? (<Button>Edit</Button>) :
                                (<Button disabled={inCharge != admin_id}>Edit</Button>)}
                        </Link>
                    </Space>
                );
            },
        },
    ];

    const [mainData, setMainData] = useState<any>()
    useEffect(() => {
        const Data = data.data;
        setMainData(Data)
    }, [data])
    const rowClassName = (record: taskSource) => {
        if (record.status === 'New') {
            return 'new-status-row';
        }
        return '';
    };

    function getStatusClassName(status: string) {
        if (status === "Checking") {
            return "checking-status";
        } else if (status === "Done") {
            return "done-status";
        } else if (status === "Do PTI") {
            return "done-status";
        } else if (status === "No need PTI") {
            return "done-status";
        } else if (status === "New") {
            return "new-status";
        }
    }
    const CompanyData = useCompanyData('');
    const CustomerData = useCustomerData('');
    const ServiceData = useServiceData('');
    const AdminData = useUserData('');
    const TeamData = useTeamData('');

    const [loadings, setLoadings] = useState<any>(1);

    const LoadMore = () => {
        const a = loadings + 1;
        setLoadings(a);
    };
    type Data = {
        data?: {
            data: Array<any>;
            count: number | string;
        };
    };

    const [results, setResults] = useState<any>();
    useEffect(() => {
        if (loadings !== 1) {
            const fetchData = async () => {
                try {
                    const { data }: Data = await instance(`tasks/?page=${loadings}`)
                    const result = data?.data;
                    setResults(result);
                } catch (error) {
                    console.error(error)
                }
            }
            fetchData()
        }
    }, [loadings])
    // console.log(mainData, results);

    useEffect(() => {
        if (results !== undefined) {
            const prev = [...mainData, ...results];
            console.log(prev);
            setMainData(prev);
            onChange({ loadings, prev })
        }
    }, [results]);

    // console.log(mainData);


    return (
        <div>
            {/* <Spin size="large" spinning={ isFetching}> */}
            <Table
                // onRow={(record, rowIndex) => {
                //     return {
                //         onClick: (event) => {
                //             console.log(record);
                //             isSuper !== "false" && document.location.replace(`/#/${record.id}`);
                //         },
                //     };
                // }}
                onChange={onChange}
                dataSource={mainData?.map((u: any, i: number): taskSource => {
                    const obj: taskSource = {
                        no: i + 1,
                        id: u?.id,
                        company_id: CompanyData?.data?.data.map((company: any) => { if (company.id === u?.company_id) { return company.name } }),
                        customer_id: CustomerData?.data?.data.map((customer: any) => { if (customer.id === u?.customer_id) { return customer.name } }),
                        service_id: ServiceData?.data?.data.map((service: any) => { if (service.id === u?.service_id) { return service.title } }),
                        assigned_to_id: TeamData?.data?.data.map((team: any) => { if (team.id === u?.assigned_to_id) { return team.name } }),
                        in_charge_id: AdminData?.data?.data.map((admin: any) => { if (admin.id === u.in_charge_id) { return admin.username } }),
                        note: u?.note,
                        status: u?.status,
                        action: { id: u.id, inCharge: u.in_charge_id },
                        key: u.id,
                    };
                    return obj;
                })
                    .sort((a: taskSource, b: taskSource) => {
                        if (a.status === "New" && b.status !== "New") {
                            return 0;
                        }
                        if (a.status === "New") {
                            return 1;
                        }
                        if (b.status !== "New") {
                            return 2;
                        }
                        return 0;
                    })}
                columns={columns}
                rowClassName={rowClassName}
                pagination={false}
            />
            <Space direction="vertical">
                <Space wrap>
                    <Button
                        type="primary"
                        icon={<CloudDownloadOutlined />}
                        onClick={LoadMore}
                    >
                        load More!
                    </Button>
                </Space>
            </Space>
            {/* </Spin> */}
        </div>
    );
};

export default TaskTable;
