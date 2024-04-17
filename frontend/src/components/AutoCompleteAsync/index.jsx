import { useState, useEffect, useRef } from 'react';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { Select, Empty, message } from 'antd';
import useLanguage from '@/locale/useLanguage';

export const varAutoCompleteAsync = "AutoCompleteAsync";
export default function AutoCompleteAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',
  redirectLabel = 'Add New',
  withRedirect = false,
  urlToRedirect = '/',
  value,
  onChange,
  onMiloOptionFieldChange,
}) {
  const translate = useLanguage();
  const addNewValue = { value: 'redirectURL', label: `+ ${translate(redirectLabel)}` };
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const isUpdating = useRef(true);
  const isSearching = useRef(false);
  const [searching, setSearching] = useState(false);
  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (newValue) => {
    isUpdating.current = false;
    setCurrentValue(newValue); // Perbarui state currentValue dengan nilai baru yang dipilih

    if (onChange) {
      if (newValue && newValue.value !== 'redirectURL') {
        onChange(newValue[outputValue] || newValue);
      }
    }

    if (newValue && newValue.value === 'redirectURL' && withRedirect) {
      navigate(urlToRedirect);
    }
  };

  const handleOnSelect = (value) => {
    setCurrentValue(value[outputValue] || value);
  };

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  const asyncSearch = async (options) => {
    return await request.search({ entity, options });
  };

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();
  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };

  useEffect(() => {
    const options = {
      q: debouncedValue,
      fields: searchFields,
    };
    const callback = asyncSearch(options);
    onFetch(callback);

    return () => {
      cancel();
    };
  }, [debouncedValue]);

  const onSearch = (searchText) => {
    isSearching.current = true;
    setSearching(true);
    setValToSearch(searchText);
  };

  useEffect(() => {
    if (isSuccess) {
      const newOptions = result.map((option) => ({
        ...option,
        label: labels(option),
      }));
      setOptions(newOptions);

      // Cari opsi dengan label yang cocok dengan 'value' dan atur sebagai 'currentValue'
      const selectedOption = newOptions.find(option => option.label === value);
      if (selectedOption) {
        setCurrentValue(selectedOption[outputValue] || selectedOption);
      }
    } else {
      setSearching(false);
    }
  }, [isSuccess, result]);

  useEffect(() => {
    if (value && isUpdating.current) {
      setOptions([value]);
      setCurrentValue(value[outputValue] || value);
      onChange(value[outputValue] || value);
      isUpdating.current = false;
    }
  }, [value]);


  useEffect(() => {
    if (selectOptions.length > 0) {
      selectOptions.forEach((optionField) => {
        // const blk = (optionField.name == bio ? optionField._id : "");
        // const blk = (optionField.name == "Zalora" ? optionField._id : "");
        // console.log(blk);
        // onMiloOptionFieldChange(blk);
        onMiloOptionFieldChange(optionField);
        // console.log("optionField: ", optionField);
        // console.log("blk: ", blk);


        // if (blk) {
        //   // console.log(blk);
        //   onMiloOptionFieldChange("values");
        //   // onMiloOptionFieldChange(blk);
        // } else {
        //   // console.log("blk");
        //   return;
        // }










      });
    }
  }, [selectOptions]);


  return (
    <>
      <Select
        loading={isLoading}
        showSearch
        allowClear
        placeholder={translate('Search')}
        defaultActiveFirstOption={false}
        filterOption={false}
        notFoundContent={searching ? '... Searching' : <Empty />}
        value={currentValue} // Pastikan ini diatur dengan benar
        onSearch={onSearch}
        onClear={() => {
          setSearching(false);
          setCurrentValue(''); // Reset currentValue ketika clear dipilih
        }}
        onChange={handleSelectChange} // Gunakan fungsi handleSelectChange yang diperbarui
        style={{ minWidth: '100px' }}
      >
        {selectOptions.map((optionField) => (
          <Select.Option
            key={optionField[outputValue] || optionField}
            value={optionField[outputValue] || optionField}
          >
            {labels(optionField)}
          </Select.Option>
        ))}
        {withRedirect && <Select.Option value={addNewValue.value}>{addNewValue.label}</Select.Option>}
      </Select>
    </>
  );
}