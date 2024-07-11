
export const AssetDefaultFields = [
    {
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      isVisible: 'visible',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'assetDescription',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'purchaseDate',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'cost',
      isRequired: false,
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
      isVisible: 'visible',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'brand',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'model',
      isRequired: false,
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
      isVisible: 'visible',
      name: 'serialNo',
      isRequired: false,
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
      visible: true,
      fieldName: 'Asset Tag ID',
      name: 'assetId',
      description: 'string',
      isRequired: true,
    },
    {
      visible: true,
      fieldName: 'Asset Description',
      name: 'assetDec',
      description: 'string',
      isRequired: true,
    },
    {
      visible: true,
      fieldName: 'Purchase Date',
      name: 'purchasedDate',
      description: 'string',
      isRequired: false,
    },
    {
      visible: true,
      fieldName: 'Cost',
      name: 'cost',
      description: 'string',
      isRequired: false,
    },
    {
      visible: true,
      fieldName: 'Purchased From',
      name: 'purchasedForm',
      description: 'string',
      isRequired: false,
    },
    {
      visible: true,
      fieldName: 'Brand',
      name: 'brand',
      description: 'string',
      isRequired: false,
    },
    {
      visible: true,
      fieldName: 'Model',
      name: 'model',
      description: 'string',
      isRequired: false,
    },
    {
      visible: true,
      fieldName: 'Serial No',
      name: 'serialNo',
      description: 'string',
      isRequired: false,
    },
  ];
  