export interface StatusProps {
  statusCode: Status;
  description: string;
  color: string;
}

export enum Status {
  COMPLETED = "COMPLETED",
  NEW = "NEW",
  CANCELED = "CANCELED",
}
