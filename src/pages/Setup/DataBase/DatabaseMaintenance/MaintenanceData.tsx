export interface maintenanceValue {
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

export  interface MaintenanceField {
  id: number;
  fieldName: string;
  name: string;
  isVisible: string;
  description: string;
  example: string;
  option: Option[];
}



export const Maintenance: MaintenanceField[]  = [
    {
      id: 1,
      fieldName: 'Title',
      name: 'maintenanceTitle',
      isVisible: 'isVisible',
      description: 'Title of the maintenance.',
      example: 'Monthly Calibration',
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
      fieldName: 'Details',
      name: 'maintenanceDetails',
      isVisible: 'isVisible',
      description: '	Details of the maintenance',
      example: 'Calibrate to 120 units',
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
      fieldName: 'Due Date',
      isVisible: 'isVisible',
      name: 'maintenanceDueDate',
      description: 'Date when maintenance is due',
      example: '3/5/2020',
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
      fieldName: 'Maintenance By',
      isVisible: 'isVisible',
      name: 'maintenanceBy',
      description: 'Person doing maintenance',
      example: '	John Doe',
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
      fieldName: 'Maintenance Status',
      isVisible: 'isVisible',
      name: 'maintenanceStatus',
      description:
        ' System field to show current status of the maintenance. The possible values are Scheduled, In progress, On Hold, Cancelled, Completed.',
      example: ' Scheduled',
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
      fieldName: 'Date Completed',
      isVisible: 'isVisible',
      name: 'dateCompleted',
      description: '	Date when maintenance is completed',
      example: '3/5/2020',
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
      id: 7,
      fieldName: 'Maintenance Cost',
      isVisible: 'isVisible',
      name: 'maintenanceCost',
      description: 'Total cost spent on this maintenance',
      example: '	$97.50',
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
      id: 8,
      fieldName: 'Repeating',
      isVisible: 'isVisible',
      name: 'repeating',
      description: 'System fields to define repeating maintenances',
      example: '---',
      option: [
        {
          id: 1,
          label: 'Yes',
          value: 'yes',
        },
       
      ],
    },
  ]
  

  export const maintenanceData: maintenanceValue[] = [
    {
      id:1,
      isVisible: true,
      fieldName: 'Title',
      name: 'maintenanceTitle',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:2,
        isVisible: true,
        fieldName: "Details",
        name: "maintenanceDetails",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:3,
        isVisible: true,
        fieldName: "Due Date",
        name: "maintenanceDueDate",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:4,
        isVisible: true,
        fieldName: "Maintenance By",
        name: "maintenanceBy",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:5,
        isVisible: true,
        fieldName: "Maintenance Status",
        name: "maintenanceStatus",
        isRequired: 'yes',
        description: "string",
    },
    {
      id:6,
        isVisible: true,
        fieldName: "Date Completed",
        name: "dateCompleted",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:7,
        isVisible: true,
        fieldName: "Maintenance Cost",
        name: "maintenanceCost",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:8,
        isVisible: true,
        fieldName: "Repeating",
        name: "repeating",
        isRequired: 'yes',
        description: "string",
    },
]



 
export const customMaintenance =[
    {
      fieldName: 'full Name',
      value:'value',
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
   
   