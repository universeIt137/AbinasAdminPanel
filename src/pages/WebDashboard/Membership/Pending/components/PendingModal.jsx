/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Input from "../../../../../shared/UIComponents/Input";
import Select from "../../../../../shared/UIComponents/Select";
import { Icon } from "@iconify/react";
import { InitialValues, validationUpdateSchema } from "./formikUtils";
import Modal from "../../../../../shared/Modal";
import FileInput from "../../../../../shared/UIComponents/FileInput";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteMemberShipPhoto,
  updateMemberShipForm,
} from "../../../../../services/webDashboard/memberShip";
import { toast } from "react-toastify";
import Loader from "../../../../../shared/Loader";

const Flex = ({ children }) => {
  return <div className="grid grid-cols-5 gap-1 px-2">{children}</div>;
};

const EducationInformation = ({
  setModal,
  educationalInfo,
  setEducationalInfo,
}) => {
  const [examName, setExamName] = useState("");
  const [institutesName, setInstituteName] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [board, setBoard] = useState("");

  const handleAdd = () => {
    if (examName && institutesName && passingYear && board) {
      const newInfo = {
        examName,
        passingYear,
        institutesName,
        board,
      };
      setEducationalInfo([...educationalInfo, newInfo]);
      // Clear input fields
      setExamName("");
      setInstituteName("");
      setPassingYear("");
      setBoard("");
    }
  };

  return (
    <div>
      <div className="ml-2 lg:ml-[150px] mt-[-25px]">
        <div>
          <div>
            <label className={`font-medium text-sm text-[#444]`}>
              Exam Name <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              onChange={(e) => setExamName(e.target.value)}
              className={`w-[75%] h-[25px] p-2 border-[1px] border-black rounded-md mt-1`}
            />
          </div>
          <div>
            <label className={`font-medium text-sm text-[#444]`}>
              Institute Name <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              onChange={(e) => setInstituteName(e.target.value)}
              className={`w-[75%] h-[25px] p-2 border-[1px] border-black rounded-md mt-1`}
            />
          </div>
          <div>
            <label className={`font-medium text-sm text-[#444]`}>
              Passing Year <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              onChange={(e) => setPassingYear(e.target.value)}
              className={`w-[75%] h-[25px] p-2 border-[1px] border-black rounded-md mt-1`}
            />
          </div>
          <div>
            <label className={`font-medium text-sm text-[#444]`}>
              board <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              onChange={(e) => setBoard(e.target.value)}
              className={`w-[75%] h-[25px] p-2 border-[1px] border-black rounded-md mt-1`}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            handleAdd();
            setModal(false);
          }}
          className="bg-secondary text-white py-1 px-4 cursor-pointer text-sm block mr-4 mt-1 rounded"
        >
          Add
        </button>
        <div className="h-[20px]"></div>
      </div>
    </div>
    // </div>
  );
};

