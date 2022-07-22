import { useContext } from "react";
import AccountsContext from "../context/AccountsContext";

export default function useBalances() {
  return useContext(AccountsContext);
}
