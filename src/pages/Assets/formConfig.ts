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

export const formConfig: FormFieldConfig[] = [
  {
    label: "Asset Name",
    type: "text",
    stateKey: "assetName",
    validationMessageKey: "assetName",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    
    }
  },
  {
    label: "Asset Tag ID",
    type: "text",
    stateKey: "assetTagId",
    validationMessageKey: "assetTagId",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
     
    }
  },
  {
    label: "Description",
    type: "text",
    stateKey: "description",
    validationMessageKey: "description",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      
    }
  },
  {
    label: "Purchased From",
    type: "text",
    stateKey: "purchaseFrom",
    validationMessageKey: "purchaseFrom",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
     
    }
  },
  {
    label: "Purchased Date",
    type: "date",
    stateKey: "purchaseDate",
    validationMessageKey: "purchaseDate",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
     
    }
  },
  {
    label: "Brand",
    type: "text",
    stateKey: "brand",
    validationMessageKey: "brand",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      
    }
  },
  {
    label: "cost",
    type: "number",
    stateKey: "cost",
    validationMessageKey: "cost",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      
    }
  },
  
  {   
    label: "Model",
    type: "text",
    stateKey: "model",
    validationMessageKey: "model",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
   
    }
  },
  {
    label: "Serial No.",
    type: "text",
    stateKey: "serialNumber",
    validationMessageKey: "serialNumber",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    }
  },
  {
    label: "site",
    type: "select",
    stateKey: "siteId",
    validationMessageKey: "siteId",
    options: [
      { value: "1", label: "Indore" },
      { value: "2", label: "Mumbai" },
      { value: "3", label: "Delhi" },
    ],
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm:"100%",
        md: 400,

      }
    }
  },
  {
    label: "category",
    type: "select",
    stateKey: "categoryId",
    validationMessageKey: "categoryId",
    options: [
      { value: "1", label: "Laptop" },
      { value: "2", label: "Desktop" },
      { value: "3", label: "Monitor" },
    ],
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm:"100%",
        md: 400,

      }
    }
  },
  {
    label: "location",
    type: "select",
    stateKey: "locationId",
    validationMessageKey: "locationId",
    options: [
      { value: "1", label: "Indore" },
      { value: "2", label: "Mumbai" },
      { value: "3", label: "Delhi" },
    ],
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm:"100%",
        md: 400,

      }
    }
  },
  {
    label: "department",
    type: "select",
    stateKey: "departmentId",
    validationMessageKey: "departmentId",
    options: [
      { value: "1", label: "Supplier A" },
      { value: "2", label: "Supplier B" },
      { value: "3", label: "Supplier C" },
    ],
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm:"100%",
        md: 400,

      }
    }

  },
  {
    label: "Assets Photo",
    type: "file",
    stateKey: "assetPhoto",
    validationMessageKey: "assetPhoto",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    
  }
}
];
