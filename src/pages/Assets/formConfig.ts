export interface FormFieldConfig {
  id: number;
  title: string;
  fields: FormField[];
}

export interface FormField {
  id: number;
  fieldName: string;
  name: string;
  sequence: number | null;
  components: FormFieldComponent;
  type?: "text" | "date" | "number" | "select" | "file" | "textarea";
  visible: boolean;
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
  isDelete: boolean;
  tenantId: number;
  groupId: number;
  stylings?: {
      borderRadius?: string;
      padding?: string;
      width?: {
        xs?: string;
        sm?: string;
        md?: string;
      }
  };
  options?: { name: string; label: string }[];
}

export interface FormFieldComponent {
  id: number | null;
  createdBy: string | null;
  createdOn: string | null;
  updatedBy: string | null;
  updatedOn: string | null;
  type: string | null;
  format: string | null;
  isActive: boolean | null;
  isEnabled: boolean | null;
  isDelete: boolean | null;
  tenantId: number | null;
}


export interface FormFieldComponent {
  id: number | null;
  createdBy: string | null;
  createdOn: string | null;
  updatedBy: string | null;
  updatedOn: string | null;
  type: string | null;
  format: string | null;
  isActive: boolean | null;
  isEnabled: boolean | null;
  isDelete: boolean | null;
  tenantId: number | null;
}

