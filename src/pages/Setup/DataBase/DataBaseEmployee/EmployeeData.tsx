export interface employeeValue {
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

export  interface empField {
  id: number;
  fieldName: string;
  name: string;
  isVisible: string;
  description: string;
  example: string;
  option: Option[];
}



 export const EmployeePerson: empField[] = [
    {
      id: 1,
      fieldName: 'Full Name',
      name: 'empName',
      isVisible: "isVisible",
      description: 'Full value of the person / employee.',
      example: 'John Doe',
      option: [{id: 1,label: 'Yes', value:'yes'},],
    },
    {
      id: 2,
      fieldName: 'Email',
      name: "email",
      isVisible: "isVisible",
      description: 'Email of the person',
      example: 'johndoe@example.com',
      option: [{ id: 1, label: 'Yes', value:'yes' }, { id: 2, label: 'Optional', value:'optional' }, ],
    },
    {
      id: 3,
      fieldName: 'Employee ID',
      name: "employeeId",
      isVisible: 'isVisible',
      description: 'For example Employee ID, Student ID, etc.',
      example: 'IT-1234',
      option: [{ id: 1, label: 'Yes', value:'yes' },  { id: 2, label: 'Optional', value:'optional' }, ],
    },
    {
      id: 4,
      fieldName: 'Title',
      name: "title",
      isVisible: 'isVisible',
      description: '  fieldName of the person.',
      example: '  Sales Manager',
      option: [ {  id: 1, label: 'Yes', value:'yes'  }, { id: 2,  label: 'Optional', value:'optional' }, ],
    },
    {
      id: 5,
      fieldName: 'Phone',
      name: "phoneNumber",
      isVisible: 'isVisible',   
      description: 'Phone number of the person',
      example: '(555) 123-4567',
      option: [ {  id: 1,  label: 'Yes', value:'yes' }, { id: 2, label: 'Optional', value:'optional'  }, ],
    },
    {
      id: 6,
      fieldName: 'Notes',
      name: "notes",
      isVisible: 'isVisible',
      description: 'Text area for notes',
      example: 'Reports to CEO',
      option: [ { id: 1, label: 'Yes', value:'yes'  }, {  id: 2,label: 'Optional', value:'optional' }, ],
    },
    {
      id: 7,
      fieldName: 'Site',
      name: "empSite",
      isVisible: 'isVisible',
      description: 'System field to link person to a Site',
      example: '-',
      option: [  { id: 1,label: 'Yes', value:'yes' }, { id: 2, label: 'Optional', value:'optional' },],
    },
    {
      id: 8,
      fieldName: 'Location',
      name: "empLocation",
      isVisible: 'isVisible',
      description: 'System field to link person to a Location',
      example: '  -',
      option: [  { id: 1, label: 'Yes', value:'yes' }, { id: 2, label: 'Optional', value:'optional' }, ],
    },
    {
      id: 9,
      fieldName: 'Department',
      name: "empDepartment",
      isVisible: 'isVisible',
      description: '  System field to link person to a Department',
      example: '  -',
      option: [{ id: 1, label: 'Yes', value:'yes' }, { id: 2, label: 'Optional', value:'optional' },],
    },
  ]

  export const empData: employeeValue[] = [
    {
      id:1,
      isVisible: true,
      fieldName: 'Full Name',
      name: 'empName',
      description: 'string',
      isRequired: 'yes',
    },
    {
      id:2,
        isVisible: true,
        fieldName: "Email",
        name: "email",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:3,
        isVisible: true,
        fieldName: "Employee ID",
        name: "employeeId",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:4,
        isVisible: true,
        fieldName: "Title",
        name: "title",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:5,
        isVisible: true,
        fieldName: "Phone",
        name: "phoneNumber",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:6,
        isVisible: true,
        fieldName: "Notes",
        name: "notes",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:7,
        isVisible: true,
        fieldName: "Site",
        name: "empSite",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:8,
        isVisible: true,
        fieldName: "Location",
        name: "empLocation",
        isRequired: 'optional',
        description: "string",
    },
    {
      id:9,
        isVisible: true,
        fieldName: "empDepartment",
        name: "department",
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

