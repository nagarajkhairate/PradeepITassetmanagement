export interface Field {
    id: number;
    fieldName: string;
    name: string;
    sequence: number;
    components: any;
    isRequired: boolean;
    isActive: boolean;
    stylings: string;
}

export const checkInConfig: any[] =  [
            {
                id: 1,
                fieldName: "Check-In from",
                name: "checkInFrom",
                sequence: 1,
                components:
                { 
                      id:11,
                    type:'radio'
                },
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 2,
                fieldName: "Return Date",
                name: "checkInDate",
                sequence: 2,
                components: { 
                    id:3,
                  type:'date'
              },
                isRequired: true,
                isActive: true,
                stylings: "width:400px"
            },
            {
                id: 3,
                fieldName: "Send Email",
                name: "sendEmail",
                sequence: 3,
                components:
                { 
                    id:1,
                  type:'checkbox'
              },
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 4,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 4,
                components: { 
                    id:6,
                  type:'email'
              },
                isRequired: true,
                isActive: true,
                stylings: "width:400px"
            },
            {
                id: 5,
                fieldName: "Site",
                name: "checkInSiteId",
                sequence: 5,
                components: { 
                    id:5,
                  type:'select'
              },
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 6,
                fieldName: "Location",
                name: "checkInLocationId",
                sequence: 6,
                components:{ 
                    id:5,
                  type:'select'
              },
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 7,
                fieldName: "Department",
                name: "checkInDepartmentId",
                sequence: 7,
                components:{ 
                    id:5,
                  type:'select'
              },
                isRequired: true,
                isActive: true,
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 8,
                fieldName: "Check-in Notes",
                name: "checkInNotes",
                sequence: 8,
                components:{ 
                    id:15,
                  type:'textarea'
              },
                isRequired: true,
                isActive: true,
                stylings: "width:400px"
            },           
           
        ]
