// import React, { useState } from 'react';
// import { ThunkDispatch } from 'redux-thunk';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchComponents } from '../../Redux/features/ComponentsIdSlice';
// import { RootState } from '../../redux/store';
 
// import { Option, Select } from "@mui/joy"
 
// type DropdownOption = {
//   key: string;
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
//     {key:'id', value:1},
//     { key: 'Text', value: 'Example Text' },
//     { key: 'Number', value: 42 },
//     { key: 'Boolean (True)', value: true },
//     { key: 'Boolean (False)', value: false },
//     { key: 'Date', value: new Date() },
//     { key: 'Time', value: '12:34:56' },
//     { key: 'Datetime', value: '2024-06-24T12:34:56' },
//     { key: 'List', value: 'Option 1' },
//     { key: 'Currency', value: '100 USD' },
//     { key: 'Email', value: 'example@example.com' },
//     { key: 'URL', value: 'https://www.example.com' },
//     { key: 'File', value: 'document.pdf' },
//     { key: 'Color', value: '#FF5733' },
//     { key: 'Range', value: '1-5' },
//     { key: 'Custom Data Type', value: 'Custom123' },
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
//     label: option.key,
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
//           <p>Label: {selectedOption.key}</p>
//           <p>Value: {String(selectedOption.value)}</p>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default ComponentsId;