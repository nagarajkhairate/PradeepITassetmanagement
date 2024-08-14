export interface warrantyValue {
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




export const warranties: AssetField[] = [
  {
    id: 1,
    fieldName: 'Length',
    isVisible: 'isVisible',
    name: 'length',
    description: 'Length of the warranty (in months).',
    example: '24',
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
    id: 2,
    fieldName: 'Expiration Date',
    isVisible: 'isVisible',
    name: 'expirationDate',
    description: 'Date when warranty expires.',
    example: '12/12/2022',
    option: [
      {
        id: 1,
        label:'Yes',
        value: 'yes',
      },
      
    ],
  },
  {
    id: 3,
    fieldName: 'Notes',
    isVisible: 'isVisible',
    name: 'notes',
    description: 'Text area for notes.',
    example: 'Renew warranty if equipment in good condition.',
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
  
]

export const warrantyData:  warrantyValue[] = [
    {
      id:1,
      isVisible: true,
      fieldName: 'Length',
      name: 'length',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:2,
        isVisible: true,
        fieldName: "Expiration Date",
        name: "expirationDate",
        isRequired: 'yes',
        description: "string",
    },
    {
      id:3,
        isVisible: true,
        fieldName: "Notes",
        name: "notes",
        isRequired: 'yes',
        description: "string",
    },
    
]



 
export const customWarranties =[
    {
      fieldName: 'full Name',
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
   
   