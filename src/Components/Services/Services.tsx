import { useState } from "react";
import { useServiceData } from "../../Hooks/Services";
import AddService from "./AddService";
import { Button } from "antd"; 
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
  const { data, isLoading, refetch, isFetching }: Data = useServiceData('');
  const [open, setOpen] = useState(false);
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
          marginBottom: 10
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
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Service;
