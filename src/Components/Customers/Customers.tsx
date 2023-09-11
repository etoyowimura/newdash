import { useState } from "react";
import { useCustomerData } from "../../Hooks/Customers";
import AddCustomer from "./AddCustomer";
import { Button } from "antd";
import SearchOptions from "../../Utils/SearchOptions";
import {
  SearchResultForCustomer,
} from "../../Utils/SearchResults";
import CustomerTable from "./CustomersTable";

type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const Customer = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const { data, isLoading, refetch, isFetching }: Data = useCustomerData(id);
  const [open, setOpen] = useState(false);
  const onChange = (query: any) => {
    setSkip(10 * (parseInt(query.current) - 1));
  };
  const showModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {open && <AddCustomer refetch={refetch} open={open} setOpen={setOpen} />}
        <SearchOptions
          SearchResult={(query: string) => SearchResultForCustomer(query)}
          onSelect={(value: any, { valId }: { valId: string }) => {
            setId(valId === undefined ? "" : valId);
            if (valId) {
              setSkip(1);
            }
          }}
          placeholder="Models  Search"
        />
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
        >
          Add Customer
        </Button>
        <Button size={"large"} style={{ marginLeft: "15px" }} onClick={refetch}>
          Refresh
        </Button>
      </span>

      <CustomerTable
        data={data?.data}
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Customer;
