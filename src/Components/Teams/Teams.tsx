import { useState } from "react";
import { useTeamData } from "../../Hooks/Teams";
import AddTeam from "./AddTeam";
import { Button } from "antd";
import TeamTable from "./TeamTable";

type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const Team = () => {
  const { data, isLoading, refetch, isFetching }: Data = useTeamData('');
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
          size={"large"}
          onClick={showModal}
        >
          Add Team
        </Button>
      </span>

      <TeamTable
        data={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Team;
