export interface contractValue {
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

export  interface AssetField {
  id: number;
  fieldName: string;
  name: string;
  isVisible: string;
  description: string;
  example: string;
  option: Option[];
}


export const contract: AssetField[] = [
  {
    id: 1,
    fieldName: 'Contract Title',
    name: 'contractTitle',
    isVisible: 'isVisible',
    description: 'Title of Contract',
    example: 'Notebooks Annual Contract',
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
    fieldName: 'Description',
    name: 'description',
    isVisible: 'isVisible',
    description: 'Description of the contract.',
    example: 'Maintenance Contract for Marketing department Notebooks',
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
    fieldName: 'Hyperlink',
    name: 'hyperlink',
    isVisible: 'isVisible',
    description: 'HyperLink of Contract',
    example: 'https://www.example.com',
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
    fieldName: 'Contract No.',
    name: 'contractNo',
    isVisible: 'isVisible',
    description: 'Contract No.',
    example: ' AMC984763',
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
    fieldName: 'Cost',
    name: 'cost',
    isVisible: 'isVisible',
    description: 'Cost of Contract',
    example: '$499.95',
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
    fieldName: 'Start Date',
    name: 'startDate',
    isVisible: 'isVisible',
    description: 'Start Date of Contract',
    example: '7/4/2020',
    option: [
      {
        id: 1,
        label: 'Yes',
        value: 'yes',
      },
    ],
  },
  {
    id: 7,
    fieldName: 'End Date',
    name: 'endDate',
    isVisible: 'isVisible',
    description: 'End Date of Contract',
    example: '	7/3/2021',
    option: [
      {
        id: 1,
        label: 'Yes',
        value: 'yes',
      },
    ],
  },
  {
    id: 8,
    fieldName: 'No End Date',
    name: 'noEndDate',
    isVisible: 'isVisible',
    description: 'No End Date',
    example: 'No',
    option: [
      {
        id: 1,
        label:'Yes',
        value: 'yes',
      },
    ],
  },
  {
    id: 9,
    fieldName: 'Vendor',
    name: 'vendor',
    isVisible: 'isVisible',
    description: 'Vendor of Contract',
    example: 'CompuByte Computer Services',
    option: [
        {
          id: 1,
          label:'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label:'Optional',
          value: 'optional',
        },
      ],
  },
  {
    id: 10,
    fieldName: 'Contract Person',
    name: 'contractPerson',
    isVisible: 'isVisible',
    description: 'Contact Person',
    example: 'James Brown',
    option: [
        {
          id: 1,
          label:'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label:'Optional',
          value: 'optional',
        },
      ],
  },
  {
    id: 11,
    fieldName: 'Phone',
    name: 'phone',
    isVisible: 'isVisible',
    description: 'Phone',
    example: '(555) 123-4567',
    option: [
        {
          id: 1,
          label:'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label:'Optional',
          value: 'optional',
        },
      ],
  },
  {
    id: 12,
    fieldName: 'No. of Licenses',
    name: 'noofLicenses',
    isVisible: 'isVisible',
    description: 'No. of Licenses',
    example: '10',
    option: [
        {
          id: 1,
          label:'Yes',
          value: 'yes',
        },
        {
          id: 2,
          label:'Optional',
          value: 'optional',
        },
      ],
  },
  {
    id: 13,
    fieldName: 'Is Software',
    name: 'isSoftware',
    isVisible: 'isVisible',
    description: 'Is Contract a Software ?',
    example: 'No',
    option: [
      
      {
        id: 2,
        label:'Yes',
        value: 'yes',
      },
    ],
  },
]

export const contractData: contractValue[] = [
  {
      id:1,
    isVisible: true,
    fieldName: 'Contract Title',
    name: 'contractTitle',
    description: 'string',
    isRequired: 'yes',
  },
  {
      id:2,
      isVisible: true,
      fieldName: "Description",
      name: "description",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:3,
      isVisible: true,
      fieldName: "Hyperlink",
      name: "hyperlink",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:4,
      isVisible: true,
      fieldName: "Contract No.",
      name: "contractNo",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:5,
      isVisible: true,
      fieldName: "Cost",
      name: "cost",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:6,
      isVisible: true,
      fieldName: "Start Date",
      name: "startDate",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:7,
      isVisible: true,
      fieldName: "End Date",
      name: "endDate",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:8,
      isVisible: true,
      fieldName: "No End Date",
      name: "noEndDate",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:9,
      isVisible: true,
      fieldName: "Vendor",
      name: "vendor",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:10,
      isVisible: true,
      fieldName: "Contract Person",
      name: "contractPerson",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:11,
      isVisible: true,
      fieldName: "Phone",
      name: "phone",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:12,
      isVisible: true,
      fieldName: "No. of Licenses",
      name: "noOfLicenses",
      isRequired: 'optional',
      description: "string",
  },
  {
      id:13,
      isVisible: true,
      fieldName: "Is Software",
      name: "isSoftware",
      isRequired: 'optional',
      description: "string",
  },
  
  
]




export const customContract =[
  {
    fieldName: 'fieldName',
    name:'fullName',
    componentsId: 1,
    isRequired: 'yes',
    
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
