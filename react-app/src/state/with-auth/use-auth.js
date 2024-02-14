import { useContext } from "react";
import { AuthContext } from "./with-auth";

export const useAuth = () => {
  const data = useContext(AuthContext);

  return {
    ...data,
    isLoading: data.loading,
    hasError: data.error !== null,
    needLogin: data.token === null
  };
};
