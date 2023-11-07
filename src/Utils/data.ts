export const clear_local_storage = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isSuperUser");
    localStorage.removeItem("user_count");
    localStorage.removeItem("fmcsa_count");
    document.location.replace("/");
  };
  