import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
    userToken: string;
    setUserToken: Dispatch<SetStateAction<string>>;
}

const UserTokenContext = createContext<UserContextType | undefined>(undefined);

export default UserTokenContext;
