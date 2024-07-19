export const Contract = [
    {
      id: 1,
      fieldName: 'Contract Title',
      value: 'contractTitle',
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
      isRequired: 'optional',
      description: 'No End Date',
      example: 'No',
    },
    {
      id: 9,
      fieldName: 'Vendor',
      value: 'vendor',
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
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
      visible: 'visible',
      isRequired: 'optional',
      description: 'Is Contract a Software ?',
      example: 'No',
    },
    
  ]

  export const contractData = [
    {
      visible: true,
      fieldName: 'Contract Title',
      value: 'contractTitle',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Description",
        value: "description",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Hyperlink",
        value: "hyperlink",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Contract No.",
        value: "contractNo",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Cost",
        value: "cost",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Start Date",
        value: "startDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "End Date",
        value: "endDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "No End Date",
        value: "noEndDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Vendor",
        value: "vendor",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Contract Person",
        value: "contractPerson",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Phone",
        value: "phone",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "No. of Licenses",
        value: "noOfLicenses",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Is Software",
        value: "isSoftware",
        isRequired: 'optional',
        description: "string",
    },
    
    
]



 
export const customContract =[
    {
      fieldName: 'fieldName',
      value:'value',
      componentsId: 1,
      isRequired: 'isRequired',
      
    },
    ]
   
   
    export const BackendData=[
       {
      fieldName: 'full Name',
      value:'fullName',
      componentsId: 1,
      isRequired: 'yes'
    }
    ]
  