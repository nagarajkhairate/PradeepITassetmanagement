export interface FormFieldConfig {
  label: string;
  type: "text" | "date" | "number" | "select"|"file";
  stateKey: string;
  validationMessageKey: string;
  sx: {
    borderRadius: string;
    padding: string;
    width?:{
      xs:string;
      sm:string;
      md:number;

    
    }
  };
  options?: { value: string; label: string }[];
}

export const formConfig: any[] = [
  {
    "id": 2,
    "title": "Site, Location, Category and Departments",
    "fields": [
      {
        "id": 1,
        "fieldName": "Site",
        "value": "site",
        "sequence": null,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
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
        "groupId": 2
      },
      {
        "id": 2,
        "fieldName": "Location",
        "value": "site",
        "sequence": null,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
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
        "groupId": 2
      },
      {
        "id": 3,
        "fieldName": "Category",
        "value": "site",
        "sequence": null,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
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
        "groupId": 2
      },
      {
        "id": 4,
        "fieldName": "Sub Category",
        "value": "site",
        "sequence": null,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
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
        "groupId": 2
      },
      {
        "fieldName": "Department",
        "value": "site",
        "sequence": 5,
        "components": {
          "type": "text",
        },
      },
      {
        "id": 6,
        "fieldName": "example",
        "value": "string",
        "sequence": null,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
          "format": "string",
          "isActive": true,
          "isEnabled": true,
          "isDelete": false,
          "tenantId": 1
        },
        "visible": false,
        "createdOn": "2024-07-04T12:07:33.731109Z",
        "updatedOn": "2024-07-04T12:07:33.731109Z",
        "createdBy": "system",
        "updatedBy": "system",
        "isDelete": false,
        "tenantId": 1,
        "groupId": 2
      }
    ]
  },
  {
    "id": 1,
    "title": "Asset Details",
    "fields": [
      {
        "id": 1,
        "fieldName": "Asset Name",
        "value": "assetName",
        "sequence": 1,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 2,
        "fieldName": "Asset Tag Id",
        "value": "assetName",
        "sequence": 2,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 3,
        "fieldName": "Description",
        "value": "description",
        "sequence": 3,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
          "isActive": null,
          "isEnabled": null,
          "isDelete": null,
          "tenantId": null
        },
        "visible": false,
        "createdOn": "2024-07-04T09:42:45.427377Z",
        "updatedOn": "2024-07-04T09:42:45.427377Z",
        "createdBy": "system",
        "updatedBy": "system",
        "isDelete": false,
        "tenantId": 1,
        "groupId": 1
      },
      {
        "id": 4,
        "fieldName": "Purchased from",
        "value": "purchasedFrom",
        "sequence": 4,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 5,
        "fieldName": "Purchased from",
        "value": "purchasedFrom",
        "sequence": 4,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
          "isActive": null,
          "isEnabled": null,
          "isDelete": null,
          "tenantId": null
        },
        "visible": false,
        "createdOn": "2024-07-04T09:44:56.609365Z",
        "updatedOn": "2024-07-04T09:44:56.609365Z",
        "createdBy": "system",
        "updatedBy": "system",
        "isDelete": false,
        "tenantId": 1,
        "groupId": 1
      },
      {
        "id": 6,
        "fieldName": "Purchase Date",
        "value": "purchaseDate",
        "sequence": 5,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 7,
        "fieldName": "Brand",
        "value": "brand",
        "sequence": 6,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 8,
        "fieldName": "Cost",
        "value": "cost",
        "sequence": 7,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 9,
        "fieldName": "Model",
        "value": "model",
        "sequence": 8,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 10,
        "fieldName": "Serial No",
        "value": "serialNo",
        "sequence": 9,
        "components": {
          "id": null,
          "createdBy": null,
          "createdOn": null,
          "updatedBy": null,
          "updatedOn": null,
          "type": null,
          "format": null,
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
        "groupId": 1
      },
      {
        "id": 11,
        "fieldName": "exampleee",
        "value": "string",
        "sequence": 19,
        "components": {
          "id": 1,
          "createdBy": "system",
          "createdOn": "2024-07-04T09:41:36.136102Z",
          "updatedBy": "system",
          "updatedOn": "2024-07-04T09:41:36.136102Z",
          "type": "text",
          "format": "string",
          "isActive": true,
          "isEnabled": true,
          "isDelete": false,
          "tenantId": 1
        },
        "visible": false,
        "createdOn": "2024-07-04T12:09:29.401656Z",
        "updatedOn": "2024-07-04T12:09:29.401656Z",
        "createdBy": "system",
        "updatedBy": "system",
        "isDelete": false,
        "tenantId": 1,
        "groupId": 1
      }
    ]
  }
]