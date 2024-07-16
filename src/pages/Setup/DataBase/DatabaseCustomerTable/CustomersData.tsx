export const Customers = [
    {
      id: 1,
      fieldName: 'Full Name',
      value: 'fullName',
      isVisible: 'visible',
      isRequired: true,
      description: 'Full name of the customer',
      example: 'John Doe',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      id: 2,
      fieldName: 'Email',
      value: 'email',
      isVisible: 'visible',
      isRequired: false,
      description: 'Email of the customer',
      example: 'johndoe@example.com',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    {
      id: 3,
      fieldName: 'Company',
      value: 'company',
      isVisible: 'visible',
      isRequired: false,
      description: 'Customers company name',
      example: 'Jane Doe Company',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    {
      id: 4,
      fieldName: 'Address',
      value: 'address',
      isVisible: 'visible',
      isRequired: false,
      description: ' All address fields of the customer',
      example: ' ---',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    {
      id: 5,
      fieldName: 'Phone',
      value: 'phone',
      isVisible: 'visible',
      isRequired: false,
      description: 'Phone number of the customer',
      example: '(555) 123-4567',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    {
      id: 6,
      fieldName: 'Mobile Phone',
      value: 'mobilePhone',
      isVisible: 'visible',
      isRequired: false,
      description: 'Mobile Cell of the customer',
      example: '	(123) 456-7890',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    {
      id: 7,
      fieldName: 'Notes',
      value: 'notes',
      isVisible: 'visible',
      isRequired: false,
      description: 'Text area for notes',
      example: 'Leases equipment for 12 months.',
      option: [
        {
          id: 1,
          value: 'yes',
        },
        {
          id: 2,
          value: 'optional',
        },
      ],
    },
    
  ]

  export const customerData = [
    {
      isVisible: true,
      fieldName: 'Full Name',
      name: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Email",
        name: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Company",
        name: "company",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Address",
        name: "address",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Phone",
        name: "phone",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Mobile Phone",
        name: "mobilePhone",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Notes",
        name: "notes",
        isRequired: 'optional',
        description: "string",
    },
]



 
export const customCustomer =[
    {
      fieldName: 'fieldName',
      name:'name',
      componentsId: 1,
      isRequired: 'isRequired',
      
    },
    ]
   
   
    export const BackendData=[
       {
      fieldName: 'full Name',
      name:'fullName',
      componentsId: 1,
      isRequired: 'yes'
    }
    ]
   
   