import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
};

const userContext: UserContextType = {
  userId: "",
  setUserId: () => {},
};

// To get the state of the connection
export const UserContext = createContext(userContext);
