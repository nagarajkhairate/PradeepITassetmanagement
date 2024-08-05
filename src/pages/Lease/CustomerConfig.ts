 export interface ComponentConfig {
    id: number;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
    type: string;
    format: string;
    isActive: boolean;
    isEnabled: boolean;
    isDelete: boolean;
  }
  
  export interface FieldConfig {
    id: number;
    fieldName: string;
    name: string;
    isRequired: string;
    isActive: boolean;
    description: string;
    sequence: number;
    components: ComponentConfig;
    visible: boolean;
    createdOn: string;
    updatedOn: string;
    createdBy: string;
    updatedBy: string;
    isDelete: boolean;
    tenantId: null;
  }
  
  export const CustomerConfig: any[] = [
    {
      id: 1,
      fieldName: "Full Name",
      name: "empName",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 1,
      components: {
        id: 13,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "text",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.102482Z",
      updatedOn: "2024-07-18T06:43:05.102482Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 2,
      fieldName: "Email",
      name: "email",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 2,
      components: {
        id: 6,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "email",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.112028Z",
      updatedOn: "2024-07-18T06:43:05.112028Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 3,
      fieldName: "Employee ID",
      name: "employeeID",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 3,
      components: {
        id: 16,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "text",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.112028Z",
      updatedOn: "2024-07-18T06:43:05.112028Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 4,
      fieldName: "Title",
      name: "title",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 4,
      components: {
        id: 13,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "text",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.117194Z",
      updatedOn: "2024-07-18T06:43:05.117194Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 5,
      fieldName: "Phone",
      name: "phone",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 5,
      components: {
        id: 9,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "number",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.118649Z",
      updatedOn: "2024-07-18T06:43:05.118649Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 6,
      fieldName: "Notes",
      name: "notes",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 6,
      components: {
        id: 15,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "textarea",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.118649Z",
      updatedOn: "2024-07-18T06:43:05.118649Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 7,
      fieldName: "Site",
      name: "empSite",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 7,
      components: {
        id: 5,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "select",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.118649Z",
      updatedOn: "2024-07-18T06:43:05.118649Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 8,
      fieldName: "Location",
      name: "empLocation",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 8,
      components: {
        id: 5,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "select",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.118649Z",
      updatedOn: "2024-07-18T06:43:05.118649Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
    {
      id: 9,
      fieldName: "Department",
      name: "empDepartment",
      isRequired: "true",
      isActive: true,
      description: "string",
      sequence: 9,
      components: {
        id: 5,
        createdBy: "system",
        createdOn: "2024-07-18T06:43:05.029755Z",
        updatedBy: "system",
        updatedOn: "2024-07-18T06:43:05.029755Z",
        type: "select",
        format: "string",
        isActive: true,
        isEnabled: true,
        isDelete: false,
      },
      visible: true,
      createdOn: "2024-07-18T06:43:05.118649Z",
      updatedOn: "2024-07-18T06:43:05.118649Z",
      createdBy: "system",
      updatedBy: "system",
      isDelete: false,
      tenantId: null,
    },
  ];
  