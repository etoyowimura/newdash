import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Select,
  Space,
  Switch,
} from "antd";
import StatTable from "./StatisticTable";
import { useTeamData } from "../../Hooks/Teams/index";
import Search from "antd/es/input/Search";
import instance from "../../API/api";
import dayjs from "dayjs";
import { statController } from "../../API/LayoutApi/statistic";

const Stat = () => {
  const now = dayjs();
  const { RangePicker } = DatePicker;
  const moment = require("moment");
  const currentDate = moment();
  const nextMonth = currentDate.clone().add(1, "months");
  const start_date = `${currentDate.format("YYYY-MM")}-01 00:00:00`;
  const end_date = `${nextMonth.format("YYYY-MM")}-01 00:00:00`;

  const [id, setId] = useState<string>("");
  const [table, setTable] = useState<boolean>(false);
  const [team, setTeam] = useState<any>("");
  const [characters, setCharacters] = useState<any>();
  const [startDate, setStartDate] = useState(start_date);
  const [endDate, setEndDate] = useState(end_date);

  const teamData = useTeamData("");
  const teamOptions: { label: string; value: any }[] | undefined =
    teamData?.data?.data.map((item: { name: string; id: string }) => ({
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

  const tableSwitch = (stat: any) => {
    setTable(stat);
  };

  const handleSave = () => {
    const trimmedStartDate = startDate.slice(0, 10);
    const trimmedEndDate = endDate.slice(0, 10);
    const fileName = `${trimmedStartDate}-${trimmedEndDate}`;
    if (!table) {
      const teamName = `${team}_${fileName}`
      statController.saveUsersStats(teamName, startDate, endDate, team);
    } else {
      statController.saveTeamStats(fileName, startDate, endDate);
    }
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

  useEffect(() => {
    if (startDate && endDate) {
      if (table === true) {
        const fetchNewData = async () => {
          try {
            const { data }: any = await instance(
              `stats/all-teams/?start_date=${startDate}&end_date=${endDate}&`
            );
            setCharacters(data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchNewData();
      } else {
        const fetchNewData = async () => {
          try {
            const { data }: any = await instance(
              `stats/all-users/?start_date=${startDate}&end_date=${endDate}&name=${id}&team=${team}`
            );
            setCharacters(data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchNewData();
      }
    }
  }, [team, id, table, startDate, endDate]);

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
        <div className="search">
          <Search
            style={{ width: 300 }}
            type="text"
            placeholder="Search by Name"
            onChange={(event) => setId(event.target.value)}
            value={id}
            allowClear
          />
          <Select
            style={{ width: 120, marginLeft: 15 }}
            placeholder="team"
            onChange={(value: any) => setTeam(value)}
            options={teamOptions}
          />
          <Space style={{ paddingLeft: 10 }}>
            {/* <a>by team</a> */}
            <Switch
              unCheckedChildren="teams"
              checkedChildren="users"
              defaultChecked={false}
              onChange={(event) => tableSwitch(event)}
            ></Switch>
          </Space>
        </div>
        <div className="">
          <DatePicker
            onChange={onChangeDate}
            picker="month"
            format={"MMMM"}
            defaultValue={now}
            style={{ marginRight: 10 }}
          />
          <RangePicker onCalendarChange={datePick} />
        </div>
      </span>

      <StatTable data={characters} />
      <Button type="primary" onClick={handleSave}>
        Save as file
      </Button>
    </div>
  );
};

export default Stat;
