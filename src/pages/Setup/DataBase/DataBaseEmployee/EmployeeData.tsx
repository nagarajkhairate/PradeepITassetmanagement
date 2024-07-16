
 export const EmployeePerson = [
    {
      id: 1,
      fieldName: 'Full Name',
      name: 'fullName',
      isVisible: "visible",
      isRequired: 'yes',
      description: 'Full name of the person / employee.',
      example: 'John Doe',
      option: [{id: 1,value: 'yes',},],
    },
    {
      id: 2,
      fieldName: 'Email',
      name: "email",
      isVisible: 'visible',
      isRequired: 'optional',
      
      description: 'Email of the person',
      example: 'johndoe@example.com',
      option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 3,
      fieldName: 'Employee ID',
      name: "employeeID",
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'For example Employee ID, Student ID, etc.',
      example: 'IT-1234',
      option: [{ id: 1, value: 'yes' },  { id: 2, value: 'optional', }, ],
    },
    {
      id: 4,
      fieldName: 'Title',
      name: "title",
      isVisible: 'visible',
      isRequired: 'optional',
      description: '  fieldName of the person.',
      example: '  Sales Manager',
      option: [ {  id: 1, value: 'yes',  }, { id: 2,  value: 'optional', }, ],
    },
    {
      id: 5,
      fieldName: 'Phone',
      name: "phone",
      isVisible: 'visible',
      isRequired: 'optional',    
      description: 'Phone number of the person',
      example: '(555) 123-4567',
      option: [ {  id: 1,  value: 'yes',  }, { id: 2, value: 'optional',  }, ],
    },
    {
      id: 6,
      fieldName: 'Notes',
      name: "notes",
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'Text area for notes',
      example: 'Reports to CEO',
      option: [ { id: 1, value: 'yes',  }, {  id: 2,  value: 'optional', }, ],
    },
    {
      id: 7,
      fieldName: 'Site',
      name: "site",
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'System field to link person to a Site',
      example: '-',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional',  },],
    },
    {
      id: 8,
      fieldName: 'Location',
      name: "location",
      isVisible: 'visible',
      isRequired: 'optional',
      description: 'System field to link person to a Location',
      example: '  -',
      option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
    },
    {
      id: 9,
      fieldName: 'Department',
      name: "department",
      isVisible: 'visible',
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
      name: 'fullName',
      description: 'string',
      isRequired: 'yes',
    },
    {
        visible: true,
        fieldName: "Email",
        name: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Employee ID",
        name: "employeeID",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Title",
        name: "title",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Phone",
        name: "phone",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Notes",
        name: "notes",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Site",
        name: "site",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Location",
        name: "location",
        isRequired: 'optional',
        description: "string",
    },
    {
        visible: true,
        fieldName: "Department",
        name: "department",
        isRequired: 'optional',
        description: "string",
    },

]






 
 export const customAsset =[
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

