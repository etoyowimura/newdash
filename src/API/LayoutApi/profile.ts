import instance from "../api";

export const prof = {
  async read() {
    const { data }: { data: object } = await instance(
      `stats/my-stats/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async self() {
    const { data }: { data: object } = await instance(
      `users/my-profile/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async profPatch(profData: any) {
    const key = "updatable";

    const { data }: { data: any } = await instance(`users/my-profile/`, {
      method: "PUT",
      data: profData,
    }).then((u) => {
      return u;
    });
    return data;
  },

};
