import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import { Button } from "antd";
import CustomerTable from "./CustomersTable";
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
const Customer = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
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
            const {data}: Data = await instance(`customers/?name=${id}`)
            setCharacters(data)
        } catch (error) {
            console.error(error)
        }
    }

    fetchData()
}, [id])
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
        {open && <AddCustomer open={open} setOpen={setOpen} />}
        <div className="search">
          <input type="text"
            placeholder={"Search Customer"}
            className={"input"}
            onChange={event => setId(event.target.value)}
            value={id}
          />
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Customer
        </Button>
      </span>

      <CustomerTable
        data={characters}
        onChange={onChange}
        // isLoading={isLoading}
        // isFetching={isFetching}
        // refetch={refetch}
      />
    </div>
  );
};

export default Customer;
