import { useState } from "react";
import { useTeamData } from "../../Hooks/Teams";
import AddTeam from "./AddTeam";
import { Button } from "antd";
import TeamTable from "./TeamTable";


const Team = () => {
  const { data, isLoading, refetch } = useTeamData('');
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
          marginBottom: 6
        }}
      >
        {open && <AddTeam refetch={refetch} open={open} setOpen={setOpen} />}

        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"middle"}
          onClick={showModal}
        >
          Add
        </Button>
      </span>

      <TeamTable
        data={data}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default Team;
