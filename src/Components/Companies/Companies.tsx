import { useEffect, useState } from "react";
import AddCompany from "./AddCompanies";
import { Button } from "antd";
import CompanyTable from "./CompaniesTable";
import instance from "../../API/api";

type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const isSuper = localStorage.getItem("isSuperUser");
const Company = () => {
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState<any>("");
  const [open, setOpen] = useState(false);
  const onChange = (query: any) => {
    setSkip(10 * (parseInt(query.current) - 1));
  };
  const showModal = () => {
    setOpen(true);
  };
  const [ characters, setCharacters] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const {data}: Data = await instance(`companies/?name=${name}`)
            setCharacters(data)
        } catch (error) {
            console.error(error)
        }
    }

    fetchData()
}, [name])
console.log(characters);

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {open && <AddCompany open={open} setOpen={setOpen} />}
        <div className="search">
          <input type="text"
            placeholder={"Search Company"}
            className={"input"}
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Company
        </Button>
      </span>

      <CompanyTable
        data={characters}
        onChange={onChange}
      />
    </div>
  );
};

export default Company;
