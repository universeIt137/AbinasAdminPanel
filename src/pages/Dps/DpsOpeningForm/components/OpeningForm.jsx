/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Select from "../../../../shared/UIComponents/Select";
import { Icon } from "@iconify/react";
import Input from "../../../../shared/UIComponents/Input";
import { useMutation, useQueryClient } from "react-query";
import { createDps } from "../../../../services/webDashboard/dps";
import Loader from "../../../../shared/Loader";

export const initialValues = {
  memberID: "",
  openingDate: "",
  interestRate: "",
  duration: "",
  noOfInstallment: "",
  monthlyInstAmount: "",
  principleAmount: "",
  matureAmount: "",
  lastPayDate: "",
  lateFee: "",
  firstInstallmentAmount: "",
  trnxIDCheckNoOthers: "",
  naration: "",
};

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-3 justify-center gap-2 px-2">{children}</div>
  );
};

const OpeningForm = ({ allMembership, setSelectedMemberShip }) => {
  const [naration, setNaration] = useState("");
  const [monthlyInstAmount, setMonthlyInstAmount] = useState("");
  const [principleAmount, setPrincipleAmount] = useState("");
  const [matureAmount, setMatureAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [noOfInstallment, setNoOfInstallment] = useState("");
  const [loading, setLoading] = useState(false);

  const formikRef = useRef();
  const queryClient = useQueryClient();

  const createDpsMutation = useMutation(createDps, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("dpsForm");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const submitHandler = async (values, { resetForm }) => {
    // setLoading(true);
    values.noOfInstallment = noOfInstallment;
    values.monthlyInstAmount = monthlyInstAmount;
    values.matureAmount = matureAmount;
    values.naration = naration;
    values.principleAmount = principleAmount;

    setNoOfInstallment("");
    setMonthlyInstAmount("");
    setMatureAmount("");
    setPrincipleAmount("");
    setNaration("");

    // console.log(values);
    try {
      await createDpsMutation.mutateAsync(values);
      resetForm();
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "memberID") {
      const result = allMembership?.filter(
        (item) => item.memberId === e.target.value
      );
      setSelectedMemberShip(result);
    }

    if (e.target.name === "duration") {
      setDuration(e.target.value);
      setNoOfInstallment(Math.ceil(e.target.value * 12));
    }
    if (e.target.name === "interestRate") {
      setInterestRate(e.target.value);
      const interest = (Number(principleAmount) * Number(e.target.value)) / 100;
      setMatureAmount(Math.ceil(principleAmount + interest));
    }
    if (e.target.name === "monthlyInstAmount") {
      setMonthlyInstAmount(e.target.value);

      const tempInstAmount = Number(e.target.value) * Number(noOfInstallment);
      setPrincipleAmount(Math.ceil(tempInstAmount));

      const interest = (Number(tempInstAmount) * Number(interestRate)) / 100;

      setMatureAmount(Math.ceil(interest + Number(tempInstAmount)));
    }
    if (e.target.name === "naration") {
      setNaration(e.target.value);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="bg-primary rounded-md pt-1 px-2">
        <h1 className="text-center m-0 p-0 section-title">DPS Opening Form</h1>
        <div className="bg-white">
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            innerRef={formikRef}
          >
            {({ isSubmitting }) => (
              <Form className="pb-2" onChange={onChangeHandler}>
                {/* {loading && <Loader forProcess={true} />} */}

                <Flex>
                  <Input
                    label="Member ID"
                    name="memberID"
                    type="text"
                    require={true}
                  />
                  <Input
                    label="Opening  Date"
                    name="openingDate"
                    type="date"
                    require={true}
                  />
                  <Input
                    label="Interest Rate - %"
                    name="interestRate"
                    type="number"
                    require={true}
                  />
                </Flex>

                <Flex>
                  <Input
                    label="Duration"
                    name="duration"
                    type="number"
                    require={true}
                  />
                  <div className="flex flex-col my-0">
                    <label
                      htmlFor="noOfInstallment"
                      className="input-label pb-2"
                    >
                      No of Installment
                    </label>
                    <Field
                      type="number"
                      name="noOfInstallment"
                      className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                      value={noOfInstallment}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col my-0">
                    <label
                      htmlFor="monthlyInstAmount"
                      className="input-label pb-2"
                    >
                      Monthly Inst. Amount
                    </label>
                    <Field
                      type="number"
                      name="monthlyInstAmount"
                      className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                      value={monthlyInstAmount}
                      require={true}
                    />
                  </div>
                </Flex>
                <Flex>
                  <div className="flex flex-col my-0">
                    <label
                      htmlFor="principleAmount"
                      className="input-label pb-2"
                    >
                      Principle Amount
                    </label>
                    <Field
                      name="principleAmount"
                      className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                      type="number"
                      value={principleAmount}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col my-0">
                    <label htmlFor="matureAmount" className="input-label pb-2">
                      Mature Amount
                    </label>
                    <Field
                      type="number"
                      name="matureAmount"
                      className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                      value={matureAmount}
                      readOnly
                    />
                  </div>
                  <Input
                    label="Last Pay Date"
                    name="lastPayDate"
                    type="string"
                    require={true}
                  />
                </Flex>

                <Flex>
                  <Input
                    label="Late Fee"
                    name="lateFee"
                    type="number"
                    require={true}
                  />

                  <Input
                    label="First Ins. Payment"
                    name="firstInstallmentAmount"
                    type="number"
                    require={true}
                  />

                  <Input
                    label="Transaction Number"
                    name="trnxIDCheckNoOthers"
                    type="string"
                    require={true}
                  />
                </Flex>

                <div className="flex justify-between mt-1 mx-3">
                  <div className=" flex items-center    ">
                    <h1 className="  text-[14px] font-medium pb-2 mr-2">
                      Naration:
                    </h1>
                    <textarea
                      rows="2"
                      name="naration"
                      className="  w-60  px-2  rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                    />
                  </div>

                  {/* <div className="flex justify-end  p-2 pt-0   "> */}
                  <div className=" flex items-end">
                    <div>
                      <button
                        type="reset"
                        className={`${styles.submitButton} mr-2 text-white hover:text-black`}
                      >
                        Clear
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${styles.submitButton} text-white hover:text-black`}
                      >
                        {isSubmitting ? (
                          <Icon
                            icon="eos-icons:loading"
                            className="text-[24px]"
                          />
                        ) : (
                          "Submit Form"
                        )}
                      </button>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const styles = {
  submitButton:
    "m-0 bg-secondary hover:bg-primary hover:outline hover:outline-2 hover:outline-secondary hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-black text-[16px] w-[130px] py-1 px-2 mt-2 rounded-md flex justify-center items-center",
};

export default OpeningForm;
