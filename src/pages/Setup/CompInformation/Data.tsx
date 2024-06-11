
  
  export const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  interface fieldValue {
    id: number,
    label: string,
    value: string
  }

  type CompanyInfoProps = {
    id: number;
    title: string;
    value: string;
    required: boolean;
    sequence: number;
    dataType: string;
    className: {
      sm: number;
      md: number;
      lg: number;
    };
    fieldValue?: fieldValue[];
  };
  
  export const CompanyInfoFields: CompanyInfoProps[] = [
    {
        "id": 1,
        "title": "Company name",
        "value": "company",
        "required": true,
        "sequence": 1,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 2,
        "title": "Country",
        "value": "country",
        "required": true,
        "sequence": 2,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 3,
        "title": "Address",
        "value": "address",
        "required": true,
        "sequence": 3,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 4,
        "title": "Apt./Suite",
        "value": "aptSuite",
        "required": true,
        "sequence": 4,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 5,
        "title": "City",
        "value": "city",
        "required": true,
        "sequence": 5,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 6,
        "title": "State",
        "value": "state",
        "required": true,
        "sequence": 6,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 7,
        "title": "Zip Code",
        "value": "zipCode",
        "required": true,
        "sequence": 7,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "text"
    },
    {
        "id": 8,
        "title": "Time Zone",
        "value": "timeZone",
        "required": true,
        "sequence": 8,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "select",
        "fieldValue": [
          {
              "id": 1,
              "label": "(GMT -8:00) Pacific Time (US & Canada)",
              "value": "America/Los_Angeles"
          },
          {
              "id": 2,
              "label": "(GMT -7:00) Mountain Time (US & Canada)",
              "value": "America/Denver"
          },
          {
              "id": 3,
              "label": "(GMT -6:00) Central Time (US & Canada)",
              "value": "America/Chicago"
          },
          {
              "id": 4,
              "label": "(GMT -5:00) Eastern Time (US & Canada)",
              "value": "America/New_York"
          },
          {
              "id": 5,
              "label": "(GMT -4:00) Atlantic Time (Canada)",
              "value": "Canada/Atlantic"
          },
          {
              "id": 6,
              "label": "(GMT -3:30) Newfoundland Time (Canada)",
              "value": "Canada/Newfoundland"
          },
          {
              "id": 7,
              "label": "(GMT +0:00) Greenwich Mean Time (GMT)",
              "value": "GMT"
          },
          {
              "id": 8,
              "label": "(GMT +5:30) Indian Standard Time (IST)",
              "value": "Asia/Kolkata"
          },
          {
              "id": 9,
              "label": "(GMT +10:00) Australian Eastern Standard Time (AEST)",
              "value": "Australia/Sydney"
          },
          {
              "id": 10,
              "label": "(GMT +12:00) New Zealand Standard Time (NZST)",
              "value": "Pacific/Auckland"
          }
      ]
    },
    {
        "id": 9,
        "title": "Currency Symbol",
        "value": "currencySymbol",
        "required": true,
        "sequence": 9,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "select",
        "fieldValue" : [
          {
              "id": 1,
              "label": "United States Dollar (USD $)",
              "value": "USD"
          },
          {
              "id": 2,
              "label": "Euro (EUR €)",
              "value": "EUR"
          },
          {
              "id": 3,
              "label": "British Pound (GBP £)",
              "value": "GBP"
          },
          {
              "id": 4,
              "label": "Japanese Yen (JPY ¥)",
              "value": "JPY"
          },
          {
              "id": 5,
              "label": "Indian Rupee (INR ₹)",
              "value": "INR"
          }
      ]
    },
    {
        "id": 10,
        "title": "Date format",
        "value": "dateFormat",
        "required": false,
        "sequence": 10,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "date"
    },
    {
        "id": 11,
        "title": "Financial Year begins on",
        "value": "financialYear",
        "required": true,
        "sequence": 11,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "date"
    },
    {
        "id": 12,
        "title": "Logo",
        "value": "companyLogo",
        "required": true,
        "sequence": 12,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "dataType": "file"
    }
];
  