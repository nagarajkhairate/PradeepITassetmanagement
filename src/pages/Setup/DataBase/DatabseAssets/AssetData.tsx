export interface assetValue {
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

export  interface assetField {
  id: number;
  fieldName: string;
  name: string;
  isVisible: string;
  description: string;
  example: string;
  option: Option[];
}





export const AssetDefaultFields: assetField[] = [
    {
      id:1,
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      isVisible: 'isVisible',
      description:
        'This holds unique asset id number that your company assigns to identify each asset',
      example: 'A-1001',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
      ],
    },
    {
      id:2,
      fieldName: 'Description',
      isVisible: 'isVisible',
      name: 'description',
      description: 'Description of the asset.',
      example: 'HP - Envy Desktop - 12GB Memory - 2TB Hard Drive',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
      ],
    },
    {
      id:3,
      fieldName: 'Purchase Date',
      isVisible: 'isVisible',
      name: 'purchaseDate',
      description: 'Date asset was purchased',
      example: '08/22/2014',
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
      id:4,
      fieldName: 'Cost',
      isVisible: 'isVisible',
      name: 'cost',
      description: 'Cost of the asset',
      example: 'Bs225.75',
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
      id:5,
      fieldName: 'Purchase From',
      name: 'purchaseFrom',
      isVisible: 'isVisible',
      description: 'Vendor/Supplier name',
      example: 'Amazon',
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
      fieldName: 'Brand',
      isVisible: 'isVisible',
      name: 'brand',
      description: 'Manufacturer of the asset',
      example: 'HP',
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
      id:7,
      fieldName: 'Model',
      isVisible: 'isVisible',
      name: 'model',
      description: 'Model name of the asset',
      example: 'Envy',
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
      id:8,
      fieldName: 'Serial Number',
      isVisible: 'isVisible',
      name: 'serialNumber',
      description: "Manufacturer's serial number",
      example: 'HG9C3X',
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
  ];
  
 export const dataValue: assetValue[] = [
    {
      id:1,
      isVisible: true,
      fieldName: 'Asset Tag ID',
      name: 'assetTagId',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:2,
      isVisible: true,
      fieldName: 'Description',
      name: 'description',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:3,
      isVisible: true,
      fieldName: 'Purchase Date',
      name: 'purchaseDate',
      description: 'string',
      isRequired: 'optional',
    },
    {
      id:4,
      isVisible: true,
      fieldName: 'Cost',
      name: 'cost',
      description: 'string',
      isRequired: 'optional',
    },
    {
      id:5,
      isVisible: true,
      fieldName: 'Purchase From',
      name: 'purchaseFrom',
      description: 'string',
      isRequired: 'optional',
    },
    {
      id: 6,
      isVisible: true,
      fieldName: 'Brand',
      name: 'brand',
      description: 'string',
      isRequired: 'optional',
    },
    {
      id:7,
      isVisible: true,
      fieldName: 'Model',
      name: 'model',
      description: 'string',
      isRequired: 'optional',
    },
    {
      id:8,
      isVisible: true,
      fieldName: 'Serial Number',
      name: 'serialNumber',
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
 
 