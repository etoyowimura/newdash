import { useState } from "react";
import { useCompanyData } from "../../Hooks/Companies";
import AddCompany from "./AddCompanies";
import { Button } from "antd";
import SearchOptions from "../../Utils/SearchOptions";
import {
  SearchResultForCompany,
} from "../../Utils/SearchResults";
import CompanyTable from "./CompaniesTable";

type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const Company = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const { data, isLoading, refetch, isFetching }: Data = useCompanyData(id);
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
        {open && <AddCompany refetch={refetch} open={open} setOpen={setOpen} />}
        <SearchOptions
          SearchResult={(query: string) => SearchResultForCompany(query)}
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
          Add Company
        </Button>
        <Button size={"large"} style={{ marginLeft: "15px" }} onClick={refetch}>
          Refresh
        </Button>
      </span>

      <CompanyTable
        data={data?.data}
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Company;
