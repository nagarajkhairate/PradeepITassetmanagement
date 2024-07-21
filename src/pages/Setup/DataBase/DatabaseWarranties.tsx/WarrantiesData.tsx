export const warranties = [
  {
    id: 1,
    fieldName: 'Length',
    isVisible: 'isVisible',
    isRequired: 'optional',
    name: 'length',
    description: 'Length of the warranty (in months).',
    example: '24',
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
    id: 2,
    fieldName: 'Expiration Date',
    isVisible: 'isVisible',
    isRequired: 'optional',
    name: 'expirationDate ',
    description: 'Date when warranty expires.',
    example: '12/12/2022',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      
    ],
  },
  {
    id: 3,
    fieldName: 'Notes',
    isVisible: 'isVisible',
    isRequired: 'optional',
    name: 'notes',
    description: 'Text area for notes.',
    example: 'Renew warranty if equipment in good condition.',
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

export const warrantyData = [
    {
      isVisible: true,
      fieldName: 'Length',
      value: 'length',
      description: 'string',
      isRequired: 'yes',
    },
    {
        isVisible: true,
        fieldName: "Expiration Date",
        value: "expirationDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Notes",
        value: "notes",
        isRequired: 'optional',
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
   
   