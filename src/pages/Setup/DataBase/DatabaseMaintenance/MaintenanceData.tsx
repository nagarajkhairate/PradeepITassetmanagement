export const Maintenance = [
    {
      id: 1,
      fieldName: 'Title',
      name: 'title',
      isVisible: 'isVisible',
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
      name: 'details',
      isVisible: 'isVisible',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'dueDate',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'maintenanceBy',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'maintenanceStatus',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'dateCompleted',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'maintenanceCost',
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
      isVisible: 'isVisible',
      isRequired: 'optional',
      name: 'repeating',
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
      isVisible: true,
      fieldName: 'Title',
      name: 'title',
      description: 'string',
      isRequired: 'yes',
    },
    {
        isVisible: true,
        fieldName: "Details",
        name: "details",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Due Date",
        name: "dueDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Maintenance By",
        name: "maintenanceBy",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Maintenance Status",
        name: "maintenanceStatus",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Date Completed",
        name: "dateCompleted",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Maintenance Cost",
        name: "maintenanceCost",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Repeating",
        name: "repeating",
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
   
   