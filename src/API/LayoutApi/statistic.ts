import instance from "../api";

export const statController = {
  async read(id:string) {
    const { data }: { data: object } = await instance(
      `stats/all-admins/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async statOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`stats/${Id}`);
    return data;
  },
  async statFinderId(team: string) {
    const { data }: { data: Array<any> } = await instance(
      `stats/by-team/${team}`
    );
    return data;
  },
};