export const formConfig: FormFieldConfig[] = [
    {
      "id": 1,
      "title": "Asset Details",
      "fields": [
        {
          "id": 1,
          "fieldName": "Asset Name",
          "name": "assetName",
          "sequence": 1,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:41:49.942526Z",
          "updatedOn": "2024-07-04T09:41:49.942526Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
              "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
          }
        },
        {
          "id": 2,
          "fieldName": "Asset Tag Id",
          "name": "assetTagId",
          "sequence": 2,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:42:08.378501Z",
          "updatedOn": "2024-07-04T09:42:08.378501Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 3,
          "fieldName": "Description",
          "name": "description",
          "sequence": 3,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "textarea",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          },
          "visible": false,
          "createdOn": "2024-07-04T09:42:45.427377Z",
          "updatedOn": "2024-07-04T09:42:45.427377Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
        },
        {
          "id": 4,
          "fieldName": "Purchase from",
          "name": "purchaseFrom",
          "sequence": 4,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:43:23.544263Z",
          "updatedOn": "2024-07-04T09:43:23.544263Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 6,
          "fieldName": "Purchase Date",
          "name": "purchaseDate",
          "sequence": 6,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "date",
            "format": "yyyy-MM-dd",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:45:36.959856Z",
          "updatedOn": "2024-07-04T09:45:36.959856Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          } 
        },
        {
          "id": 7,
          "fieldName": "Brand",
          "name": "brand",
          "sequence": 7,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:46:15.683236Z",
          "updatedOn": "2024-07-04T09:46:15.683236Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 8,
          "fieldName": "Cost",
          "name": "cost",
          "sequence": 8,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "number",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:47:34.276160Z",
          "updatedOn": "2024-07-04T09:47:34.276160Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 9,
          "fieldName": "Model",
          "name": "model",
          "sequence": 9,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T10:00:31.419127Z",
          "updatedOn": "2024-07-04T10:00:31.419127Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 10,
          "fieldName": "Serial Number",
          "name": "serialNumber",
          "sequence": 10,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "text",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T10:23:06.737614Z",
          "updatedOn": "2024-07-04T10:23:06.737614Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        }
      ]
    },
    {
      "id": 2,
      "title": "Site, Location, Category and Departments",
      "fields": [
        {
          "id": 12,
          "fieldName": "Site",
          "name": "siteId",
          "sequence": 1,
          "components": {
            "id": 1,
            "createdBy": "system",
            "createdOn": "2024-07-04T09:41:36.136102Z",
            "updatedBy": "system",
            "updatedOn": "2024-07-04T09:41:36.136102Z",
            "type": "select",
            "format": "string",
            "isActive": true,
            "isEnabled": true,
            "isDelete": false,
            "tenantId": 1
          },
          "visible": false,
          "createdOn": "2024-07-04T10:47:47.188194Z",
          "updatedOn": "2024-07-04T10:47:47.188194Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 2,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 13,
          "fieldName": "Location",
          "name": "locationId",
          "sequence": 2,
          "components": {
            "id": 1,
            "createdBy": "system",
            "createdOn": "2024-07-04T09:41:36.136102Z",
            "updatedBy": "system",
            "updatedOn": "2024-07-04T09:41:36.136102Z",
            "type": "select",
            "format": "string",
            "isActive": true,
            "isEnabled": true,
            "isDelete": false,
            "tenantId": 1
          },
          "visible": false,
          "createdOn": "2024-07-04T10:47:47.195806Z",
          "updatedOn": "2024-07-04T10:47:47.195806Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 2,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 14,
          "fieldName": "Category",
          "name": "categoryId",
          "sequence": 3,
          "components": {
            "id": 1,
            "createdBy": "system",
            "createdOn": "2024-07-04T09:41:36.136102Z",
            "updatedBy": "system",
            "updatedOn": "2024-07-04T09:41:36.136102Z",
            "type": "select",
            "format": "string",
            "isActive": true,
            "isEnabled": true,
            "isDelete": false,
            "tenantId": 1
          },
          "visible": false,
          "createdOn": "2024-07-04T10:47:47.195806Z",
          "updatedOn": "2024-07-04T10:47:47.195806Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 2,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 15,
          "fieldName": "Sub Category",
          "name": "subCategoryId",
          "sequence": 4,
          "components": {
            "id": 1,
            "createdBy": "system",
            "createdOn": "2024-07-04T09:41:36.136102Z",
            "updatedBy": "system",
            "updatedOn": "2024-07-04T09:41:36.136102Z",
            "type": "select",
            "format": "string",
            "isActive": true,
            "isEnabled": true,
            "isDelete": false,
            "tenantId": 1
          },
          "visible": false,
          "createdOn": "2024-07-04T10:47:47.195806Z",
          "updatedOn": "2024-07-04T10:47:47.195806Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 2,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
        },
        {
          "id": 16,
          "fieldName": "Department",
          "name": "departmentId",
          "sequence": 5,
          "components": {
            "id": 1,
            "createdBy": "system",
            "createdOn": "2024-07-04T09:41:36.136102Z",
            "updatedBy": "system",
            "updatedOn": "2024-07-04T09:41:36.136102Z",
            "type": "select",
            "format": "string",
            "isActive": true,
            "isEnabled": true,
            "isDelete": false,
            "tenantId": 1
          },
          "visible": false,
          "createdOn": "2024-07-04T10:47:47.195806Z",
          "updatedOn": "2024-07-04T10:47:47.195806Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 2,
          "stylings": {
                       "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
            
          }
  
        }
      ]
    },
    {
      "id": 3,
      "title": "Assets Photo",
      "fields":[
        {
          "id": 19,
          "fieldName": "Assets Photo",
          "name": "assetPhoto",
          "sequence": 1,
          "components": {
            "id": null,
            "createdBy": null,
            "createdOn": null,
            "updatedBy": null,
            "updatedOn": null,
            "type": "file",
            "format": "string",
            "isActive": null,
            "isEnabled": null,
            "isDelete": null,
            "tenantId": null
          },
          "visible": false,
          "createdOn": "2024-07-04T09:41:49.942526Z",
          "updatedOn": "2024-07-04T09:41:49.942526Z",
          "createdBy": "system",
          "updatedBy": "system",
          "isDelete": false,
          "tenantId": 1,
          "groupId": 1,
          "stylings": {
              "borderRadius": "15px",
              "padding": "12.25px",
              "width": {
                "xs": "100%",
                "sm": "100%",
                "md": "100%"
              }
          }
        }
      ] 
    }
  ]
