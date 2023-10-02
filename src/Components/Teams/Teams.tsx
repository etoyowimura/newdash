import { useState } from "react";
import { useTeamData } from "../../Hooks/Teams";
import AddTeam from "./AddTeam";
import { Button } from "antd";
import SearchOptions from "../../Utils/SearchOptions";
import {
  SearchResultForTeam,
} from "../../Utils/SearchResults";
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
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const { data, isLoading, refetch, isFetching }: Data = useTeamData(id);
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
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Team;
