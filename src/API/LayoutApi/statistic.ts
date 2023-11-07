import instance from "../api";

export const statController = {
  async read(id: string) {
    const { data }: { data: object } = await instance(`stats/all-users/`);
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async saveUsersStats(fileName: string, startDate: string, endDate: string, team: string) {
    const response = await instance.post(`stats/all-users/?start_date=${startDate}&end_date=${endDate}&team=${team}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Disposition": `attachment;`,
      },
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = `stats_${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    return response.data;
  },
  async saveTeamStats(fileName: string, startDate: string, endDate: string) {
    const response = await instance.post(`stats/all-teams/?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Disposition": `attachment;`,
      },
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = `stats_${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    return response.data;
  },

  async statOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`stats/${Id}`);
    return data;
  },
};
