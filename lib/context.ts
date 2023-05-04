import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
};

const userContext: UserContextType = {
  userId: "",
  setUserId: () => {},
};

export const UserContext = createContext(userContext);
