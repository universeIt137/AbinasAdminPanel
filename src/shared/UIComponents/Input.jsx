/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Field, ErrorMessage, useFormikContext, useField } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  require,
  readOnly,
  setOpeningDate,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name });
  const [date, setDate] = useState(new Date());

  if (type === "date") {
    return (
      <div className={`flex flex-col my-0 `}>
        <label htmlFor={name} className="input-label pb-2">
          {label} {require && <span className="text-red-600">*</span>}
        </label>
        <DatePicker
          className="bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary input-form"
          name={name}
          placeholderText={placeholder}
          disabled={disabled}
          selected={(field.value && new Date(field.value)) || null}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(val) => {
            setDate(val);
            setFieldValue(name, val);
            setOpeningDate(val);
          }}
        />
        <div className="text-red-600 text-[13px] my-[2px]">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col my-0">
        <label htmlFor={name} className="input-label pb-2">
          {label} {require && <span className="text-red-600">*</span>}
          {/* <span className="text-red-500 font-bold text-lg">
            {require ? "*" : ""}
          </span> */}
        </label>
        <Field
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
          readOnly={readOnly}
        />
        <div className="text-red-600 text-[13px] my-[2px]">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }
};

export default Input;
