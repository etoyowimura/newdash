import { useFindCompany } from "../Hooks/Companies";
import { useCustomerData, useFindCustomer } from "../Hooks/Customers";
import { useServiceData } from "../Hooks/Services";
import { useFindByTeam, useStatsData } from "../Hooks/Stats";
import {  useFindTaskCustomer, useTaskData } from "../Hooks/Tasks";
import { useTeamData } from "../Hooks/Teams";
import { useUserData } from "../Hooks/Users";

type MyStructure = any;

export const SearchResultForCompany = async (query: string) => {
  const data: any = await useFindCompany(query);
  console.log(data);
  return data.map((el: any) => {
    const category = `${el.name}`;
    return {
      valId: el.name,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span> {el.name}</span>
        </div>
      ),
    };
  });
};

export const SearchResultForCustomer = async (query: string) => {
  const data: MyStructure = await useFindCustomer(query);
  return data?.map((el: any) => {
    const category = `${el.name}`;
    return {
      valId: el.name,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span>{el.name}</span>
        </div>
      ),
    };
  });
};

// export const SearchResultForTaskCompany = async (query: string) => {
//   const data: MyStructure = await useFindTaskCompany(query);
//   return data?.map((el: any) => {
//     const category = `${el.name}`;
//     return {
//       valId: el.name,
//       value: category,
//       key: el.id,
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//           key={el.id}
//         >
//           <span>{el.name}</span>
//         </div>
//       ),
//     };
//   });
// };
export const SearchResultForTaskCustomer = async (query: string) => {
  const data: MyStructure = await useFindTaskCustomer(query);
  return data?.map((el: any) => {
    const category = `${el.customer_id}`;
    return {
      valId: query,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span>Task #{el.id}</span>
        </div>
      ),
    };
  });
};

export const SearchResultForTeam = async (query: string) => {
  const data: MyStructure = await useTeamData(query);
  const dataArray = Array.from(data.data);
  const dataFor = [{ id: " ", address: "All dispatcher" }, ...dataArray];
  return dataFor?.map((el: any) => {
    const category = `${el.address}`;
    return {
      valId: el.address,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span>Address: {el.address}</span>
        </div>
      ),
    };
  });
};

export const SearchResultForUser = async (query: string) => {
  const data: MyStructure = await useUserData(query);
  const dataArray = Array.from(data.data);
  const dataFor = [{ id: " ", address: "All dispatcher" }, ...dataArray];
  return dataFor?.map((el: any) => {
    const category = `${el.address}`;
    return {
      valId: el.address,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span>Address: {el.address}</span>
        </div>
      ),
    };
  });
};

export const SearchResultForStat = async (query: string) => {
  const data: MyStructure = await useFindByTeam(query);
  const dataArray = Array.from(data.data);
  const dataFor = [{ id: " ", address: "All teams" }, ...dataArray];
  return dataFor?.map((el: any) => {
    const category = `${el.team}`;
    return {
      valId: el.team,
      value: category,
      key: el.id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={el.id}
        >
          <span>Team: {el.team}</span>
        </div>
      ),
    };
  });
};