const PendingModal = (props) => {
  const [initVals, setInitVals] = useState(InitialValues);
  const [showEducationInformation, setShowEducationInformation] =
    useState(false);
  const [educationalInfo, setEducationalInfo] = useState(
    props.selectedMemberShip?.educationalInformation ?? []
  );
  const [loading, setLoading] = useState(false);
  const [showApplicantPhoto, setShowApplicantPhoto] = useState(false);
  const [showNidcopy, setShowNidcopy] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const formikRef = useRef();
  const queryClient = useQueryClient();

  const updateMemberShipFormMutation = useMutation(updateMemberShipForm, {
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries("meberships");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    },
  });
  const deleteMemberShipPhotoMutation = useMutation(deleteMemberShipPhoto, {
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries("meberships");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      const tempSlectedForm = {
        memberId: props.selectedMemberShip?.memberId,
        personalInformation: {
          name: props.selectedMemberShip?.personalInformation?.name,
          nameBangla: props.selectedMemberShip?.personalInformation?.nameBangla,
          fathersName:
            props.selectedMemberShip?.personalInformation?.fathersName,
          mothersName:
            props.selectedMemberShip?.personalInformation?.mothersName,
          dob: props.selectedMemberShip?.personalInformation?.dob,
          nidNumber: props.selectedMemberShip?.personalInformation?.nidNumber,
          phone: props.selectedMemberShip?.personalInformation?.phone,
          email: props.selectedMemberShip?.personalInformation?.email,
          maritalStatus:
            props.selectedMemberShip?.personalInformation?.maritalStatus,
          applicationDate:
            props.selectedMemberShip?.personalInformation?.applicationDate,
          applicantPhoto:
            props.selectedMemberShip?.personalInformation?.applicantPhoto,
          nidCopy: props.selectedMemberShip?.personalInformation?.nidCopy,
          signature: props.selectedMemberShip?.personalInformation?.signature,
        },
        jobDescription: {
          designation: props.selectedMemberShip?.jobDescription?.designation,
          organization: props.selectedMemberShip?.jobDescription?.organization,
          dutyWordName: props.selectedMemberShip?.jobDescription?.dutyWordName,
          dutyShift: props.selectedMemberShip?.jobDescription?.dutyShift,
          familiarColleaguesName1:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesName1,
          familiarColleaguesNumber1:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesNumber1,
          familiarColleaguesName2:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesName2,
          familiarColleaguesNumber2:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesNumber2,
          familiarColleaguesName3:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesName3,
          familiarColleaguesNumber3:
            props.selectedMemberShip?.jobDescription?.familiarColleaguesNumber3,
        },
        address: {
          presentaddress: {
            village: props.selectedMemberShip?.address?.presentaddress?.village,
            upazila: props.selectedMemberShip?.address?.presentaddress?.upazila,
            roadNo: props.selectedMemberShip?.address?.presentaddress?.roadNo,
            distric: props.selectedMemberShip?.address?.presentaddress?.distric,
            union: props.selectedMemberShip?.address?.presentaddress?.union,
            postalcode:
              props.selectedMemberShip?.address?.presentaddress?.postalcode,
          },
          permanentaddress: {
            village:
              props.selectedMemberShip?.address?.permanentaddress?.village,
            upazila:
              props.selectedMemberShip?.address?.permanentaddress?.upazila,
            roadNo: props.selectedMemberShip?.address?.permanentaddress?.roadNo,
            distric:
              props.selectedMemberShip?.address?.permanentaddress?.distric,
            union: props.selectedMemberShip?.address?.permanentaddress?.union,
            postalcode:
              props.selectedMemberShip?.address?.permanentaddress?.postalcode,
          },
        },
        familyInformation: {
          husbandOrWifesPhoneNo:
            props.selectedMemberShip?.familyInformation?.husbandOrWifesPhoneNo,
          FatherOrBrotherOrSistersPhoneNo:
            props.selectedMemberShip?.familyInformation
              ?.FatherOrBrotherOrSistersPhoneNo,
        },
        licensingAbility: {
          bnmcRegistrationNo:
            props.selectedMemberShip?.licensingAbility?.bnmcRegistrationNo,
          bnmcRegistrationYear:
            props.selectedMemberShip?.licensingAbility?.bnmcRegistrationYear,
        },
        educationalInformation:
          props.selectedMemberShip?.educationalInformation,
        nomineeInformation: {
          nomineeInformation01: {
            nomineeInformationName:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation01
                ?.nomineeInformationName,
            nomineeInformationRelation:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation01
                ?.nomineeInformationRelation,
            nomineeInformationNumber:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation01
                ?.nomineeInformationNumber,
            nomineeInformationDistribution:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation01
                ?.nomineeInformationDistribution,
          },
          nomineeInformation02: {
            nomineeInformationName:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation02
                ?.nomineeInformationName,
            nomineeInformationRelation:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation02
                ?.nomineeInformationRelation,
            nomineeInformationNumber:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation02
                ?.nomineeInformationNumber,
            nomineeInformationDistribution:
              props.selectedMemberShip?.nomineeInformation?.nomineeInformation02
                ?.nomineeInformationDistribution,
          },
        },
      };
      setInitVals(tempSlectedForm);
    }
  }, [props.viewOrEdit]);

  const generatePayload = (values) => {
    let payload = new FormData();
    for (var key in values) {
      if (key === "personalInformation") {
        payload.append(key, JSON.stringify(values[key]));
      } else if (key === "jobDescription") {
        payload.append(key, JSON.stringify(values[key]));
      } else {
        payload.append(key, values[key]);
      }
    }
    return payload;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      values.educationalInformation = educationalInfo;
      // let payload = generatePayload(values);
      const result = await updateMemberShipFormMutation.mutateAsync(values);

      props.setModal(false);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setLoading(false);
      props.setModal(false);
    } finally {
      setSubmitting(false);
      setLoading(false);
      props.setModal(false);
    }
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
  };

  const photoDeleteHandler = async (key, id) => {
    setLoading(true);
    try {
      console.log(key, id);
      await deleteMemberShipPhotoMutation.mutateAsync({ key, id });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={initVals}
      // validationSchema={Yup.object(validationUpdateSchema)}
      onSubmit={handleSubmit}
      innerRef={formikRef}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="m-2" onChange={handleOnChange}>
          {loading && <Loader forProcess={true} />}
          <div className="flex justify-between">
            <Input label="Member ID No" type="text" name="memberId" disabled />
            <Input
              label="Application Date"
              type="date"
              name="personalInformation.applicationDate"
            />
            {props.selectedMemberShip?.personalInformation?.applicantPhoto ? (
              <div className=" place-self-center flex">
                <div className="flex flex-col">
                  <h1 className="input-label">Applicant Photo</h1>
                  <Icon
                    icon="carbon:view"
                    width={30}
                    className="mt-1 mx-auto cursor-pointer"
                    onClick={() => setShowApplicantPhoto(true)}
                  />
                </div>
              </div>
            ) : (
              <FileInput
                label="Applicant Photo"
                name="personalInformation.applicantPhoto"
              />
            )}
          </div>
          <div className="mt-0">
            <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
              Personal Information
            </h1>
            <Flex>
              <Input label="Name" type="text" name="personalInformation.name" />
              <Input
                label="Name Bengali"
                type="text"
                name="personalInformation.nameBangla"
              />
              <Input
                label="Father's Name"
                type="text"
                classes="my-0"
                name="personalInformation.fathersName"
              />
              <Input
                label="Mother's Name"
                type="text"
                classes="my-0"
                name="personalInformation.mothersName"
              />

              <Input
                name="personalInformation.dob"
                type="date"
                classes="my-0"
                label="DOB"
              />
              <Input
                label="Nid no"
                name="personalInformation.nidNumber"
                classes="my-0"
                type="number"
              />
              <Input
                label="Mobile No"
                name="personalInformation.phone"
                classes="my-0"
                type="number"
              />
              <Select
                label="Marital Status"
                name="personalInformation.maritalStatus"
              >
                <option value="married">married</option>
                <option value="unmarried">Unmarried</option>
              </Select>
              {/* <div className="">
                <label className="block input-label">Marital Status</label>
                <div className=" flex items-center ">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="maritalStatus"
                      value="married"
                      //   checked={maritalStatus === true}
                      //   onChange={() => setMaritalStatus(true)}
                    />
                    <span className="text-gray-700 ml-1">Married</span>
                  </label>
                  <label className="flex items-center ml-2">
                    <input
                      type="checkbox"
                      name="maritalStatus"
                      value="unmarried"
                      //   checked={maritalStatus === false}
                      //   onChange={() => setMaritalStatus(false)}
                    />
                    <span className="text-gray-700 ml-1">Unmarried</span>
                  </label>
                </div>
              </div> */}
              {props.selectedMemberShip?.personalInformation?.nidCopy ? (
                <div className=" place-self-left flex">
                  <div className="flex flex-col">
                    <h1 className="input-label">Nid Copy</h1>
                    <Icon
                      icon="carbon:view"
                      width={30}
                      className="mt-1 mx-auto cursor-pointer"
                      onClick={() => setShowNidcopy(true)}
                    />
                  </div>
                </div>
              ) : (
                <FileInput
                  label="Nid Copy"
                  name="personalInformation.nidCopy"
                />
              )}
              {props.selectedMemberShip?.personalInformation?.signature ? (
                <div className=" place-self-left flex">
                  <div className="flex flex-col">
                    <h1 className="input-label">Applicant Signature</h1>
                    <Icon
                      icon="carbon:view"
                      width={30}
                      className="mt-1 mx-auto cursor-pointer"
                      onClick={() => setShowSignature(true)}
                    />
                  </div>
                </div>
              ) : (
                <FileInput
                  label="Applicant Signature"
                  name="personalInformation.signature"
                />
              )}
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
                name="jobDescription.designation"
              />

              <Input
                label="Hospital/Organization Name"
                type="text"
                name="jobDescription.organization"
              />
              <Input
                label="Duty Ward Name"
                type="text"
                name="jobDescription.dutyWordName"
              />
              <Input
                label="Duty Shift"
                type="text"
                name="jobDescription.dutyShift"
              />

              <Input
                label="Familiar Colleagues 01-Name"
                type="text"
                name="jobDescription.familiarColleaguesName1"
              />
              <Input
                label="Familiar Colleagues 01-Number "
                type="number"
                name="jobDescription.familiarColleaguesNumber1"
              />

              <Input
                label="Familiar Colleagues 02-Name"
                type="text"
                name="jobDescription.familiarColleaguesName2"
              />
              <Input
                label="Familiar Colleagues 02-Number "
                type="number"
                name="jobDescription.familiarColleaguesNumber2"
              />

              <Input
                label="Familiar Colleagues 03-Name"
                type="text"
                name="jobDescription.familiarColleaguesName3"
              />
              <Input
                label="Familiar Colleagues 03-Number "
                type="number"
                name="jobDescription.familiarColleaguesNumber3"
              />
            </Flex>
          </div>
          {/* address */}
          <div className="mt-3">
            <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
              Present Address
            </h1>
            <Flex>
              <Input
                label="Village/House No"
                type="text"
                name="address.presentaddress.village"
              />

              <Input
                label="Road No"
                type="number"
                name="address.presentaddress.roadNo"
              />
              <Input
                label="Post Code"
                type="number"
                name="address.presentaddress.postalcode"
              />
              <Input
                label="Union/ Ward"
                type="text"
                name="address.presentaddress.union"
              />

              <Input
                label="Thana / Upazila"
                type="text"
                name="address.presentaddress.upazila"
              />
              <Input
                label="District "
                type="number"
                name="address.presentaddress.distric"
              />
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
                name="address.permanentaddress.village"
              />

              <Input
                label="Road No"
                type="number"
                name="address.permanentaddress.roadNo"
              />
              <Input
                label="Post Code"
                type="number"
                name="address.permanentaddress.postalcode"
              />
              <Input
                label="Union/ Ward"
                type="text"
                name="address.permanentaddress.union"
              />

              <Input
                label="Thana / Upazila"
                type="text"
                name="address.permanentaddress.upazila"
              />
              <Input
                label="District "
                type="number"
                name="address.permanentaddress.distric"
              />
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
                    name="familyInformation.husbandOrWifesPhoneNo"
                  />

                  <Input
                    label="Father/Brother/Sister’s Phone No"
                    type="text"
                    name="familyInformation.FatherOrBrotherOrSistersPhoneNo"
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
                    label="BNMC Registration No"
                    type="number"
                    name="licensingAbility.bnmcRegistrationNo"
                  />

                  <Input
                    label="BNMC Registration Year"
                    type="number"
                    name="licensingAbility.bnmcRegistrationYear"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Educational Information */}
          <div>
            <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
              Educational Information
            </h1>
            <div className="my-3 flex">
              <table className="w-[80%]">
                <thead>
                  <tr>
                    <th className="text-black border-2 px-4 py-2">Exam Name</th>
                    <th className="text-black border-2 px-4 py-2">
                      Passing Year
                    </th>
                    <th className="text-black border-2  px-4 py-2">
                      Institution’s Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {educationalInfo?.map((item, index) => (
                    <tr key={index}>
                      <td className="w-[20%] text-black border-2 px-4 py-2 text-center">
                        {item?.examName}
                      </td>
                      <td className=" w-[20%] text-black border-2 px-4 py-2 text-center">
                        {item?.passingYear}
                      </td>
                      <td className="w-[60%] text-black border-2 px-4 py-2 text-center">
                        {item?.institutesName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="bg-secondary px-3 rounded-sm text-white h-[25px] ml-1 cursor-pointer"
                onClick={() => setShowEducationInformation(true)}
              >
                ADD New Row
              </div>
            </div>
          </div>
          {/* Nominee Information */}
          <div>
            <h1 className="bg-[#ADCDEA] inline px-2 py-1 font-semibold rounded-md text-black text-[18px]">
              Nominee Information
            </h1>
            <Flex>
              <div>
                <Input
                  label="Nominee 01-Name"
                  name="nomineeInformation.nomineeInformation01.nomineeInformationName"
                  classes="my-0"
                  type="text"
                />
                <Input
                  label="Nominee 02-Name"
                  name="nomineeInformation.nomineeInformation02.nomineeInformationName"
                  classes="my-0"
                  type="text"
                />
              </div>
              <div>
                <Input
                  label="Nominee 01- Relationship"
                  name="nomineeInformation.nomineeInformation01.nomineeInformationRelation"
                  classes="my-0"
                  type="text"
                />
                <Input
                  label="Nominee 02-Relationship"
                  name="nomineeInformation.nomineeInformation02.nomineeInformationRelation"
                  classes="my-0"
                  type="text"
                />
              </div>
              <div>
                <Input
                  label="Nominee 01 Number"
                  name="nomineeInformation.nomineeInformation01.nomineeInformationNumber"
                  classes="my-0"
                  type="number"
                />
                <Input
                  label="Nominee 02 Number"
                  name="nomineeInformation.nomineeInformation02.nomineeInformationNumber"
                  classes="my-0"
                  type="number"
                />
              </div>
              <div>
                <Input
                  label="Nominee 01- Distribution %"
                  name="nomineeInformation.nomineeInformation01.nomineeInformationDistribution"
                  classes="my-0"
                  type="text"
                />
                <Input
                  label="Nominee 02-Distribution %"
                  name="nomineeInformation.nomineeInformation02.nomineeInformationDistribution"
                  classes="my-0"
                  type="text"
                />
              </div>
            </Flex>
          </div>
          <div className="flex">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitButton}`}
            >
              {isSubmitting ? (
                <Icon icon="eos-icons:loading" className="text-[24px]" />
              ) : (
                "Confirm"
              )}
            </button>
            <button
              onClick={() => props.setModal(false)}
              className={`${styles.submitButton}`}
            >
              Cancel
            </button>
          </div>
          <div className="h-[20px]"></div>
          {showEducationInformation && (
            <Modal
              title={"Set a New Educational Information"}
              setModal={setShowEducationInformation}
              width="w-[40%]"
              body={
                <EducationInformation
                  setModal={setShowEducationInformation}
                  educationalInfo={educationalInfo}
                  setEducationalInfo={setEducationalInfo}
                />
              }
            />
          )}
          {/* all modal is here */}
          {showApplicantPhoto && (
            <Modal
              setModal={setShowApplicantPhoto}
              width="w-[40%]"
              title={"Applicant Photo"}
              body={
                <div>
                  <img
                    className=""
                    src={
                      props.selectedMemberShip?.personalInformation
                        ?.applicantPhoto
                    }
                    alt=""
                  />
                  <h1
                    className="bg-red-600 text-white w-[200px] p-2 rounded-md hover:cursor-pointer flex my-2 ml-2"
                    onClick={() => {
                      photoDeleteHandler(
                        "applicantPhoto",
                        props.selectedMemberShip?._id
                      );
                      setShowApplicantPhoto(false);
                    }}
                  >
                    Delete This Photo
                    <Icon
                      icon="ic:outline-delete"
                      className="text-[22px] text-white ml-2"
                    />
                  </h1>
                  <div className="h-[5px]"></div>
                </div>
              }
            />
          )}
          {showNidcopy && (
            <Modal
              setModal={setShowNidcopy}
              width="w-[40%]"
              title={"Nid Copy"}
              body={
                <div>
                  <img
                    className=""
                    src={props.selectedMemberShip?.personalInformation?.nidCopy}
                    alt=""
                  />
                  <h1
                    className="bg-red-600 text-white w-[200px] p-2 rounded-md hover:cursor-pointer flex my-2 ml-2"
                    onClick={() => {
                      photoDeleteHandler(
                        "nidCopy",
                        props.selectedMemberShip?._id
                      );
                      setShowNidcopy(false);
                    }}
                  >
                    Delete This Photo
                    <Icon
                      icon="ic:outline-delete"
                      className="text-[22px] text-white ml-2"
                    />
                  </h1>
                  <div className="h-[5px]"></div>
                </div>
              }
            />
          )}
          {showSignature && (
            <Modal
              setModal={setShowSignature}
              width="w-[40%]"
              title={"Applicant Signature"}
              body={
                <div>
                  <img
                    className=""
                    src={
                      props.selectedMemberShip?.personalInformation?.signature
                    }
                    alt=""
                  />
                  <h1
                    className="bg-red-600 text-white w-[200px] p-2 rounded-md hover:cursor-pointer flex my-2 ml-2"
                    onClick={() => {
                      photoDeleteHandler(
                        "signature",
                        props.selectedMemberShip?._id
                      );
                      setShowSignature(false);
                    }}
                  >
                    Delete This Photo
                    <Icon
                      icon="ic:outline-delete"
                      className="text-[22px] text-white ml-2"
                    />
                  </h1>
                  <div className="h-[5px]"></div>
                </div>
              }
            />
          )}
          ;
        </Form>
      )}
    </Formik>
  );
};

const styles = {
  submitButton:
    "my-0 mx-0 ml-3  bg-green-600 hover:bg-green-600 hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center",
};

export default PendingModal;
