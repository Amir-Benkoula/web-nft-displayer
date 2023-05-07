import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
};

const userContext: UserContextType = {
  userId: "",
  setUserId: () => {},
};

type ContractContextType = {
  contractId: string;
  setContractId: Dispatch<SetStateAction<string>>;
};

const contractContext: ContractContextType = {
  contractId: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  setContractId: () => {},
};

// To get the state of the connection
export const UserContext = createContext(userContext);

export const ContractContext = createContext(contractContext);
