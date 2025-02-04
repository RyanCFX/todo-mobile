import { StatusProps } from "./Status"
import { UserProps } from "./User"

export interface TaskProps {
    "taskId": string
    "title": string
    "description": string
    "createdAt": string
    "createdBy": UserProps
    "status": StatusProps
}