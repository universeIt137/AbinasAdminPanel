/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./membership.css";
import { Formik, Form } from "formik";
import Input from "../../../shared/UIComponents/Input";
import Select from "../../../shared/UIComponents/Select";
// eslint-disable-next-line react/prop-types
const Flex = ({ children }) => {
  return <div className="grid grid-cols-5   ">{children}</div>;
};
export default function Index() {
  const [maritalStatus, setMaritalStatus] = useState(false);

  const formikRef = useRef();
  return (
    <div className="w-[90%] mx-auto  mt-3">
      <Formik
        //   initialValues={InitialValues}
        //   validationSchema={Yup.object(validationSchema)}
        //   onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* {loading && <Loader forProcess={true} />} */}
            <div className="mt-0">
              <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                Personal Information
              </h1>
              <Flex>
                <Input label="Name" type="text" name="name" />
                <Input label="Name Bengali" type="text" name="name_bengali" />
                <Input
                  label="Father's Name"
                  type="text"
                  classes="my-0"
                  name="fathers_name"
                />
                <Input
                  label="Mother's Name"
                  type="text"
                  classes="my-0"
                  name="mothers_name"
                />

                <Input name="dob" type="date" classes="my-0" label="DOB" />
                <Input
                  label="Nid no"
                  name="nid_no"
                  classes="my-0"
                  type="number"
                />
                <Input
                  label="Mobile No"
                  name="mobile_no"
                  classes="my-0"
                  type="number"
                />
                <div className="p-8">
                  <label className="block font-bold">Marital Status</label>
                  <div className=" flex  justify-around items-center ">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="maritalStatus"
                        value="married"
                        checked={maritalStatus === true}
                        onChange={() => setMaritalStatus(true)}
                      />
                      <span className="text-gray-700">Married</span>
                    </label>
                    <label className="flex items-center space-x-2 ">
                      <input
                        type="checkbox"
                        name="maritalStatus"
                        value="unmarried"
                        checked={maritalStatus === false}
                        onChange={() => setMaritalStatus(false)}
                      />
                      <span className="text-gray-700">Unmarried</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center ">
                  <label htmlFor="nid_photo" className="">
                    Nid Copy
                  </label>
                  <button className="btn btn-primary btn-md ms-2">
                    upload
                  </button>
                </div>
                <div className="flex items-center">
                  <label htmlFor="signature_photo">Applicant Signature</label>
                  <button className="btn btn-primary btn-md ms-2">
                    upload
                  </button>
                </div>
              </Flex>
            </div>

            {/* k\job */}

            <div className="">
              <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                Job Description
              </h1>
              <Flex>
                <Input
                  label="Name of Designation"
                  type="text"
                  name="designation"
                />

                <Input
                  label="Hospital/Organization Name"
                  type="text"
                  name="hospital_organization_name"
                />
                <Input
                  label="Duty Ward Name"
                  type="text"
                  name="duty_ward_name"
                />

                <Input
                  label="Familiar Colleagues 01-Name"
                  type="text"
                  name="colleagues_name_01"
                />
                <Input
                  label="Familiar Colleagues 01-Number "
                  type="number"
                  name="colleagues_number_01"
                />

                <Input
                  label="Familiar Colleagues 02-Name"
                  type="text"
                  name="colleagues_name_02"
                />
                <Input
                  label="Familiar Colleagues 02-Number "
                  type="number"
                  name="colleagues_number_02"
                />

                <Input
                  label="Familiar Colleagues 03-Name"
                  type="text"
                  name="colleagues_name_03"
                />
                <Input
                  label="Familiar Colleagues 03-Number "
                  type="number"
                  name="colleagues_number_03"
                />
              </Flex>
            </div>
            {/* address */}
            <div className="mt-3">
              <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                Permanent Address
              </h1>
              <Flex>
                <Input
                  label="Village/House No"
                  type="text"
                  name="village_house_no"
                />

                <Input
                  label="Post office/ Road No"
                  type="text"
                  name="post_office_road_no"
                />
                <Input label="Union/ Ward" type="text" name="union_word_no" />

                <Input
                  label="Thana / Upazila"
                  type="text"
                  name="thana_upazila"
                />
                <Input label="District " type="number" name="distric" />
              </Flex>
            </div>
            <div className="mt-3">
              <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                Present Address
              </h1>
              <Flex>
                <Input
                  label="Village/House No"
                  type="text"
                  name="village_house_no"
                />

                <Input
                  label="Post office/ Road No"
                  type="text"
                  name="post_office_road_no"
                />
                <Input label="Union/ Ward" type="text" name="union_word_no" />

                <Input
                  label="Thana / Upazila"
                  type="text"
                  name="thana_upazila"
                />
                <Input label="District " type="number" name="distric" />
              </Flex>
            </div>

            <div className="mt-3">
              <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                Permanent Address
              </h1>
              <Flex>
                <Input
                  label="Village/House No"
                  type="text"
                  name="village_house_no"
                />

                <Input
                  label="Post office/ Road No"
                  type="text"
                  name="post_office_road_no"
                />
                <Input label="Union/ Ward" type="text" name="union_word_no" />

                <Input
                  label="Thana / Upazila"
                  type="text"
                  name="thana_upazila"
                />
                <Input label="District " type="number" name="distric" />
              </Flex>
            </div>

            {/* Family Information */}

            <div className="grid grid-cols-5 ">
              <div className="col-span-2">
                <div className="">
                  <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                    Family Information
                  </h1>
                  <div className="grid grid-cols-2">
                    <Input
                      label="Husband/Wife’s Phone No"
                      type="text"
                      name="husband_wife_phone_no"
                    />

                    <Input
                      label="Father/Brother/Sister’s Phone No"
                      type="text"
                      name="parents_phone_no"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="">
                  <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
                    Licensing Ability
                  </h1>
                  <div className="grid grid-cols-2">
                    <Input
                      label="Husband/Wife’s Phone No"
                      type="text"
                      name="husband_wife_phone_no"
                    />

                    <Input
                      label="Father/Brother/Sister’s Phone No"
                      type="text"
                      name="parents_phone_no"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
