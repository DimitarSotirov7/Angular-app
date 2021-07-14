export interface IBlogProperties {
    categoryDoc: string,
    categoryName: string,
    questionName: string,
    createdByDoc: string,
    createdByFullName: string, 
    users: [
        {
            doc: string,
            fullName: string,
            answer: string
        }
    ]
}