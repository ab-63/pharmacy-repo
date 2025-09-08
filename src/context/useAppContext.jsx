import { useContext } from "react";
import { Context } from "./ContextProvider";

function useAppContext() {
  return useContext(Context);
}

export default useAppContext;
