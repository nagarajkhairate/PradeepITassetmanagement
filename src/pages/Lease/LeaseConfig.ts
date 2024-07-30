export interface Field {
    id: number;
    fieldName: string;
    name: string;
    sequence: number;
    components: any;
    isActive: boolean;
    stylings: string;
}

export const LeaseConfig: any[] =  [
            {
                id: 1,
                fieldName: "Lease Begins",
                name: "leaseBegins",
                sequence: 1,
                components:{
                    type:"date"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 2,
                fieldName: "Leasing Customer",
                name: "leasingCustomerId",
                sequence: 2,
                components:{
                    type:'select'
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 3,
                fieldName: "Lease Expires",
                name: "leaseBegins",
                sequence: 3,
                components:{
                    type:"date"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 5,
                fieldName: "Lease Notes",
                name: "leaseNotes",
                sequence: 5,
                components:{
                    type:"text"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 6,
                fieldName: "Send Email",
                name: "sendEmail",
                sequence: 10,
                components:{
                    type:"checkbox"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 7,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 11,
                components:{
                    type:"email"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
           
        ]
