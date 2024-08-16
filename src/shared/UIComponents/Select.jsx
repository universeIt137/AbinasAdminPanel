/* eslint-disable react/prop-types */

import { Field, ErrorMessage } from "formik";

const Select = ({ label, name, require, children }) => {
  return (
    <div className="flex flex-col my-0">
      <label htmlFor={name} className="input-label pb-2">
        {label} {require && <span className="text-red-600">*</span>}
      </label>
      <Field
        name={name}
        as="select"
        className="input-form bg-input px-2 py-[2px] rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary"
      >
        {children}
      </Field>
      <div className="text-red-600 text-[13px] my-[2px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Select;
