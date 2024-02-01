import { useState } from "react";
import { statController } from "../../API/LayoutApi/statistic";
import { useTeamData } from "../../Hooks/Teams/index";
import {
  useCardData,
  useCreatorsData,
  useStatTeamData,
  useStatsData,
} from "../../Hooks/Stats";
import { TStatTeam } from "../../types/Statistic/TStat";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { Button, DatePicker, DatePickerProps, Select, Switch } from "antd";
import BarStat from "./BarStat";
import StatTable from "./StatisticTable";
import BarCreatorsStat from "./BarCreatorsStat";
import StatTeamTable from "./StatisticTeamTable";

const Stat = () => {
  const now = dayjs();
  const { RangePicker } = DatePicker;
  const moment = require("moment");
  const currentDate = moment();
  const nextMonth = currentDate.clone().add(1, "months");
  const start_date = `${currentDate.format("YYYY-MM")}-01 00:00:00`;
  const end_date = `${nextMonth.format("YYYY-MM")}-01 00:00:00`;

  const [name, setName] = useState<string>("");
  const [team, setTeam] = useState<any>("");
  const [startDate, setStartDate] = useState(start_date);
  const [endDate, setEndDate] = useState(end_date);
  const [table, setTable] = useState(false)
  const teamData = useTeamData("");
  const teamOptions: { label: string; value: any }[] | undefined =
    teamData?.data?.map((item) => ({
      label: item?.name,
      value: item?.name,
    }));
  const additionalOption = {
    label: "all",
    value: "",
  };
  if (teamOptions) {
    teamOptions.unshift(additionalOption);
  }

  const handleSave = () => {
    const trimmedStartDate = startDate.slice(0, 10);
    const trimmedEndDate = endDate.slice(0, 10);
    const fileName = `${trimmedStartDate}-${trimmedEndDate}`;
    const teamName = `${team}_${fileName}`;
    statController.saveUsersStats(teamName, startDate, endDate, team);
  };

  const datePick = (a: any, b: any) => {
    if (b[0] && b[1]) {
      setStartDate(`${b[0]} 00:00:00`);
      setEndDate(`${b[1]} 00:00:00`);
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    if (!date) {
      setStartDate("");
      setEndDate("");
    } else {
      const firstDate = date;
      const secondDate = date?.add(1, "month");
      const yearStart = Number(firstDate?.year());
      const monthStart = Number(firstDate?.month()) + 1;
      const yearEnd = Number(secondDate?.year());
      const monthEnd = Number(secondDate?.month()) + 1;

      setStartDate(`${yearStart}-${monthStart}-01 00:00:00`);
      setEndDate(`${yearEnd}-${monthEnd}-01 00:00:00`);
    }
  };

  const { data, isLoading } = useStatsData({
    name: name,
    team: team,
    start_date: startDate,
    end_date: endDate,
  });
  interface DataType {
    data?: TStatTeam[];
    isLoading: boolean;
  }
  const TeamData: DataType = useStatTeamData({
    name: "",
    start_date: startDate,
    end_date: endDate,
  });
  const CreatorsData: DataType = useCreatorsData({
    start_date: startDate,
    end_date: endDate,
  });

  const { data: cardData } = useCardData({
    start_date: startDate,
    end_date: endDate,
  });

  return (
    <div>
      <div>
        <DatePicker
          onChange={onChangeDate}
          picker="month"
          format={"MMMM"}
          defaultValue={now}
          size="small"
          style={{ marginRight: 10 }}
        />
        <RangePicker size="small" onCalendarChange={datePick} />
      </div>
      <div className="mainStat">
        <div className="mainstat-left">
          <div className="mainstat-card">
            <Switch
              size="small"
              checkedChildren="table"
              unCheckedChildren="graph"
              onChange={e => setTable(!table)}
            />
            {
              table ?
                <StatTeamTable data={TeamData?.data} isLoading={isLoading}/>
              :
              <BarStat data={TeamData?.data} />
            }
          </div>
          <div className="mainstat-card">
            <div className="cards">
              <div style={{ marginTop: -150 }} className="card_stat">
                Active Tasks<span>{cardData?.active_tasks}</span>
                {cardData?.active_tasks_percentage}%
              </div>
              <div style={{ marginTop: 150 }} className="card_stat">
                Total: <span>{cardData?.all_tasks}</span>tasks
              </div>
              <div style={{ marginTop: -150 }} className="card_stat">
                Inactive Tasks<span>{cardData?.inactive_tasks}</span>
                {cardData?.inactive_tasks_percentage}%
              </div>
            </div>
          </div>
        </div>
        <div className="mainstat-right">
          <div className="mainstat-card">
            <Search
              style={{ width: "45%", marginBottom: 10 }}
              type="text"
              placeholder="Search by Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              allowClear
              size="small"
            />
            <Select
              style={{ width: "25%", marginLeft: 15 }}
              placeholder="team"
              onChange={(value: any) => {
                setTeam(value);
              }}
              options={teamOptions}
              size="small"
            />
            <Button
              type="primary"
              size="small"
              style={{ fontWeight: 300, marginLeft: 15 }}
              onClick={handleSave}
            >
              Save as file
            </Button>
            <StatTable data={{ data }} isLoading={isLoading} />
          </div>
          <div className="mainstat-card">
            <BarCreatorsStat data={CreatorsData.data} />
          </div>
        </div>
      </div>

      {/* <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div
          className="search"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <DatePicker
              onChange={onChangeDate}
              picker="month"
              format={"MMMM"}
              defaultValue={now}
              size={isMobile ? "small" : "small"}
              style={{ marginRight: 10 }}
            />
            {!isMobile && <RangePicker onCalendarChange={datePick} />}
          </div>
        </div>
      </span> */}
    </div>
  );
};

export default Stat;
