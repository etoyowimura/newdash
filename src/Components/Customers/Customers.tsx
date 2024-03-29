import { useState } from "react";
import AddCustomer from "./AddCustomer";
import { Button, Radio, RadioChangeEvent } from "antd";
import CustomerTable from "./CustomersTable";
import Search from "antd/es/input/Search";
import { useCustomerData } from "../../Hooks/Customers";
import { isMobile, role } from "../../App";

const Customer = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState<boolean>();
  const { isLoading, data, refetch } = useCustomerData({
    name: name,
    is_active: isActive,
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
        {open && (
          <AddCustomer refetch={refetch} open={open} setOpen={setOpen} />
        )}
            <div className="search">
              <Search
                type="text"
                placeholder={"Search Customer"}
                onChange={(event) => setName(event.target.value)}
                value={name}
                size={isMobile ? "small" : "middle"}
              />
            </div>
            {!isMobile && (<Radio.Group
              onChange={(e: RadioChangeEvent) => setIsActive(e.target.value)}
              size="middle"
              value={isActive}
              style={{ marginLeft: 20 }}
            >
              <Radio.Button value={undefined}>All</Radio.Button>
              <Radio.Button value={true}>Active</Radio.Button>
              <Radio.Button value={false}>Inactive</Radio.Button>
            </Radio.Group>)}
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={isMobile ? 'small' : "middle"}
          onClick={showModal}
          disabled={role === "Checker"}
        >
          Add
        </Button>
      </span>

      <CustomerTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default Customer;
