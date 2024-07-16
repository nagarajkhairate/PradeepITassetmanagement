export const Contract = [
    {
      id: 1,
      fieldName: 'Contract Title',
      value: 'contractTitle',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Title of Contract',
      example: 'Notebooks Annual Contract',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      id: 2,
      fieldName: 'Description',
      value: 'description',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Description of the contract.',
      example: 'Maintenance Contract for Marketing department Notebooks',
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
      fieldName: 'Hyperlink',
      value: 'hyperlink',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'HyperLink of Contract',
      example: 'https://www.example.com',
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
      fieldName: 'Contract No.',
      value: 'contractNo',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Contract No.',
      example: ' AMC984763',
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
      fieldName: 'Cost',
      value: 'cost',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Cost of Contract',
      example: '$499.95',
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
      fieldName: 'Start Date',
      value: 'startDate',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Start Date of Contract',
      example: '7/4/2020',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      id: 7,
      fieldName: 'End Date',
      value: 'endDate',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'End Date of Contract',
      example: '	7/3/2021',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      id: 8,
      fieldName: 'No End Date',
      value: 'noEndDate',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'No End Date',
      example: 'No',
    },
    {
      id: 9,
      fieldName: 'Vendor',
      value: 'vendor',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Vendor of Contract',
      example: 'CompuByte Computer Services',
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
      id: 10,
      fieldName: 'Contract Person',
      value: 'contract person',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Contact Person',
      example: 'James Brown',
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
      id: 11,
      fieldName: 'Phone',
      value: 'phone',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Phone',
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
      id: 12,
      fieldName: 'No. of Licenses',
      value: 'noOfLicenses',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'No. of Licenses',
      example: '10',
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
      id: 13,
      fieldName: 'Is Software',
      value: 'isSoftware',
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Is Contract a Software ?',
      example: 'No',
    },
    
  ]

  export const contractData = [
    {
      visible: true,
      fieldName: 'Contract Title',
      name: 'contractTitle',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Description",
        name: "description",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Hyperlink",
        name: "hyperlink",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Contract No.",
        name: "contractNo",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Cost",
        name: "cost",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Start Date",
        name: "startDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "End Date",
        name: "endDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "No End Date",
        name: "noEndDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Vendor",
        name: "vendor",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Contract Person",
        name: "contractPerson",
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
        fieldName: "No. of Licenses",
        name: "noOfLicenses",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Is Software",
        name: "isSoftware",
        isRequired: 'optional',
        description: "string",
    },
    
    
]



 
export const customContract =[
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
  