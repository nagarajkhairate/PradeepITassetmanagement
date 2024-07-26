// assetTypes.ts

// Define the type for the options in AssetDefaultFields
export interface Option {
    id: number;
    label: string;
    value: string
  }
  
  // Define the type for each field in AssetDefaultFields
  export  interface AssetField {
    id: number;
    fieldName: string;
    name: string;
    isVisible: string;
    description: string;
    example: string;
    option: Option[];
  }
  
  // Define the type for each field in AssetDefaultDataValue
 export interface AssetDataValue {
    id: number,
    isVisible: boolean;
    fieldName: string;
    name: string;
    description: string;
    isRequired: string;
  }
  
  // Export the arrays with the defined types
  export const assetDefaultFields: AssetField[] = [
    {
        id: 1,
        fieldName: 'Asset Name',
        name: 'assetName',
        isVisible: 'isVisible',
        description: 'This holds unique asset id number that your company assigns to identify each asset',
        example: 'A-1001',
        option: [
          {
            id: 1,
            label: 'Yes',
             value: 'yes'
          },
        ],
      },
    {
      id: 2,
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      isVisible: 'isVisible',
      description: 'This holds unique asset id number that your company assigns to identify each asset',
      example: 'A-1001',
      option: [
        {
          id: 1,
          label: 'Yes',
           value: 'yes'
        },
      ],
    },
    {
        id: 3,
      fieldName: 'Asset Description',
      isVisible: 'isVisible',
      name: 'description',
      description: 'Description of the asset.',
      example: 'HP - Envy Desktop - 12GB Memory - 2TB Hard Drive',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
      ],
    },
    {
        id: 4,
      fieldName: 'Purchase From',
      isVisible: 'isVisible',
      name: 'purchaseFrom',
      description: 'Date asset was purchased',
      example: '08/22/2014',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 2,
            label: 'Optional',
            value: 'optional'
          },
      ],
    },
    {
        id: 5,
      fieldName: 'Cost',
      isVisible: 'isVisible',
      name: 'cost',
      description: 'Cost of the asset',
      example: 'Bs225.75',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 2,
            label: 'Optional',
            value: 'optional'
          },
      ],
    },
    {
        id: 6,
      fieldName: 'Purchased Date',
      name: 'purchaseDate',
      isVisible: 'isVisible',
      description: 'Vendor/Supplier name',
      example: 'Amazon',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 2,
            label: 'Optional',
            value: 'optional'
          },
      ],
    },
    {
        id: 7,
      fieldName: 'Brand',
      isVisible: 'isVisible',
      name: 'brand',
      description: 'Manufacturer of the asset',
      example: 'HP',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 2,
            label: 'Optional',
            value: 'optional'
          },
      ],
    },
    {
        id: 8,
      fieldName: 'Model',
      isVisible: 'isVisible',
      name: 'model',
      description: 'Model name of the asset',
      example: 'Envy',
      option: [
        {
            id: 1,
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 2,
            label: 'Optional',
            value: 'optional'
          },
      ],
    },
    {
        id: 9,
      fieldName: 'Serial optional',
      isVisible: 'isVisible',
      name: 'serialNo',
      description: "Manufacturer's serial number",
      example: 'HG9C3X',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes'
        },
        {
          id: 2,
          label: 'Optional',
          value: 'optional'
        },
      ],
    },
  ];
  
  export const AssetDefaultDataValue: AssetDataValue[] = [
    {
        id: 1,
        isVisible: true,
        fieldName: 'Asset Name',
        name: 'assetName',
        description: 'string',
        isRequired: 'yes',
      },
    {
      id: 2,
      isVisible: true,
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 3,
      isVisible: true,
      fieldName: 'Asset Description',
      name: 'assetDescription',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 4,
      isVisible: true,
      fieldName: 'Purchase Date',
      name: 'purchasedDate',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 5,
      isVisible: true,
      fieldName: 'Cost',
      name: 'cost',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 6,
      isVisible: true,
      fieldName: 'Purchased From',
      name: 'purchasedForm',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 7,
      isVisible: true,
      fieldName: 'Brand',
      name: 'brand',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 8,
      isVisible: true,
      fieldName: 'Model',
      name: 'model',
      description: 'string',
      isRequired: 'yes',
    },
    {
        id: 9,
      isVisible: true,
      fieldName: 'Serial No',
      name: 'serialNo',
      description: 'string',
      isRequired: 'yes',
    },
  ];

  export const customAssetData = [
    {
      isVisible: true,
      fieldName: 'Full Name',
      name: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
        isVisible: true,
        fieldName: "Email",
        name: "email",
        isRequired: 'optional',
        description: "string",
    },
    

]
  