export interface customerValue {
  id: number,
  isVisible: boolean;
  fieldName: string;
  name: string;
  description: string;
  isRequired: string;
}

export interface Option {
  id: number;
  label: string;
  value: string
}

export  interface customField {
  id: number;
  fieldName: string;
  name: string;
  isVisible: string;
  description: string;
  example: string;
  option: Option[];
}




export const customers: customField[] = [
    {
      id: 1,
      fieldName: 'Full Name',
      name: 'fullName',
      isVisible: 'isVisible',
      description: 'Full name of the customer',
      example: 'John Doe',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
      ],
    },
    {
      id: 2,
      fieldName: 'Email',
      name: 'email',
      isVisible: 'isVisible',
      description: 'Email of the customer',
      example: 'johndoe@example.com',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      id: 3,
      fieldName: 'Company',
      name: 'company',
      isVisible: 'isVisible',
      description: 'Customers company name',
      example: 'Jane Doe Company',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      id: 4,
      fieldName: 'Address',
      name: 'address',
      isVisible: 'isVisible',
      description: ' All address fields of the customer',
      example: ' ---',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      id: 5,
      fieldName: 'Phone',
      name: 'phone',
      isVisible: 'isVisible',
      description: 'Phone number of the customer',
      example: '(555) 123-4567',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      id: 6,
      fieldName: 'Mobile Phone',
      name: 'mobilePhone',
      isVisible: 'isVisible',
      description: 'Mobile Cell of the customer',
      example: '	(123) 456-7890',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    {
      id: 7,
      fieldName: 'Notes',
      name: 'notes',
      isVisible: 'isVisible',
      description: 'Text area for notes',
      example: 'Leases equipment for 12 months.',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional',
        },
      ],
    },
    
  ]

  

  export const customerData: customerValue[] = [
    {
      id:1,
      isVisible: true,
      fieldName: 'Full Name',
      name: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:2,
        isVisible: true,
        fieldName: "Email",
        name: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:3,
        isVisible: true,
        fieldName: "Company",
        name: "company",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:4,
        isVisible: true,
        fieldName: "Address",
        name: "address",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:5,
        isVisible: true,
        fieldName: "Phone",
        name: "phone",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:6,
        isVisible: true,
        fieldName: "Mobile Phone",
        name: "mobilePhone",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:7,
        isVisible: true,
        fieldName: "Notes",
        name: "notes",
        isRequired: 'optional',
        description: "string",
    },
]



 
export const customCustomer =[
    {
      fieldName: 'Full Name',
      value:'value',
      componentsId: '',
      isRequired: 'yes',
      
    },
    ]
   
   
    export const BackendData=[
       {
      fieldName: 'Full Name',
      value:'fullName',
      componentsId: '',
      isRequired: 'yes'
    }
    ]
   
   