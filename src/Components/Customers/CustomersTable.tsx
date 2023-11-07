import { Table } from "antd";
import { useCompanyData } from "../../Hooks/Companies";
import { TCustomer } from "../../types/Customer/TCustomer";

const isSuper = localStorage.getItem("isSuperUser");

function CustomerTable({
    data,
    isLoading,
}: {
    data?: TCustomer[];
    isLoading?: boolean;
}){
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
            title: "Role",
            dataIndex: "profession",
            key: "profession",
        },
        {
            title: "Company",
            dataIndex: "company_id",
            key: "company_id",
        },
    ];


    const CompanyData = useCompanyData('');
    return (
        <div>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            isSuper !== "false" && document.location.replace(`/#/customers/${record.id}`);
                        },
                    };
                }}
                loading={isLoading}
                dataSource={data?.map((u, i) => ({
                    ...u,
                    no: i + 1,
                    company_id: CompanyData?.data?.data.map((company: any) => { if (company.id === u?.company_id) { return company.name } }),
                }))}
                columns={columns}
            />
        </div>
    );
};

export default CustomerTable;
