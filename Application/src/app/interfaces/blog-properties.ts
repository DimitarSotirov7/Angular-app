import { IDiscussionProperties } from "./discussion-properties";

export interface IBlogProperties {
    categoryName: string,
    question: string,
    createdByDoc: string,
    createdByFullName: string, 
    users: IDiscussionProperties[]
}