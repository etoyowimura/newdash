import { useState } from "react";
import AddUpdate from "./AddUpdate";
import { Button, Select } from "antd";
import UpdateTable from "./UpdateTable";
import { useUpdateData } from "../../Hooks/Update";

const Update = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<any>(['New', 'In Progress', 'Paper', 'Setup']);
  const { Option } = Select;
  
  const {data, refetch, isLoading} = useUpdateData(status)
  
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
          marginBottom: 6,
        }}
      >
        {open && <AddUpdate open={open} setOpen={setOpen} />}
        <Select
          style={{ width: "40%", marginLeft: 10 }}
          placeholder="status"
          onChange={(value: any) => setStatus(value)}
          mode="multiple"
          defaultValue={['New', 'In Progress', 'Paper', 'Setup']} 
        >
          <Option value="New">New</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
          <Option value="Paper">Paper</Option>
          <Option value="Setup">Setup</Option>
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
        >
          Add Update
        </Button>
      </span>

      <UpdateTable data={data} refetch={refetch} isLoading={isLoading} />
    </div>
  );
};

export default Update;
