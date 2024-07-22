
export const AssetDefaultFields = [
    {
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      isVisible: 'isVisible',
      isRequired: 'yes',
      description:
        'This holds unique asset id number that your company assigns to identify each asset',
      example: 'A-1001',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      fieldName: 'Asset Description',
      isVisible: 'isVisible',
      name: 'assetDescription',
      isRequired: 'yes',
      description: 'Description of the asset.',
      example: 'HP - Envy Desktop - 12GB Memory - 2TB Hard Drive',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      fieldName: 'Purchase Date',
      isVisible: 'isVisible',
      name: 'purchaseDate',
      isRequired: 'optional',
      description: 'Date asset was purchased',
      example: '08/22/2014',
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
      fieldName: 'Cost',
      isVisible: 'isVisible',
      name: 'cost',
      isRequired: 'optional',
      description: 'Cost of the asset',
      example: 'Bs225.75',
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
      fieldName: 'Purchased From',
      name: 'purchasedForm',
      isVisible: 'isVisible',
      isRequired: 'optional',
      description: 'Vendor/Supplier name',
      example: 'Amazon',
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
      fieldName: 'Brand',
      isVisible: 'isVisible',
      name: 'brand',
      isRequired: 'optional',
      description: 'Manufacturer of the asset',
      example: 'HP',
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
      fieldName: 'Model',
      isVisible: 'isVisible',
      name: 'model',
      isRequired: 'optional',
      description: 'Model name of the asset',
      example: 'Envy',
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
      fieldName: 'Serial No',
      isVisible: 'isVisible',
      name: 'serialNo',
      isRequired: 'optional',
      description: "Manufacturer's serial number",
      example: 'HG9C3X',
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
  ];
  
 export const dataValue = [
    {
      isVisible: true,
      fieldName: 'Asset Tag ID',
      name: 'assetId',
      description: 'string',
      isRequired: 'yes',
    },
    {
      isVisible: true,
      fieldName: 'Asset Description',
      name: 'assetDec',
      description: 'string',
      isRequired: 'yes',
    },
    {
      isVisible: true,
      fieldName: 'Purchase Date',
      name: 'purchasedDate',
      description: 'string',
      isRequired: 'optional',
    },
    {
      isVisible: true,
      fieldName: 'Cost',
      name: 'cost',
      description: 'string',
      isRequired: 'optional',
    },
    {
      isVisible: true,
      fieldName: 'Purchased From',
      name: 'purchasedForm',
      description: 'string',
      isRequired: 'optional',
    },
    {
      isVisible: true,
      fieldName: 'Brand',
      name: 'brand',
      description: 'string',
      isRequired: 'optional',
    },
    {
      isVisible: true,
      fieldName: 'Model',
      name: 'model',
      description: 'string',
      isRequired: 'optional',
    },
    {
      isVisible: true,
      fieldName: 'Serial No',
      name: 'serialNo',
      description: 'string',
      isRequired: 'optional',
    },
  ];
  

  
 
export const customAsset =[
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
 
 