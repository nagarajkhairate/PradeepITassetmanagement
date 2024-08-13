export interface Field {
    id: number;
    fieldName: string;
    name: string;
    sequence: number;
    components: any;
    isActive: boolean;
    stylings: string;
}

export const LeaseReturnConfig: any[] =  [
            {
                id: 1,
                fieldName: "Return Date",
                name: "returnDate",
                sequence: 1,
                components:{
                    type:"date"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 2,
                fieldName: "Send Email",
                name: "email",
                sequence: 2,
                components:{
                    type:"checkbox"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },         
            {
                id: 3,
                fieldName: "Lease return Notes",
                name: "leaseReturnNotes",
                sequence: 3,
                components:{
                    type:"textarea"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
            {
                id: 4,
                fieldName: "Enter Email Address",
                name: "emailAddress",
                sequence: 4,
                components:{
                    type:"email"
                },
                stylings: "{xs: 12, sm: 6, md: 4, lg: 3}"
            },
           
        ]
