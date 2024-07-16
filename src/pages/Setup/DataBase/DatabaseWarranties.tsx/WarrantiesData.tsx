export const warranties = [
  {
    id: 1,
    fieldName: 'Length',
    isVisible: 'visible',
    isRequired: 'optional',
    value: 'length',
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
    isVisible: 'visible',
    isRequired: 'optional',
    value: 'expirationDate ',
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
    isVisible: 'visible',
    isRequired: 'optional',
    value: 'notes',
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
      visible: true,
      fieldName: 'Length',
      name: 'length',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Expiration Date",
        name: "expirationDate",
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



 
export const customWarranties =[
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
   
   