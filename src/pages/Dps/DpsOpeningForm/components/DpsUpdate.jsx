/* eslint-disable react/prop-types */

import Modal from "../../../../shared/Modal";
import { Formik, Form, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../shared/Loader";
import { initialValues } from "./OpeningForm";
import Input from "../../../../shared/UIComponents/Input";
import { createDps, updateDps } from "../../../../services/webDashboard/dps";

const Flex = ({ children }) => {
  return <div className="grid grid-cols-3 gap-2 px-2">{children}</div>;
};
// console.log(initialValues);

const DpsUpdateBody = (props) => {
  const [initialVal, setInitialVal] = useState(initialValues);

  const [monthlyInstAmount, setMonthlyInstAmount] = useState("");
  const [principleAmount, setPrincipleAmount] = useState("");
  const [matureAmount, setMatureAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [noOfInstallment, setNoOfInstallment] = useState("");
  const [naration, setNaration] = useState("");

  const [loading, setLoading] = useState(false);

  const formikRef = useRef();
  const queryClient = useQueryClient();
  const updateDpsMutation = useMutation(updateDps, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("dpsForm");
      setLoading(false);
      props.setShowDpsUpdate(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    setInitialVal(props?.selectedDpsUpdate);
    setNoOfInstallment(props?.selectedDpsUpdate?.noOfInstallment);
    setMonthlyInstAmount(props?.selectedDpsUpdate?.monthlyInstAmount);
    setMatureAmount(props?.selectedDpsUpdate?.matureAmount);
    setPrincipleAmount(props?.selectedDpsUpdate?.principleAmount);
    setNaration(props?.selectedDpsUpdate?.naration);

    console.log(props?.selectedDpsUpdate);
  }, [props?.selectedDpsUpdate]);

  const submitHandler = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const bodyData = {
        dpsNumber: values.dpsNo,
        memberID: values.memberID,
        openingDate: values.openingDate,
        interestRate: Number(values.interestRate),
        duration: Number(values.duration),
        noOfInstallment: Number(noOfInstallment),
        monthlyInstAmount: Number(monthlyInstAmount),
        principleAmount: Number(principleAmount),
        matureAmount: Number(matureAmount),
        lastPayDate: values.lastPayDate,
        lateFee: values.lateFee,
        firstInstallmentAmount: values.firstInstallmentAmount,
        trnxIDCheckNoOthers: values.trnxIDCheckNoOthers,
        naration: naration,
        id: props?.selectedDpsUpdate._id,
      };
      // console.log(bodyData);
      await updateDpsMutation.mutateAsync(bodyData);
      resetForm();
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "duration") {
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
      <div className=" bg-primary  ">
        <h1 className="text-center m-0 py-1 section-title">FDR Update Form</h1>
        <div className="bg-white py-2">
          <Formik
            initialValues={initialVal}
            //   validationSchema={Yup.object(validationSchema)}
            onSubmit={submitHandler}
            innerRef={formikRef}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form onChange={onChangeHandler}>
                {/* {loading && <Loader forProcess={true} />} s*/}

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
                    // require={true}
                  />
                  <Input
                    label="Interest Rate"
                    name="interestRate"
                    type="number"
                    require={true}
                  />

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
                    type="number"
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
                  />

                  <Input
                    label="Transaction Number"
                    name="trnxIDCheckNoOthers"
                    type="string"
                  />
                </Flex>

                <div className="flex justify-between mt-1 mx-3 pb-1">
                  <div className=" flex items-center    ">
                    <h1 className="  text-[14px] font-medium pb-2 mr-2">
                      Naration:
                    </h1>
                    <textarea
                      rows="2"
                      value={naration}
                      name="naration"
                      className="  w-80  px-2  rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                    />
                  </div>

                  {/* <div className="flex justify-end  p-2 pt-0   "> */}
                  <div className=" flex items-end ">
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

const DpsUpdate = (props) => {
  return (
    <div>
      {props?.showDpsUpdate && (
        <Modal
          title="Update Dps Info"
          subtitle="enter the currect information to update"
          setModal={props.setShowDpsUpdate}
          body={<DpsUpdateBody {...props} />}
        />
      )}
    </div>
  );
};

const styles = {
  submitButton:
    "my-0 mx-0 bg-secondary hover:bg-primary hover:outline hover:outline-2 hover:outline-secondary hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-black text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center",
};

export default DpsUpdate;
