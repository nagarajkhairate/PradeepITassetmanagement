export const timezones = [
    {
      label: "(GMT -8:00) Pacific Time (US & Canada)",
      value: "America/Los_Angeles",
    },
    { label: "(GMT -7:00) Mountain Time (US & Canada)", value: "America/Denver" },
    { label: "(GMT -6:00) Central Time (US & Canada)", value: "America/Chicago" },
    {
      label: "(GMT -5:00) Eastern Time (US & Canada)",
      value: "America/New_York",
    },
    { label: "(GMT -4:00) Atlantic Time (Canada)", value: "Canada/Atlantic" },
    {
      label: "(GMT -3:30) Newfoundland Time (Canada)",
      value: "Canada/Newfoundland",
    },
    { label: "(GMT +0:00) Greenwich Mean Time (GMT)", value: "GMT" },
    { label: "(GMT +5:30) Indian Standard Time (IST)", value: "Asia/Kolkata" },
    {
      label: "(GMT +10:00) Australian Eastern Standard Time (AEST)",
      value: "Australia/Sydney",
    },
    {
      label: "(GMT +12:00) New Zealand Standard Time (NZST)",
      value: "Pacific/Auckland",
    },
  ];
  
  export const currencySymbols = [
    { label: "United States Dollar (USD $)", value: "USD $" },
    { label: "Euro (EUR €)", value: "EUR €" },
    { label: "British Pound (GBP £)", value: "GBP £" },
    { label: "Japanese Yen (JPY ¥)", value: "JPY ¥" },
    { label: "Indian Rupee (INR ₹)", value: "INR ₹" },
  ];
  
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

  type CompanyInfoProps = {
    id: number;
    title: string;
    value: string;
    required: boolean;
    sequence: number;
    type: string;
    className: {
      sm: number;
      md: number;
      lg: number;
    };
  };
  
  export const CompanyInfoFields: CompanyInfoProps[] = [
    {
        "id": 1,
        "title": "Company name",
        "value": "company",
        "required": true,
        "sequence": 1,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 2,
        "title": "Country",
        "value": "country",
        "required": true,
        "sequence": 2,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 3,
        "title": "Address",
        "value": "address",
        "required": true,
        "sequence": 3,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 4,
        "title": "Apt./Suite",
        "value": "aptSuite",
        "required": true,
        "sequence": 4,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 5,
        "title": "City",
        "value": "city",
        "required": true,
        "sequence": 5,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 6,
        "title": "State",
        "value": "state",
        "required": true,
        "sequence": 6,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 7,
        "title": "Zip Code",
        "value": "zipCode",
        "required": true,
        "sequence": 7,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 8,
        "title": "Time Zone",
        "value": "timeZone",
        "required": true,
        "sequence": 8,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 9,
        "title": "Currency Symbol",
        "value": "currencySymbol",
        "required": true,
        "sequence": 9,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 10,
        "title": "Date format",
        "value": "dateFormate",
        "required": false,
        "sequence": 10,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 11,
        "title": "Financial Year begins on",
        "value": "financialYear",
        "required": true,
        "sequence": 11,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    },
    {
        "id": 12,
        "title": "Logo",
        "value": "companyLogo",
        "required": true,
        "sequence": 12,
        "className": { "sm": 12, "md": 6, "lg": 6 },
        "type": "text"
    }
];
  