import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { Button } from "antd";
import TaskTable from "./TaskTable";
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
const isSuper = localStorage.getItem("isSuperUser");
const Task = () => {
  const [skip, setSkip] = useState(0);
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const onChange = (query: any) => {
    setSkip(10 * (parseInt(query.current) - 1));
  };
  const showModal = () => {
    setOpen(true);
  };

  const [characters, setCharacters] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>([]);
  const [refetch, setRefetch] = useState<any>([]);
  const [isFetching, setIsFetching] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, isLoading, refetch, isFetching }: Data = await instance(`tasks/?customer=${id}`)
        setCharacters(data)
        setIsLoading(isLoading)
        setRefetch(refetch)
        setIsFetching(isFetching)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [id])
  console.log(characters);

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {open && <AddTask refetch={refetch} open={open} setOpen={setOpen} />}
        {/* <SearchOptions
          SearchResult={(query: string) => SearchResultForTaskCustomer(query)}
          onSelect={(value: any, { valId }: { valId: string }) => {
            setId(valId === undefined ? "" : valId);
            if (valId) {
              setSkip(1);
            }
          }}
          placeholder="Company"
        /> */}
        <div className="search">
          <input type="text"
            placeholder={"Search by customer"}
            className={"input"}
            onChange={event => setId(event.target.value)}
            value={id}
          />
        </div>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          size={"large"}
          onClick={showModal}
          disabled={isSuper === "false"}
        >
          Add Task
        </Button>
      </span>

      <TaskTable
        data={characters}
        onChange={onChange}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default Task;
