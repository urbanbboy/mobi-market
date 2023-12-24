import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cls from './DatePickerInput.module.scss'

interface DatePickerInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    dateFormat?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
    value,
    onChange,
    placeholder,
    readOnly,
    dateFormat
}) => {
    const handleDateChange = (date: Date) => {
        onChange?.(date.toISOString().split('T')[0]);
    };

    const isReadOnly = readOnly ? cls.readOnly : ''

    return (
        <div className={isReadOnly}>
            <ReactDatePicker
                dateFormat={dateFormat}
                className={cls.DatePicker}
                selected={value ? new Date(value) : undefined}
                onChange={handleDateChange}
                placeholderText={placeholder}
                readOnly={readOnly}
            />
        </div>
    );
};
