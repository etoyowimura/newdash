export const clear_local_storage = (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role")
    localStorage.removeItem("user_count");
    document.location.replace("/");
  };
  