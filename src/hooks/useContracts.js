import { useContext } from "react";
import ContractsContext from "../context/ContractsContext";

export default function useContracts() {
  return useContext(ContractsContext);
}
