import { useEffect, useState } from "react";
import { useStatsData } from "../../Hooks/Stats";
import { Button, Select } from "antd";
import StatTable from "./StatisticTable";
import { useTeamData } from '../../Hooks/Teams/index';
import { teamController } from "../../API/LayoutApi/teams";


type Data = {
  data?: {
    data: Array<any>;
    count: number | string;
  };
  isLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
};
const Stat = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const { data, isLoading, refetch, isFetching }: Data = useStatsData(id);
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
      </span>

      <StatTable
        data={data?.data}
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Stat;
