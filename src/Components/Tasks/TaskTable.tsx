import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { taskController } from "../../API/LayoutApi/tasks";
import { useCompanyData } from "../../Hooks/Companies";
import { useCustomerData } from "../../Hooks/Customers";
import { useServiceData } from "../../Hooks/Services";
import { useUserData } from "../../Hooks/Users";
import { useTeamData } from "../../Hooks/Teams";
import '../../App.css'
import { useEffect, useState } from "react";
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
    extra_task: boolean;
    action: { id: numStr, inCharge: numStr };
    key: React.Key;
}
const admin_id = localStorage.getItem("admin_id");
const isSuper = localStorage.getItem("isSuperUser");
const TaskTable = ({
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span className={getStatusClassName(status)}>{status}</span>
              ),
        },
        {
            title: "Extra Task",
            dataIndex: "extra_task",
            key: "extra_task",
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
                        <Button disabled={isSuper === "false"} onClick={showConfirm}>Delete</Button>
                    </Space>
                );
            },
        },
    ];

    const rowClassName = (record: taskSource) => {
        if (record.status === 'New') {
          return 'new-status-row'; // Здесь 'new-status-row' - класс для новых задач
        }
        return ''; // Возвращаем пустую строку, если нет специального класса
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

    return (
        <div>
            {/* <Spin size="large" spinning={ isFetching}> */}
                <Table
                    onChange={onChange}
                    dataSource={data?.map((u: any, i: number): taskSource => {
                        const obj: taskSource = {
                            no: i + 1,
                            id: u?.id,
                            extra_task: u?.extra_task,
                            company_id: CompanyData?.data?.data.map((company: any) => { if (company.id === u?.company_id) { return company.name } }),
                            customer_id: CustomerData?.data?.data.map((customer:any)=> {if(customer.id === u?.customer_id){return customer.name}}),
                            service_id: ServiceData?.data?.data.map((service:any)=> {if(service.id === u?.service_id){return service.title}}),
                            assigned_to_id: TeamData?.data?.data.map((team: any)=> {if(team.id === u?.assigned_to_id){return team.name}}),
                            in_charge_id: AdminData?.data?.data.map((admin:any) => { if(admin.id === u.in_charge_id){return admin.username}}),
                            note: u?.note,
                            status: u?.status,
                            action: { id: u.id, inCharge: u.in_charge_id },
                            key: u.id,
                        };
                        
                        return obj;
                    })}
                    columns={columns}
                    rowClassName={rowClassName}
                />
            {/* </Spin> */}
        </div>
    );
};

export default TaskTable;
