import { UserProps } from "./User";

export interface SessionStoreProps {
  session: UserProps | null;
  setSession: (session: UserProps | null) => void;
}
