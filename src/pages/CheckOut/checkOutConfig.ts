export interface Field {
    id: number;
    fieldName: string;
    name: string;
    sequence: number;
    components: number;
    isRequired: boolean;
    isActive: boolean;
    stylings: string;
}


export const checkOutConfig: Field[] =  [
            {
                id: 1,
                fieldName: "Check-out Date",
                name: "checkOutDate",
                sequence: 1,
                components:3,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 2,
                fieldName: "Check-out to",
                name: "checkOutTo",
                sequence: 2,
                components:11,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 3,
                fieldName: "Assign to",
                name: "assignedTo",
                sequence: 3,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 4,
                fieldName: "Client Name",
                name: "clientId",
                sequence: 4,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 5,
                fieldName: "Due date",
                name: "dueDate",
                sequence: 5,
                components:3,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 6,
                fieldName: "Site",
                name: "checkOutSiteId",
                sequence: 6,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 7,
                fieldName: "Location",
                name: "checkOutLocationId",
                sequence: 7,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 8,
                fieldName: "Department",
                name: "checkOutDepartmentId",
                sequence: 8,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 9,
                fieldName: "Check-out Notes",
                name: "checkOutNotes",
                sequence: 9,
                components:13,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 10,
                fieldName: "Send Email",
                name: "sendEmail",
                sequence: 10,
                components:1,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 11,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 11,
                components:6,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
           
        ]
