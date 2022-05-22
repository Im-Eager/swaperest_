import { createContext } from "react";
import { Session } from "../pages/index"

const SessionContext = createContext({_id: "defaultSession"} as Session);

export { SessionContext };