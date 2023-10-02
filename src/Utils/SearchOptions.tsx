import { AutoComplete, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";

const SearchOptions = ({
    SearchResult,
    onSelect,
    placeholder,
    defaultValue,
}: {
    SearchResult: any;
    onSelect: any;
    placeholder: string;
    defaultValue?: string | undefined;
}) => {
    const [options, setOptions] = useState<Array<any>>([]);

    const debounce = (func: any) => {
        let timer: any;
        return function (...args: any) {
            // const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func(args[0])
            }, 1000);
        };
    };

    useEffect(() => {
        if (defaultValue) {
          debounce(handleSearch)(defaultValue);
        }
      }, [defaultValue]);


    const handleSearch = async (value: any) => {
        if (value) {
            let data = await SearchResult(value);
            setOptions(data);
        } else {
            setOptions([]);
        }
    };

    const optimizedFn = useCallback(debounce(handleSearch), []);

    return (
        <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={optimizedFn}
            defaultValue={defaultValue}
            onChange={onSelect}
        >
            <Input.Search allowClear placeholder={placeholder} enterButton />
        </AutoComplete>
    );
};

export default SearchOptions;
