import { useEffect, useState } from "react";
import { useUserData } from "../../Hooks/Users";
import AddUser from "./AddUser";
import { Button } from "antd";
import UserTable from "./UserTable";
import Search from "antd/es/input/Search";
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
const User = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const [characters, setCharacters] = useState<any>([]);
  const [name, setName] = useState<any>("");
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const { data }: Data = await instance(`users/admins/?name=${name}`);
        setCharacters(data);
      } catch (error) {}
    };
    fetchData();
  }, [name]);

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
          placeholder="Search by Customer"
          onChange={(event) => setName(event.target.value)}
          value={name}
          allowClear
        />
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
        data={characters}
      />
    </div>
  );
};

export default User;
