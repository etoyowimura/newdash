import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { Button, Input, Select, Upload } from 'antd';
import TaskTable from "./TaskTable";
import instance from "../../API/api";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
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
const { Option } = Select;
const isSuper = localStorage.getItem("isSuperUser");
const Task = () => {
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState<any>(1);
  const onChange = (query: any) => {
    if (query.loadings !== 1) {
      const a = query.loadings;
      setSkip(a);
    }
    if (query.prev !== undefined) {
      const a = query.prev;
      setCharacters(a);
    }
  };

  const [characters, setCharacters] = useState<any>([]);
  const [id, setId] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const fetchData = async (apiEndpoint: string) => {
    try {
      const { data }: Data = await instance(apiEndpoint);
      setCharacters(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //         const fetchNewData = async () => {
  //           try {
  //             const { data }: Data = await instance(`tasks/?page=1`);
  //             setCharacters(data?.data);
  //           } catch (error) {
  //             console.error(error);
  //           }
            
  //         };
  //         fetchNewData();
  //       }, 3000);
  //       return () => {
  //         clearInterval(intervalId);
  //       }
  // }, [])

  useEffect(() => {
    if (id !== "") {
      fetchData(`tasks/?customer=${id}`);
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`tasks/?customer=${id}`);
          setCharacters(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNewData()
    }
    if (id === "") {
      fetchData(`tasks/?page=1`);
    }
  }, [id]);

  useEffect(() => {
    if (status !== '') {
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`tasks/?status=${status}`);
          setCharacters(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNewData()
    } else {
      fetchData(`tasks/?page=1`);
    }
  }, [status]);

  useEffect(() => {
    if(status === 'all' || status === '' && id === '' ){const intervalId = setInterval(() => {
      const now = moment();
      const formattedTimeMinusFiveSeconds = now.subtract(5, 'seconds').format('YYYY-MM-DDTHH:mm:ss');
      const fetchNewData = async () => {
        try {
          const { data }: any = await instance(`tasks/new/?time=${formattedTimeMinusFiveSeconds}`);
          // setCharacters((prevCharacters: Array<any>) => {
          //   const updatedCharacters = prevCharacters.map((prevChar) => {
          //     const matchingDataItem = data?.data.find((dataItem) => dataItem.id === prevChar.id);
          //     if (matchingDataItem) {
          //       return matchingDataItem;
          //     }
          //     return prevChar;
          //   });
          //   data?.data.forEach((dataItem) => {
          //     if (!updatedCharacters.some((prevChar) => prevChar.id === dataItem.id)) {
          //       updatedCharacters.unshift(dataItem);
          //     }
          //   });
          //     const trimmedCharacters = updatedCharacters.slice(0, 20);
          //     return trimmedCharacters;
          // });

          setCharacters((prev: any) => {
            let i = 0;
              data?.data.forEach((a:any) => { 
                prev.forEach((b:any) => {
                  if(a.id === b.id){
                    console.log(a.id);
                    i++;
                    const index = prev.findIndex((object: any) => object.id === a.id);
                    if (index !== -1) {
                      prev.splice(index, 1);
                    }
                    // return [...data?.data, ...prev.slice(0, prev.length - data?.data.length)]
                  }
                })
              })
              if(data?.data.length > 0){
                const j = data?.data.length - i;
                const indexdata = [...data?.data, ...prev.slice(0, prev.length - j)];
                return indexdata;
              }else{
                const indexdata = [...data?.data, ...prev];
                return indexdata;
              }
            // }
          });
        } catch (error) {
          console.error(error);
        }
        
      };
      fetchNewData();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };}
  }, [status, id]);

  const showModal = () => {
    setOpen(true);
  };
  const [length, setLength] = useState<any>();
  useEffect(() => {
    setLength(characters)
  }, [characters])

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {open && <AddTask open={open} setOpen={setOpen} />}
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
          <Search
            type="text"
            placeholder="Search by Customer"
            onChange={event => setId(event.target.value)}
            value={id}
            allowClear
          />
        </div>
        <div className="status">
          <Select
            style={{ width: 120, marginLeft: 15 }}
            placeholder='status'
            onChange={(value: any) => setStatus(value)}
          >
            <Option value="all">all</Option>
            <Option value="New">New</Option>
            <Option value="Checking">Checking</Option>
            <Option value="Done">Done</Option>
            <Option value="Do PTI">Do PTI</Option>
            <Option value="No need PTI">No need PTI</Option>
          </Select>
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
        data={{ data: characters }}
        onChange={onChange}
      />
    </div>
  );
};

export default Task;
