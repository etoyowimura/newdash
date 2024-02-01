import { useState } from "react";
import { useUserData } from "../../Hooks/Users";
import { Button, Select } from "antd";
import UserTable from "./UserTable";
import Search from "antd/es/input/Search";
import { useTeamData } from "../../Hooks/Teams";
import { useRoleData } from "../../Hooks/Role";
import AddUser from "./AddUser";

const User = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [team, setTeam] = useState<string | undefined>(undefined)
  const [userRole, setUserRole] = useState<string | undefined>(undefined)
  const showModal = () => {
    setOpen(true);
  };

  const { data, refetch, isLoading } = useUserData({ name: name, team: team, role: userRole });
  const teamData = useTeamData('');
  const roleData = useRoleData();
  const updatedRoleData = roleData?.data?.filter(item => item.name !== 'Owner');
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
        {open && <AddUser refetch={refetch} open={open} setOpen={setOpen} />}
        <div style={{ width: "60%", display: "flex", justifyContent:"space-between",alignItems: "center"  }}>
          <Search
            type="text"
            placeholder="Search by Users"
            onChange={(event) => setName(event.target.value)}
            value={name}
            allowClear
          />
          <Select
            mode="multiple"
            style={{ width: "100%", marginLeft: 10 }}
            options={teamData?.data?.map((u) => ({
              label: u.name,
              value: u.id,
            }))}
            placeholder="Filter by Teams"
            onChange={(value) => setTeam(value)}
          />
          <Select
            // mode="multiple"
            style={{ width: "100%", marginLeft: 10 }}
            options={updatedRoleData?.map((u) => ({
              label: u.name,
              value: u.name,
            }))}
            placeholder="Filter by Roles"
            onChange={(value) => setUserRole(value)}
          />
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
        >
          Invite User
        </Button>
      </span>
      <UserTable data={data} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default User;
