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
    stateKey: "asset_name",
    validationMessageKey: "asset_name",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    
    }
  },
  {
    label: "Asset Tag ID",
    type: "text",
    stateKey: "asset_tag_id",
    validationMessageKey: "asset_tag_id",
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
    stateKey: "purchase_from",
    validationMessageKey: "purchase_from",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
     
    }
  },
  {
    label: "Purchased Date",
    type: "date",
    stateKey: "purchase_date",
    validationMessageKey: "purchase_date",
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
    stateKey: "serial_number",
    validationMessageKey: "serial_number",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    }
  },
  {
    label: "Status",
    type: "select",
    stateKey: "status",
    validationMessageKey: "status",
    options: [
      { value: "Available", label: "Available" },
      { value: "Not Available", label: "Not Available" }
    ],
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    }
  },
  {
    label: "Site",
    type: "select",
    stateKey: "site",
    validationMessageKey: "site",
    options: [
      { value: "Indore", label: "Indore" },
      { value: "Mumbai", label: "Mumbai" },
      { value: "Delhi", label: "Delhi" },
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
    label: "Category",
    type: "select",
    stateKey: "category",
    validationMessageKey: "category",
    options: [
      { value: "Laptop", label: "Laptop" },
      { value: "Desktop", label: "Desktop" },
      { value: "Monitor", label: "Monitor" },
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
    label: "Location",
    type: "select",
    stateKey: "location",
    validationMessageKey: "location",
    options: [
      { value: "Indore", label: "Indore" },
      { value: "Mumbai", label: "Mumbai" },
      { value: "Delhi", label: "Delhi" },
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
    label: "Department",
    type: "select",
    stateKey: "department",
    validationMessageKey: "department",
    options: [
      { value: "Supplier A", label: "Supplier A" },
      { value: "Supplier B", label: "Supplier B" },
      { value: "Supplier C", label: "Supplier C" },
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
    stateKey: "asset_photo",
    validationMessageKey: "asset_photo",
    sx: {
      borderRadius: "15px",
      padding: "12.25px",
    
  }
}
];
