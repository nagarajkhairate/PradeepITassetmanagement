export const Maintenance = [
    {
      id: 1,
      fieldName: 'Title',
      value: 'title',
      visible: 'visible',
      isRequired: 'optional',
      description: 'Title of the maintenance.',
      example: 'Monthly Calibration',
      option: [
        {
          id: 1,
          value: 'yes',
        },
      ],
    },
    {
      id: 2,
      fieldName: 'Details',
      value: 'details',
      visible: 'visible',
      isRequired: 'optional',
      description: '	Details of the maintenance',
      example: 'Calibrate to 120 units',
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
      fieldName: 'Due Date',
      visible: 'visible',
      isRequired: 'optional',
      value: 'dueDate',
      description: 'Date when maintenance is due',
      example: '3/5/2020',
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
      fieldName: 'Maintenance By',
      visible: 'visible',
      isRequired: 'optional',
      value: 'maintenanceBy',
      description: 'Person doing maintenance',
      example: '	John Doe',
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
      fieldName: 'Maintenance Status',
      visible: 'visible',
      isRequired: 'optional',
      value: 'maintenanceStatus',
      description:
        ' System field to show current status of the maintenance. The possible values are Scheduled, In progress, On Hold, Cancelled, Completed.',
      example: ' Scheduled',
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
      fieldName: 'Date Completed',
      visible: 'visible',
      isRequired: 'optional',
      value: 'dateCompleted',
      description: '	Date when maintenance is completed',
      example: '3/5/2020',
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
      id: 7,
      fieldName: 'Maintenance Cost',
      visible: 'visible',
      isRequired: 'optional',
      value: 'maintenanceCost',
      description: 'Total cost spent on this maintenance',
      example: '	$97.50',
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
      id: 8,
      fieldName: 'Repeating',
      visible: 'visible',
      isRequired: 'optional',
      value: 'repeating',
      description: 'System fields to define repeating maintenances',
      example: '---',
      option: [
        {
          id: 1,
          value: 'yes',
        },
       
      ],
    },
  ]
  

  export const maintenanceData = [
    {
      visible: true,
      fieldName: 'Title',
      value: 'title',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Details",
        value: "details",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Due Date",
        value: "dueDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance By",
        value: "maintenanceBy",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance Status",
        value: "maintenanceStatus",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Date Completed",
        value: "dateCompleted",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance Cost",
        value: "maintenanceCost",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Repeating",
        value: "repeating",
        isRequired: 'optional',
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
   
   