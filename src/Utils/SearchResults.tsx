import { useCompanyData } from "../Hooks/Companies";
import { useCustomerData } from "../Hooks/Customers";

type MyStructure = any;

export const SearchResultForCompany = async (query: string) => {
  const data: MyStructure = await useCompanyData(query);
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


export const SearchResultForCustomer = async (query: string) => {
  const data: MyStructure = await useCustomerData(query);
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