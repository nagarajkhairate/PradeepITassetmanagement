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

export const checkInConfig: Field[] =  [
            {
                id: 1,
                fieldName: "Check-In from",
                name: "checkInFrom",
                sequence: 1,
                components:11,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 2,
                fieldName: "Return Date",
                name: "returnDate",
                sequence: 2,
                components:3,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 3,
                fieldName: "Send Email",
                name: "sendEmail",
                sequence: 3,
                components:1,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 4,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 4,
                components:6,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 5,
                fieldName: "Site",
                name: "checkInSiteId",
                sequence: 5,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 6,
                fieldName: "Location",
                name: "checkInLocationId",
                sequence: 6,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 7,
                fieldName: "Department",
                name: "checkInDepartmentId",
                sequence: 7,
                components:5,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 8,
                fieldName: "Check-in Notes",
                name: "checkInNotes",
                sequence: 8,
                components:13,
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },           
           
        ]
