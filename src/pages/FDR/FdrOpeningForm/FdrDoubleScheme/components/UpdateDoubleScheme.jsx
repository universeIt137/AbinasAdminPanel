import Modal from "../../../../../shared/Modal";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Input from "../../../../../shared/UIComponents/Input";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../../shared/Loader";
import { createFdr, updateFdr } from "../../../../../services/webDashboard/fdr";
import { initialValues, tableHeader } from "./DoubleSchemeOpeningForm";
import SchemeConditionTable from "../../../SchemeConditionTable";

const Flex = ({ children }) => {
  return <div className="grid grid-cols-3 gap-2 px-2">{children}</div>;
};

const FdrUpdateBody = (props) => {
  const [initialVal, setInitialVal] = useState(initialValues);

  const [naration, setNaration] = useState("");
  const [principleAmount, setPrincipleAmount] = useState("");
  const [matureAmount, setMatureAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [interestCollectionDuration, setInterestCollectionDuration] =
    useState(1);
  const [paymentMethod, setPaymentmethod] = useState("cash");
  const [interestRate, setInterestRate] = useState("");
  const [perInterestPayment, setPerInterestPayment] = useState("");
  const [vat, serVat] = useState("");
  const [schemeCondition, setSchemeCondition] = useState([]);
  const [loading, setLoading] = useState(false);

  const formikRef = useRef();
  const queryClient = useQueryClient();

  const updateFdrMutation = useMutation(updateFdr, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fdrForm");
      setLoading(false);
      props.setShowFdrUpdate(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    console.log(props?.selectedFdrUpdate?.naration);
    setInitialVal(props?.selectedFdrUpdate);
    setMatureAmount(props?.selectedFdrUpdate?.matureAmount);
    setSchemeCondition(props?.selectedFdrUpdate?.schemeCondition);
    setPaymentmethod(props?.selectedFdrUpdate?.paymentMethod);
    setNaration(props?.selectedFdrUpdate?.naration);
    setPerInterestPayment(props?.selectedFdrUpdate?.perInterestPayment);
    serVat(props?.selectedFdrUpdate?.vat);
    setInterestRate(props?.selectedFdrUpdate?.interestRate);
    setInterestCollectionDuration(
      props?.selectedFdrUpdate?.interestCollectionDuration
    );
    setDuration(props?.selectedFdrUpdate?.duration);
    setPrincipleAmount(props?.selectedFdrUpdate?.principleAmount);
  }, [props?.selectedFdrUpdate]);

  const submitHandler = async (values, { resetForm }) => {
    values.paymentMethod = paymentMethod;
    values.schemeCondition = schemeCondition;
    values.matureAmount = matureAmount;
    values.naration = naration;
    values.fdrType = "double";
    console.log(values);
    try {
      await updateFdrMutation.mutateAsync(values);
      resetForm();
      setSchemeCondition([]);
      setMatureAmount("");
      setPerInterestPayment("");
      setNaration("");
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const userProfilt = (pAmount, intRate, vat) => {
    const interest = (Number(pAmount) * Number(intRate)) / 100;
    const totalVat = (Number(pAmount) * Number(vat)) / 100;

    return interest - totalVat;
  };

  const perCollection = (profit, duration, collecctionDuration) => {
    const perCollection = Math.floor(
      profit / ((duration * 12) / collecctionDuration)
    );
    return perCollection;
  };

  const newMatureAccount = (pAmount, profit) => {
    const mAmount = Math.floor(Number(pAmount) + profit);
    return mAmount;
  };

  const checkAllfeild = (...field) => {
    for (let status of field) {
      if (!status) return false;
    }
    return true;
  };

  const schemeConditionGenerate = (
    principleAmount,
    interestRate,
    vat,
    timeDuration,
    matureAmount
  ) => {
    // console.log("principleAmount: " + principleAmount);
    // console.log("interestRate: " + interestRate);
    // console.log("vat: " + vat);
    // console.log("timeDuration: " + timeDuration);
    // console.log("matureAmount: " + matureAmount);
    const currentDate = openingDate ? new Date(openingDate) : new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const matureAmountWithOutVat =
      Number(principleAmount) +
      (Number(principleAmount) * Number(interestRate)) / 100;

    const newCondition = [...Array(Number(timeDuration) + 1)].map(
      (condition, index) => {
        return {
          year: index,
          matureDate: `${month}/${day}/${year + index}`,
          insrate: Number(interestRate),
          vat: Number(vat),
          mAmountWithVat: matureAmount,
          matureAmountWithOutVat,
          principleAmount: Number(principleAmount),
        };
      }
    );

    console.log(newCondition);
    setSchemeCondition(newCondition);
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "duration") {
      console.log("object");
      if (
        checkAllfeild(
          principleAmount,
          interestRate,
          vat,
          interestCollectionDuration
        )
      ) {
        const profit = userProfilt(principleAmount, interestRate, vat);

        const perCollectionAmount = perCollection(
          profit,
          e.target.value,
          interestCollectionDuration
        );
        setPerInterestPayment(perCollectionAmount);
      }

      schemeConditionGenerate(
        principleAmount,
        interestRate,
        vat,
        Number(e.target.value),
        matureAmount
      );

      setDuration(e.target.value);
    }

    if (e.target.name === "interestCollectionDuration") {
      if (checkAllfeild(principleAmount, interestRate, vat, duration)) {
        const profit = userProfilt(principleAmount, interestRate, vat);
        const perCollectionAmount = perCollection(
          profit,
          duration,
          e.target.value
        );

        setPerInterestPayment(perCollectionAmount);
        schemeConditionGenerate(
          principleAmount,
          interestRate,
          vat,
          duration,
          matureAmount
        );
      }
      setInterestCollectionDuration(e.target.value);
    }

    if (e.target.name === "interestRate") {
      if (checkAllfeild(principleAmount, vat)) {
        const profit = userProfilt(principleAmount, e.target.value, vat);
        const newMAmount = newMatureAccount(principleAmount, profit);
        const perCollectionAmount = perCollection(
          profit,
          duration,
          interestCollectionDuration
        );
        setMatureAmount(newMAmount);
        setPerInterestPayment(perCollectionAmount);
        schemeConditionGenerate(
          principleAmount,
          e.target.value,
          vat,
          duration,
          newMAmount
        );
      }

      setInterestRate(e.target.value);
    }

    if (e.target.name === "vat") {
      if (checkAllfeild(principleAmount, interestRate)) {
        const profit = userProfilt(
          principleAmount,
          interestRate,
          e.target.value
        );
        const newMAmount = newMatureAccount(principleAmount, profit);
        const perCollectionAmount = perCollection(
          profit,
          duration,
          interestCollectionDuration
        );
        setMatureAmount(newMAmount);
        setPerInterestPayment(perCollectionAmount);
        schemeConditionGenerate(
          principleAmount,
          interestRate,
          e.target.value,
          duration,
          newMAmount
        );
      }

      serVat(e.target.value);
    }

    if (e.target.name === "principleAmount") {
      console.log("object.principleAmount");
      if (checkAllfeild(interestRate, vat)) {
        const profit = userProfilt(e.target.value, interestRate, vat);
        const newMAmount = newMatureAccount(e.target.value, profit);

        const perCollectionAmount = perCollection(
          profit,
          duration,
          interestCollectionDuration
        );

        setPerInterestPayment(perCollectionAmount);
        setMatureAmount(newMAmount);
        schemeConditionGenerate(
          e.target.value,
          interestRate,
          vat,
          duration,
          newMAmount
        );
      }

      setPrincipleAmount(e.target.value);
    }

    if (e.target.name === "naration") {
      // console.log("object");
      setNaration(e.target.value);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="bg-primary rounded-md p-2 pt-0 overflow-y-scroll">
        <h1 className="text-center m-0   section-title">
          FDR Single Scheme Opening Form
        </h1>
        <div className=" ">
          <Formik
            initialValues={initialVal}
            //   validationSchema={Yup.object(validationSchema)}
            onSubmit={submitHandler}
            innerRef={formikRef}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form onChange={onChangeHandler}>
                {/* {loading && <Loader forProcess={true} />} */}

                <div className=" backdrop: bg-white ">
                  <div className="  p-2 pb-0">
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
                        setOpeningDate={setOpeningDate}
                      />

                      <Input
                        label="Duration"
                        name="duration"
                        type="number"
                        require={true}
                      />
                    </Flex>

                    <Flex>
                      {/* <Input
                        label="Interest Collection Duration"
                        name="interestCollectionDuration"
                        type="number"
                        require={true}
                      /> */}
                      <Input
                        label="Interest Rate"
                        name="interestRate"
                        type="number"
                        require={true}
                      />
                      <Input
                        label="Vat Rate"
                        name="vat"
                        type="number"
                        require={true}
                      />

                      <Input
                        label="Transaction Number "
                        name="trnxIDCheckNoOthers"
                        type="text"
                        require={true}
                      />
                    </Flex>

                    <Flex>
                      <Input
                        label="Principle Amount"
                        name="principleAmount"
                        type="number"
                        require={true}
                      />

                      <div className="flex flex-col my-0">
                        <label
                          htmlFor="matureAmount"
                          className="input-label pb-2"
                        >
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

                      <div>
                        <label
                          htmlFor="email"
                          className="font-semibold text-sm mt-1"
                          style={{ display: "block" }}
                        >
                          Payment Methods{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="colorss"
                          value={paymentMethod}
                          onChange={(e) => setPaymentmethod(e.target.value)}
                          style={{ display: "block" }}
                          className="border-2 border-[#000000CC] rounded-[6px] w-[200px] bg-primary mt-1"
                        >
                          <option value="cash">Cash</option>
                          <option value="bank">Bank</option>
                          <option value="mobileBanking">Mobile Banking</option>
                        </select>
                      </div>
                    </Flex>
                    <Flex>
                      <div className="   ">
                        <div className="      ">
                          <h1 className="  text-[14px] font-medium pb-2 mr-2">
                            Naration:
                          </h1>
                          <textarea
                            rows="2"
                            name="naration"
                            value={naration}
                            className=" w-[350px]     px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                          />
                        </div>
                      </div>
                    </Flex>
                  </div>

                  <div className=" p-2 pt-0">
                    <SchemeConditionTable
                      headers={tableHeader}
                      data={schemeCondition}
                      setSchemeCondition={setSchemeCondition}
                      tableHeight={40}
                    />
                    <div className="flex justify-end p-2 py-0  ">
                      <button
                        type="reset"
                        className={`${styles.submitButton} mr-2 text-white hover:text-black`}
                      >
                        Clear
                      </button>
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
    "my-0 mx-0 bg-secondary hover:bg-primary hover:outline hover:outline-2 hover:outline-secondary hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-black text-[16px] w-[130px] py-[2px] px-2  rounded-md flex justify-center items-center",
};

const UpdateDoubleScheme = (props) => {
  return (
    <div>
      {props?.showFdrUpdate && (
        <Modal
          title="Update FDR Info"
          subtitle="enter the currect information to update"
          setModal={props.setShowFdrUpdate}
          body={<FdrUpdateBody {...props} />}
        />
      )}
    </div>
  );
};

export default UpdateDoubleScheme;
