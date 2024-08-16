import { Field, ErrorMessage, useField } from "formik";

const FileInput = ({ label, name, ...rest }) => {
  const [field, meta, helpers] = useField({ name });

  const handleChange = (event) => {
    const file = event.target.files[0];
    helpers.setValue(file);
  };

  return (
    <div className="flex flex-col my-0">
      <label htmlFor={name} className="text-[14px] font-medium pb-2">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleChange}
        {...rest}
        className="bg-input px-2 text-[14px] py-0.5 rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-primary"
      />
      <div className="text-red text-[13px] my-[2px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
export default FileInput;
