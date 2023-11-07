import { useState } from "react";
import { useUserData } from "../../Hooks/Users";
import AddUser from "./AddUser";
import { Button, Select } from "antd";
import UserTable from "./UserTable";
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
const User = () => {
  const [open, setOpen] = useState(false);
  const [name, setName]= useState('');
  const [team, setTeam] = useState('');
  const showModal = () => {
    setOpen(true);
  };

  const {data, refetch, isLoading} = useUserData({name: name, team: team})


  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {open && <AddUser open={open} setOpen={setOpen} />}
        <Search
          style={{ width: "20%" }}
          type="text"
          placeholder="Search by Users"
          onChange={(event) => setName(event.target.value)}
          value={name}
          allowClear
        />
        <Select
          // options={
            
          // }
        >
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
        >
          Add User
        </Button>
      </span>
      <UserTable
        data={data}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default User;
