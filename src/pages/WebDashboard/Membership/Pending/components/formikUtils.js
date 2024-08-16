import * as Yup from "yup";

const InitialValues = {
  memberId: "",
  progressPercentage: "100%",
  status: "pending",
  personalInformation: {
    name: "",
    nameBangla: "",
    fathersName: "",
    mothersName: "",
    dob: "",
    nidNumber: "",
    phone: "",
    email: "",
    maritalStatus: "",
    applicationDate: "",
    applicantPhoto: "",
    nidCopy: "",
    signature: "",
  },
  jobDescription: {
    designation: "",
    organization: "",
    dutyWordName: "",
    dutyShift: "",
    familiarColleaguesName1: "",
    familiarColleaguesNumber1: "",
    familiarColleaguesName2: "",
    familiarColleaguesNumber2: "",
    familiarColleaguesName3: "",
    familiarColleaguesNumber3: "",
  },
  address: {
    presentaddress: {
      village: "",
      upazila: "",
      roadNo: "",
      distric: "",
      union: "",
      postalcode: "",
    },
    permanentaddress: {
      village: "",
      upazila: "",
      roadNo: "",
      distric: "",
      union: "",
      postalcode: "",
    },
  },
  familyInformation: {
    husbandOrWifesPhoneNo: "",
    FatherOrBrotherOrSistersPhoneNo: "",
  },
  licensingAbility: {
    bnmcRegistrationNo: "",
    bnmcRegistrationYear: "",
  },
  educationalInformation: [
    // {
    //   examName: "",
    //   passingYear: "",
    //   institutesName: "",
    //   board: "",
    // },
  ],
  nomineeInformation: {
    nomineeInformation01: {
      nomineeInformationName: "",
      nomineeInformationRelation: "",
      nomineeInformationNumber: "",
      nomineeInformationDistribution: "",
    },
    nomineeInformation02: {
      nomineeInformationName: "",
      nomineeInformationRelation: "",
      nomineeInformationNumber: "",
      nomineeInformationDistribution: "",
    },
  },
};

const validationUpdateSchema = {
  personalInformation: Yup.object({
    name: Yup.string().required("Required"),
    nameBangla: Yup.string().required("Required"),
    fathersName: Yup.string().required("Required"),
    mothersName: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
    nidNumber: Yup.number().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
    applicationDate: Yup.date().required("Required"),
    applicantPhoto: Yup.string().required("Required"),
    nidCopy: Yup.string().required("Required"),
    signature: Yup.string().required("Required"),
  }),
  jobDescription: Yup.object({
    designation: Yup.string().required("Required"),
    organization: Yup.string().required("Required"),
    dutyWordName: Yup.string().required("Required"),
    dutyShift: Yup.string().required("Required"),
    familiarColleaguesName1: Yup.string().required("Required"),
    familiarColleaguesNumber1: Yup.string().required("Required"),
    familiarColleaguesName2: Yup.string().required("Required"),
    familiarColleaguesNumber2: Yup.string().required("Required"),
    familiarColleaguesName3: Yup.string().required("Required"),
    familiarColleaguesNumber3: Yup.string().required("Required"),
  }),
  address: Yup.object({
    presentaddress: Yup.object({
      village: Yup.string().required("Required"),
      upazila: Yup.string().required("Required"),
      roadNo: Yup.string().required("Required"),
      distric: Yup.string().required("Required"),
      union: Yup.string().required("Required"),
      postalcode: Yup.number().required("Required"),
    }),
    permanentaddress: Yup.object({
      village: Yup.string().required("Required"),
      upazila: Yup.string().required("Required"),
      roadNo: Yup.string().required("Required"),
      distric: Yup.string().required("Required"),
      union: Yup.string().required("Required"),
      postalcode: Yup.number().required("Required"),
    }),
  }),
  familyInformation: Yup.object({
    husbandOrWifesPhoneNo: Yup.string().required("Required"),
    FatherOrBrotherOrSistersPhoneNo: Yup.string().required("Required"),
  }),
  licensingAbility: Yup.object({
    bnmcRegistrationNo: Yup.string().required("Required"),
    bnmcRegistrationYear: Yup.string().required("Required"),
  }),
  nomineeInformation: Yup.object({
    nomineeInformation01: Yup.object({
      nomineeInformationName: Yup.string().required("Required"),
      nomineeInformationRelation: Yup.string().required("Required"),
      nomineeInformationNumber: Yup.string().required("Required"),
      nomineeInformationDistribution: Yup.string().required("Required"),
    }),
    nomineeInformation02: Yup.object({
      nomineeInformationName: Yup.string().required("Required"),
      nomineeInformationRelation: Yup.string().required("Required"),
      nomineeInformationNumber: Yup.string().required("Required"),
      nomineeInformationDistribution: Yup.string().required("Required"),
    }),
  }),
};

export { InitialValues, validationUpdateSchema };
