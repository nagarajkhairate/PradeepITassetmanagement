interface fieldValue {
  id: number
  label: string
  value: string
  defaultValue?: any
  dataType?: string
}

type CompanyInfoProps = {
  id: number
  title: string
  value: string
  required: boolean
  sequence: number
  dataType: string
  className: {
    sm: number
    md: number
    lg: number
  }
  fieldValue?: fieldValue[]
}

export const CompanyInfoFields: CompanyInfoProps[] = [
  {
    id: 1,
    title: 'Company name',
    value: 'company',
    required: true,
    sequence: 1,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 2,
    title: 'Country',
    value: 'country',
    required: true,
    sequence: 2,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 3,
    title: 'Address',
    value: 'address',
    required: true,
    sequence: 3,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 4,
    title: 'Apt./Suite',
    value: 'aptSuite',
    required: true,
    sequence: 4,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 5,
    title: 'City',
    value: 'city',
    required: true,
    sequence: 5,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 6,
    title: 'State',
    value: 'state',
    required: true,
    sequence: 6,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 7,
    title: 'Zip Code',
    value: 'zipCode',
    required: true,
    sequence: 7,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'text',
  },
  {
    id: 8,
    title: 'Time Zone',
    value: 'timeZone',
    required: true,
    sequence: 8,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'select',
    fieldValue: [
      {
        id: 1,
        label: '(GMT -8:00) Pacific Time (US & Canada)',
        value: 'America/Los_Angeles',
      },
      {
        id: 2,
        label: '(GMT -7:00) Mountain Time (US & Canada)',
        value: 'America/Denver',
      },
      {
        id: 3,
        label: '(GMT -6:00) Central Time (US & Canada)',
        value: 'America/Chicago',
      },
      {
        id: 4,
        label: '(GMT -5:00) Eastern Time (US & Canada)',
        value: 'America/New_York',
      },
      {
        id: 5,
        label: '(GMT -4:00) Atlantic Time (Canada)',
        value: 'Canada/Atlantic',
      },
      {
        id: 6,
        label: '(GMT -3:30) Newfoundland Time (Canada)',
        value: 'Canada/Newfoundland',
      },
      {
        id: 7,
        label: '(GMT +0:00) Greenwich Mean Time (GMT)',
        value: 'GMT',
      },
      {
        id: 8,
        label: '(GMT +5:30) Indian Standard Time (IST)',
        value: 'Asia/Kolkata',
      },
      {
        id: 9,
        label: '(GMT +10:00) Australian Eastern Standard Time (AEST)',
        value: 'Australia/Sydney',
      },
      {
        id: 10,
        label: '(GMT +12:00) New Zealand Standard Time (NZST)',
        value: 'Pacific/Auckland',
      },
    ],
  },
  {
    id: 9,
    title: 'Currency Symbol',
    value: 'currencySymbol',
    required: true,
    sequence: 9,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'select',
    fieldValue: [
      {
        id: 1,
        label: 'United States Dollar (USD $)',
        value: 'USD',
      },
      {
        id: 2,
        label: 'Euro (EUR €)',
        value: 'EUR',
      },
      {
        id: 3,
        label: 'British Pound (GBP £)',
        value: 'GBP',
      },
      {
        id: 4,
        label: 'Japanese Yen (JPY ¥)',
        value: 'JPY',
      },
      {
        id: 5,
        label: 'Indian Rupee (INR ₹)',
        value: 'INR',
      },
    ],
  },
  {
    id: 10,
    title: 'Date format',
    value: 'dateFormat',
    required: false,
    sequence: 10,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'select',
    fieldValue: [
      { id: 1, value: 'MM/dd/yyyy', label: 'MM/dd/yyyy' },
      { id: 2, value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
      { id: 3, value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    ],
  },
  {
    id: 11,
    title: 'Financial Year begins on Month',
    value: 'financialMonth',
    required: true,
    sequence: 11,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'select',
    fieldValue: [
      { id: 1, value: 'January', label: 'January' },
      { id: 2, value: 'February', label: 'February' },
      { id: 3, value: 'March', label: 'March' },
      { id: 4, value: 'April', label: 'April' },
      { id: 5, value: 'May', label: 'May' },
      { id: 6, value: 'June', label: 'June' },
      { id: 7, value: 'July', label: 'July' },
      { id: 8, value: 'August', label: 'August' },
      { id: 9, value: 'September', label: 'September' },
      { id: 10, value: 'October', label: 'October' },
      { id: 11, value: 'November', label: 'November' },
      { id: 12, value: 'December', label: 'December' },
    ],
  },
  {
    id: 12,
    title: 'Financial Year begins on Day',
    value: 'financialDays',
    required: true,
    sequence: 12,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'select',
    fieldValue: [
      { id: 1, value: '1', label: '1' },
      { id: 2, value: '2', label: '2' },
      { id: 3, value: '3', label: '3' },
      { id: 4, value: '4', label: '4' },
      { id: 5, value: '5', label: '5' },
      { id: 6, value: '6', label: '6' },
      { id: 7, value: '7', label: '7' },
      { id: 8, value: '8', label: '8' },
      { id: 9, value: '9', label: '9' },
      { id: 10, value: '10', label: '10' },
      { id: 11, value: '11', label: '11' },
      { id: 12, value: '12', label: '12' },
      { id: 13, value: '13', label: '13' },
      { id: 14, value: '14', label: '14' },
      { id: 15, value: '15', label: '15' },
      { id: 16, value: '16', label: '16' },
      { id: 17, value: '17', label: '17' },
      { id: 18, value: '18', label: '18' },
      { id: 19, value: '19', label: '19' },
      { id: 20, value: '20', label: '20' },
      { id: 21, value: '21', label: '21' },
      { id: 22, value: '22', label: '22' },
      { id: 23, value: '23', label: '23' },
      { id: 24, value: '24', label: '24' },
      { id: 25, value: '25', label: '25' },
      { id: 26, value: '26', label: '26' },
      { id: 27, value: '27', label: '27' },
      { id: 28, value: '28', label: '28' },
      { id: 29, value: '29', label: '29' },
      { id: 30, value: '30', label: '30' },
      { id: 31, value: '31', label: '31' },
    ],
  },
  {
    id: 13,
    title: 'Logo',
    value: 'companyLogo',
    required: true,
    sequence: 12,
    className: { sm: 12, md: 6, lg: 6 },
    dataType: 'file',
  },
]
