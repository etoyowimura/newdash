import { useState } from "react";
import AddCompany from "./AddCompanies";
import { Button, Radio, RadioChangeEvent } from "antd";
import CompanyTable from "./CompaniesTable";
import Search from "antd/es/input/Search";
import { companyController } from "../../API/LayoutApi/companies";
import { useQuery } from "react-query";

const isSuper = localStorage.getItem("isSuperUser");
const Company = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const [name, setName] = useState<any>("");
  const [isActive, setIsActive] = useState<boolean>();

  const { isLoading, data } = useQuery({
    queryKey: ["companies", name, isActive],
    queryFn: () =>
      companyController.read({
        name,
        is_active: isActive,
      }),
  });

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        {open && <AddCompany open={open} setOpen={setOpen} />}
        <div className="search">
          <Search
            style={{ margin: 4 }}
            type="text"
            placeholder={"Search Company"}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>
        <Radio.Group
          onChange={(e: RadioChangeEvent) => setIsActive(e.target.value)}
          size="middle"
          value={isActive}
          style={{ marginLeft: 20 }}
        >
          <Radio.Button value={""}>All</Radio.Button>
          <Radio.Button value={true}>Active</Radio.Button>
          <Radio.Button value={false}>Inactive</Radio.Button>
        </Radio.Group>

        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"middle"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Company
        </Button>
      </span>

      <CompanyTable data={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default Company;
