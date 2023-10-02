import { useState } from "react";
import { useServiceData } from "../../Hooks/Services";
import AddService from "./AddService";
import { Button } from "antd";
import SearchOptions from "../../Utils/SearchOptions";
import ServiceTable from "./ServiceTable";

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
const Service = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const { data, isLoading, refetch, isFetching }: Data = useServiceData(id);
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
        {open && <AddService refetch={refetch} open={open} setOpen={setOpen} />}
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Service
        </Button>
      </span>

      <ServiceTable
        data={data?.data}
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Service;
