import { useEffect, useState } from "react";
import AddCompany from "./AddCompanies";
import { Button, Radio, RadioChangeEvent, Select } from 'antd';
import CompanyTable from "./CompaniesTable";
import instance from "../../API/api";
import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const { Option } = Select;
const isSuper = localStorage.getItem("isSuperUser");
const Company = () => {
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | boolean>('');


  const onChange = (query: any) => {
    setSkip(10 * (parseInt(query.current) - 1));
  };
  const showModal = () => {
    setOpen(true);
  };
  const [characters, setCharacters] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: Data = await instance(`companies/?name=${name}&is_active=${status}`)
        setCharacters(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [name])

  useEffect(() => {
    if (status !== '') {
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`companies/?is_active=${status}`);
          setCharacters(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNewData()
    } else {
      const fetchData = async () => {
        try {
          const { data }: Data = await instance(`companies/?name=${name}`)
          setCharacters(data)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }, [status]);

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
          <Search 
          style={{ margin: 4}}
            type="text"
            placeholder={"Search Company" }
            onChange={event => setName(event.target.value)}
            value={name}
          />
          </div>
        <Radio.Group onChange={(e:RadioChangeEvent) => setStatus(e.target.value)} size="middle" value={status} style={{marginLeft: 20, }}>
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
      </span >

  <CompanyTable
    data={characters}
    onChange={onChange}
  />
    </div >
  );
};

export default Company;
