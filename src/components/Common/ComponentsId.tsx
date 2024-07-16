
// import React, { useState } from 'react';
// import { ThunkDispatch } from 'redux-thunk';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchComponents } from '../../redux/features/ComponentsIdSlice';
// import { RootState } from '../../redux/store';
 
// import { Option, Select } from "@mui/joy"
 
// type DropdownOption = {
//   label: string;
//   value: string | number | boolean | Date | null;
// };

 
// const ComponentsId: React.FC = () => {
//     const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
//   const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
 
//   const components = useSelector((state: RootState) => state.components.data)
//   console.log(components)
 
//   React.useEffect(() => {
//     dispatch(fetchComponents())
//   }, [dispatch])
 
//   const options: DropdownOption[] = [
//     {label:'id', value:1},
//     { label: 'Text', value: 'Example Text' },
//     { label: 'Number', value: 42 },
//     { label: 'Boolean (True)', value: true },
//     { label: 'Boolean (False)', value: false },
//     { label: 'Date', value: new Date() },
//     { label: 'Time', value: '12:34:56' },
//     { label: 'Datetime', value: '2024-06-24T12:34:56' },
//     { label: 'List', value: 'Option 1' },
//     { label: 'Currency', value: '100 USD' },
//     { label: 'Email', value: 'example@example.com' },
//     { label: 'URL', value: 'https://www.example.com' },
//     { label: 'File', value: 'document.pdf' },
//     { label: 'Color', value: '#FF5733' },
//     { label: 'Range', value: '1-5' },
//     { label: 'Custom Data Type', value: 'Custom123' },
//   ];
 
//   // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//   //   const selectedValue = event.target.value;
//   //   const selected = options.find(option => String(option.value) === selectedValue);
//   //   setSelectedOption(selected || null);
//   // };

//   // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//   //   const selectedValue = event.target.value
//   //   const selected = options.find(
//   //     (option) => String(option.value) === selectedValue
//   //   )
//   //   setSelectedOption(selected || null)
//   // }

//   const handleSelectChange = (
//     event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
//     value: unknown
//   ) => {
//     const selected = options.find((option) => String(option.value) === String(value))
//     setSelectedOption(selected || null)
//   }
 
//   const formattedOptions = options.map(option => ({
//     label: option.label,
//     value: option.value?.toString(),
//   }));
  
//   return (
//     <div>

//       <Select id="dropdown" onChange={handleSelectChange}>

//         {components && components.map((option, index) => (
//           <Option key={index} value={option.id}>
//             {option.type}
//           </Option>
//         ))}
//       </Select>
//       {selectedOption && (
//         <div>
//           <p>Label: {selectedOption.label}</p>
//           <p>Value: {String(selectedOption.value)}</p>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default ComponentsId;


interface FieldValue {
    id: number;
    label: string;
    value: string | number | boolean | Date | null;
    defaultValue?: any;
}

interface DropdownOption {
    id: number;
    fieldName: string;
    isRequired: boolean;
    componentsId: number;
    categoryId: number;
    fieldValue?: FieldValue[];
}

export const Components: DropdownOption[] = [
    {
        id: 1,
        fieldName: "swde",
        componentsId: 1,
        categoryId: 1,
        isRequired: false,
        fieldValue: [
            {
                id: 1,
                label: 'Type',
                value: 'TextType'
            },
            {
                id: 2,
                label: 'Number',
                value: 42
            },
            {
                id: 3,
                label: 'Date',
                value: new Date()
            },
            {
                id: 4,
                label: 'Time',
                value: '12:34:56'
            },
            {
                id: 5,
                label: 'Boolean',
                value: true
            },
            {
                id: 6,
                label: 'Null',
                value: null
            },
            {
                id: 7,
                label: 'Decimal',
                value: 3.14
            },
            {
                id: 8,
                label: 'Email',
                value: 'example@example.com'
            },
            {
                id: 9,
                label: 'Password',
                value: 'password123'
            },
            {
                id: 10,
                label: 'URL',
                value: 'https://example.com'
            },
            {
                id: 11,
                label: 'Phone Number',
                value: '123-456-7890'
            },
            {
                id: 12,
                label: 'IPAddress',
                value: '192.168.0.1'
            },
            {
                id: 13,
                label: 'Currency',
                value: '$100.00'
            },
            {
                id: 14,
                label: 'Percentage',
                value: '75%'
            },
            {
                id: 15,
                label: 'Hex Color',
                value: '#FF5733'
            }
        ]
    }
];
