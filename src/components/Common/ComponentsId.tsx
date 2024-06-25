import React, { useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComponents } from '../../Redux/features/ComponentsIdSlice';

// Define the type for dropdown options
type DropdownOption = {
  label: string;
  value: string | number | boolean | Date | null;
};

const ComponentsId: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  const components = useSelector((state: RootState) => state.components.data)
  console.log(components)

  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [])

  const options: DropdownOption[] = [
    { label: 'Text', value: 'Example Text' },
    { label: 'Number', value: 42 },
    { label: 'Boolean (True)', value: true },
    { label: 'Boolean (False)', value: false },
    { label: 'Date', value: new Date() },
    { label: 'Time', value: '12:34:56' },
    { label: 'Datetime', value: '2024-06-24T12:34:56' },
    { label: 'List', value: 'Option 1' },
    { label: 'Currency', value: '100 USD' },
    { label: 'Email', value: 'example@example.com' },
    { label: 'URL', value: 'https://www.example.com' },
    { label: 'File', value: 'document.pdf' },
    { label: 'Color', value: '#FF5733' },
    { label: 'Range', value: '1-5' },
    { label: 'Custom Data Type', value: 'Custom123' },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected = options.find(option => String(option.value) === selectedValue);
    setSelectedOption(selected || null);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        {options.map(option => (
          <option key={option.label} value={option.value?.toString()}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div>
          <h3>Selected Option</h3>
          <p>Label: {selectedOption.label}</p>
          <p>Value: {String(selectedOption.value)}</p>
        </div>
      )}
    </div>
  );
};

export default ComponentsId;
