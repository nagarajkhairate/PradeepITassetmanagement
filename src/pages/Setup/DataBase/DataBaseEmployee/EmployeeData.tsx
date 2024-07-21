
 export const EmployeePerson = [
    {
      id: 1,
      fieldName: 'Full Name',
      name: 'fullName',
      isVisible: "isVisible",

      isRequired: 'yes',
      description: 'Full value of the person / employee.',
      example: 'John Doe',
      option: [{id: 1,value: 'yes',},],
    },
    {
      id: 2,
      fieldName: 'Email',
      name: "email",
      isVisible: 'isVisible',

      isRequired: 'optional',
      
      description: 'Email of the person',
      example: 'johndoe@example.com',
      option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 3,
      fieldName: 'Employee ID',
      name: "employeeID",
      isVisible: 'isVisible',

      isRequired: 'optional',
      description: 'For example Employee ID, Student ID, etc.',
      example: 'IT-1234',
      option: [{ id: 1, value: 'yes' },  { id: 2, value: 'optional', }, ],
    },
    {
      id: 4,
      fieldName: 'Title',
      name: "title",
      isVisible: 'isVisible',

      isRequired: 'optional',
      description: '  fieldName of the person.',
      example: '  Sales Manager',
      option: [ {  id: 1, value: 'yes',  }, { id: 2,  value: 'optional', }, ],
    },
    {
      id: 5,
      fieldName: 'Phone',

      name: "phone",
      isVisible: 'isVisible',

      isRequired: 'optional',    
      description: 'Phone number of the person',
      example: '(555) 123-4567',
      option: [ {  id: 1,  value: 'yes',  }, { id: 2, value: 'optional',  }, ],
    },
    {
      id: 6,
      fieldName: 'Notes',

      name: "notes",
      isVisible: 'isVisible',

      isRequired: 'optional',
      description: 'Text area for notes',
      example: 'Reports to CEO',
      option: [ { id: 1, value: 'yes',  }, {  id: 2,  value: 'optional', }, ],
    },
    {
      id: 7,
      fieldName: 'Site',

      name: "site",
      isVisible: 'isVisible',

      isRequired: 'optional',
      description: 'System field to link person to a Site',
      example: '-',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional',  },],
    },
    {
      id: 8,
      fieldName: 'Location',
      name: "location",
      isVisible: 'isVisible',
      isRequired: 'optional',
      description: 'System field to link person to a Location',
      example: '  -',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 9,
      fieldName: 'Department',
      name: "department",
      isVisible: 'isVisible',
      isRequired: 'optional',
      description: '  System field to link person to a Department',
      example: '  -',
      option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', },],
    },
  ]

  export const empData = [
    {
      isVisible: true,
      fieldName: 'Full Name',
      value: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
        isVisible: true,
        fieldName: "Email",
        value: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Employee ID",
        value: "employeeID",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Title",
        value: "title",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Phone",
        value: "phone",
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
    {
        isVisible: true,
        fieldName: "Site",
        value: "site",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Location",
        value: "location",
        isRequired: 'optional',
        description: "string",
    },
    {
        isVisible: true,
        fieldName: "Department",
        value: "department",
        isRequired: 'optional',
        description: "string",
    },

]






 
 export const customEmployee =[
 {
   fieldName: 'fieldName',
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

