
 export const EmployeePerson = [
    {
      id: 1,
      fieldName: 'Full Name',
      value: 'fullName',
      visible: "visible",
      isRequired: 'yes',
      description: 'Full value of the person / employee.',
      example: 'John Doe',
      option: [{id: 1,value: 'yes',},],
    },
    {
      id: 2,
      fieldName: 'Email',
      value: "email",
      visible: 'visible',
      isRequired: 'optional',
      
      description: 'Email of the person',
      example: 'johndoe@example.com',
      option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 3,
      fieldName: 'Employee ID',
      value: "employeeID",
      visible: 'visible',
      isRequired: 'optional',
      description: 'For example Employee ID, Student ID, etc.',
      example: 'IT-1234',
      option: [{ id: 1, value: 'yes' },  { id: 2, value: 'optional', }, ],
    },
    {
      id: 4,
      fieldName: 'Title',
      value: "title",
      visible: 'visible',
      isRequired: 'optional',
      description: '  fieldName of the person.',
      example: '  Sales Manager',
      option: [ {  id: 1, value: 'yes',  }, { id: 2,  value: 'optional', }, ],
    },
    {
      id: 5,
      fieldName: 'Phone',
      value: "phone",
      visible: 'visible',
      isRequired: 'optional',    
      description: 'Phone number of the person',
      example: '(555) 123-4567',
      option: [ {  id: 1,  value: 'yes',  }, { id: 2, value: 'optional',  }, ],
    },
    {
      id: 6,
      fieldName: 'Notes',
      value: "notes",
      visible: 'visible',
      isRequired: 'optional',
      description: 'Text area for notes',
      example: 'Reports to CEO',
      option: [ { id: 1, value: 'yes',  }, {  id: 2,  value: 'optional', }, ],
    },
    {
      id: 7,
      fieldName: 'Site',
      value: "site",
      visible: 'visible',
      isRequired: 'optional',
      description: 'System field to link person to a Site',
      example: '-',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional',  },],
    },
    {
      id: 8,
      fieldName: 'Location',
      value: "location",
      visible: 'visible',
      isRequired: 'optional',
      description: 'System field to link person to a Location',
      example: '  -',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 9,
      fieldName: 'Department',
      value: "department",
      visible: 'visible',
      isRequired: 'optional',
      description: '  System field to link person to a Department',
      example: '  -',
      option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', },],
    },
  ]

  export const empData = [
    {
      visible: true,
      fieldName: 'Full Name',
      value: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Email",
        value: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Employee ID",
        value: "employeeID",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Title",
        value: "title",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Phone",
        value: "phone",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Notes",
        value: "notes",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Site",
        value: "site",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Location",
        value: "location",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
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

