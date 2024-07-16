export const Maintenance = [
    {
      id: 1,
      fieldName: 'Title',
      value: 'title',
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      isVisible: 'visible',
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
      name: 'title',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Details",
        name: "details",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Due Date",
        name: "dueDate",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance By",
        name: "maintenanceBy",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance Status",
        name: "maintenanceStatus",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Date Completed",
        name: "dateCompleted",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Maintenance Cost",
        name: "maintenanceCost",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Repeating",
        name: "repeating",
        isRequired: 'optional',
        description: "string",
    },
]



 
export const customMaintenance =[
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
   
   