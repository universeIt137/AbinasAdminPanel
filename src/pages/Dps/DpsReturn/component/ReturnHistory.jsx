/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../../shared/Modal";
import { useMutation, useQueryClient } from "react-query";
import {
  dpsReturnAmount,
  dpsStatusChange,
  dpsTotalLateFee,
} from "../../../../services/webDashboard/dps";
import { toast } from "react-toastify";
import Loader from "../../../../shared/Loader";
import ReactToPrint from "react-to-print";

const CloseBody = ({
  setShowCloseModal,
  selectedId,
  setUpdateStatus,
  returnData,
  totalLateFee,
}) => {
  const [loading, setLoading] = useState(false);
  const [lateFeeDue, setLateFeeDue] = useState(
    totalLateFee - returnData?.totalLateFeePaid
  );
  const [givenRate, setGivenRate] = useState(returnData?.interestRate);
  const [lateFeePay, setLateFeePay] = useState(
    totalLateFee - returnData?.totalLateFeePaid
  );

  const [retunableAmount, setRetunableAmount] = useState(
    Math.ceil(
      (Number(returnData?.interestRate) * Number(returnData?.totalPaid)) / 100
    )
  );

  const [newMatureAmount, setNewMatureAmount] = useState(
    retunableAmount + Number(returnData?.totalPaid)
  );
  const [totalReturnAmout, setTotalReturnAmout] = useState(
    newMatureAmount - lateFeeDue
  );
  const queryClient = useQueryClient();
  const closeDpsMutation = useMutation(dpsStatusChange, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("depsHistory");
      toast.success("Dps Colse");
      setLoading(false);
      setShowCloseModal(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    // setNewMatureAmount(retunableAmount + Number(returnData?.totalPaid));
  }, [retunableAmount]);

  useEffect(() => {
    // setRetunableAmount(newMatureAmount - lateFeePay);
  }, [lateFeePay]);

  const handleInterest = (e) => {
    setGivenRate(e.target.value);

    const adjMA =
      Number(returnData?.totalPaid) +
      Math.ceil((Number(e.target.value) * Number(returnData?.totalPaid)) / 100);

    setNewMatureAmount(adjMA);

    setTotalReturnAmout(adjMA - lateFeePay);
  };

  const handleAdjustLateFee = (e) => {
    setLateFeePay(e.target.value);
    console.log(newMatureAmount);
    setTotalReturnAmout(newMatureAmount - e.target.value);
  };

  const submitHandler = async () => {
    try {
      const tempData = {
        id: selectedId,
        adjustableMatureAmount: totalReturnAmout,
        adjustReturnableAmount: lateFeePay,
      };
      console.log(tempData);
      await closeDpsMutation.mutateAsync(tempData);
      setUpdateStatus(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4">
      {loading && <Loader forProcess={true} />}
      <h1 className="text-xl font-semibold my-2 text-center text-yellow-800">
        Total Dps Payment : {returnData?.totalPaid}
      </h1>
      <div className=" grid grid-cols-2 gap-4 justify-between">
        <div className="bg-slate-200 p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Dps interestRate : {returnData?.interestRate}
          </h1>
          <div className="flex flex-col mt-4">
            <label htmlFor="monthlyInstAmount" className="input-label pb-2">
              Adjust Interest percent %
            </label>
            <input
              type="number"
              className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
              value={givenRate}
              onChange={handleInterest}
            />
          </div>
          <h1 className="  font-semibold">
            Interest Amount :{" "}
            {Math.ceil(
              (Number(givenRate) * Number(returnData?.totalPaid)) / 100
            )}
          </h1>
          <h1 className="  font-semibold">Mature Amount : {newMatureAmount}</h1>
        </div>
        <div className="bg-slate-200 p-4 rounded-md">
          <h1 className="text-xl font-semibold ">
            Due Late Fee : {lateFeeDue}
          </h1>
          <div className="flex flex-col mt-4">
            <label htmlFor="monthlyInstAmount" className="input-label pb-2">
              Adjust Retunable Amount
            </label>
            <input
              type="number"
              className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
              value={lateFeePay}
              onChange={handleAdjustLateFee}
            />
          </div>

          <h1 className="  font-semibold">
            Adjust Retunable Amount : {lateFeePay}
          </h1>
          <h1 className="  font-semibold">
            New Mature Amount : {totalReturnAmout}
          </h1>
        </div>
      </div>

      <h1 className="text-xl font-semibold  mt-2 text-center">
        <span className="text-yellow-800">
          {" "}
          User Total Returnable Amount : <br /> {newMatureAmount} - {lateFeePay}{" "}
          ={" "}
        </span>
        <span className="text-green-600">{totalReturnAmout}</span>
      </h1>

      <h1 className="text-xl font-semibold  mt-2 text-center">
        <span className="text-rose-500">
          {" "}
          User Benifit : <br /> {totalReturnAmout} - {returnData?.totalPaid} ={" "}
        </span>
        <span className="text-green-600">
          {totalReturnAmout - returnData?.totalPaid}
        </span>
      </h1>
      <div className="flex justify-center">
        <button
          className="bg-red-600 px-8 py-2 rounded-md text-white mt-5"
          onClick={submitHandler}
        >
          Close DPS
        </button>
      </div>
    </div>
  );
};

const PaymentBody = ({
  setShowPaymentModal,
  selectedId,
  setUpdateStatus,
  maxReturn,
}) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [transjectionNo, setTransjectionNo] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const dpsReturnAmountMutation = useMutation(dpsReturnAmount, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("depsHistory");
      setLoading(false);
      setShowPaymentModal(false);
      toast.success("Your DPS Payment success");
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
      setShowPaymentModal(false);
    },
  });
  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      if (paymentAmount <= maxReturn) {
        const newPaymentData = {
          id: selectedId,
          trnxIDCheckNoOthers: transjectionNo,
          returnAmount: paymentAmount,
        };
        await dpsReturnAmountMutation.mutateAsync(newPaymentData);
        setUpdateStatus(true);
        setLoading(false);
      } else {
        toast.error("Your Payment large amount");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowPaymentModal(false);
    }
  };
  return (
    <div className="p-5">
      {loading && <Loader forProcess={true} />}
      <div className="flex flex-col my-0">
        <label htmlFor="monthlyInstAmount" className="input-label pb-2">
          Amount
        </label>
        <input
          type="number"
          className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </div>

      <div className="flex flex-col my-0">
        <label htmlFor="monthlyInstAmount" className="input-label pb-2">
          Tnx ID
        </label>
        <input
          type="text"
          name="monthlyInstAmount"
          className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
          onChange={(e) => setTransjectionNo(e.target.value)}
          required
        />
      </div>

      <div className="flex ">
        <button
          type="submit"
          className={`${styles.submitButton} mr-2 text-white hover:text-black`}
          onClick={onSubmitHandler}
        >
          Submit
        </button>
        <button
          type="reset"
          className={`${styles.submitButton} mr-2 text-white hover:text-black`}
          onClick={() => {
            setShowPaymentModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const PrintBody = ({ retunHistory, returnData }) => {
  const componentRef = useRef();

  console.log(retunHistory);
  return (
    <>
      <h1 className="flex justify-end mr-4 mt-2">
        <ReactToPrint
          trigger={() => (
            <Icon
              icon="material-symbols:print"
              width={30}
              color="black"
              className="cursor-pointer w-[30px]  "
            />
          )}
          content={() => componentRef.current}
        />
      </h1>
      <div ref={componentRef}>
        <h1 className="text-center text-2xl  font-bold mt-2">
          Abinash Foundation
        </h1>

        <hr className="my-2" />
        <div className="flex justify-center pb-8">
          <table className="my-2">
            <tr className="border  ">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                Date:
              </th>
              <td className="table-data-font text-xl border-2 px-1 text-center w-[300px]">
                {retunHistory?.returnDate}
              </td>
            </tr>
            <tr className="border  ">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                DPS No:
              </th>
              <td className="table-data-font   text-xl border-2 px-1 text-center w-[300px]">
                {returnData?.dpsNo}
              </td>
            </tr>
            <tr className="border">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                Payment Amount:{" "}
              </th>
              <td className="table-data-font text-xl border-2 px-1 text-center w-[300px]">
                {retunHistory?.amount}
              </td>
            </tr>
            <tr className="border">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                Transaction Number:{" "}
              </th>
              <td className="table-data-font text-xl border-2 px-1 text-center w-[300px]">
                {retunHistory?.trnxIDCheckNoOthers}
              </td>
            </tr>

            <tr className="border">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                Received By:
              </th>
              <td className="table-data-font  text-xl border-2 px-1 text-center w-[300px]">
                {returnData?.name}
              </td>
            </tr>
            <tr className="border">
              <th className="table-header-font text-right pr-4 text-xl border-2 w-[300px]">
                Received From:
              </th>
              <td className="table-data-font text-xl border-2 px-1 text-center w-[300px]">
                {retunHistory?.adminName}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

const ReturnHistory = ({ selectedReturn, setUpdateStatus }) => {
  const [returnData, setReturnData] = useState({});
  const [retunHistory, setRetunHistory] = useState([]);
  const [singleRetunHistory, setSingleRetunHistory] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [totalLateFee, setTotalLateFee] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (selectedReturn) {
      const totalLateFees = dpsTotalLateFee(selectedReturn[0]);
      setTotalLateFee(totalLateFees);
      const tempData = {
        _id: selectedReturn[0]?._id,
        dpsNo: selectedReturn[0]?.dpsNo,
        memberId: selectedReturn[0]?.memberID,
        name: selectedReturn[0]?.userId?.personalInformation?.name,
        mobile: selectedReturn[0]?.userId?.personalInformation?.phone,
        duration: selectedReturn[0]?.duration,
        matureAmount: selectedReturn[0]?.matureAmount,
        totalPaid: selectedReturn[0]?.totalPaid,
        totalReturn: selectedReturn[0]?.totalReturn,
        adjustableMatureAmount: selectedReturn[0]?.adjustableMatureAmount,
        status: selectedReturn[0]?.dpsStatus,
        interestRate: selectedReturn[0]?.interestRate,
        totalLateFeePaid: selectedReturn[0]?.totalLateFeePaid,
      };
      setReturnData(tempData);
      setRetunHistory(selectedReturn[0]?.dpsReturn);
      setSelectedId(selectedReturn[0]?._id);
    }
  }, [selectedReturn]);

  const handlePrint = (id) => {
    setShowContent(true);
    const filterREturnHistory = retunHistory.find(({ _id }) => _id === id);
    setSingleRetunHistory(filterREturnHistory);
    console.log(id);
  };

  return (
    <div>
      {}
      <div className="w-[100%]">
        <div>
          <h1 className="bg-[#5daaf1] inline px-2 py-1 rounded-md text-white text-[18px]">
            Dps History
          </h1>
          <table className="my-2 w-[100%]">
            <thead>
              <tr className="border">
                <th className="table-header-font border-2 px-2 py-1">DPS No</th>
                <th className="table-header-font border-2">Mem. ID</th>
                <th className="table-header-font border-2  px-2 py-1">Name</th>
                <th className="table-header-font border-2 px-1">Mobile</th>
                <th className="table-header-font border-2 px-1">Duration</th>
                <th className="table-header-font border-2 px-1">
                  Mature Amount
                </th>
                <th className="table-header-font border-2 px-1">Total Paid</th>
                <th className="table-header-font border-2 px-1">
                  Late Fee Due
                </th>
                {returnData?.status === "closed" && (
                  <>
                    <th className="table-header-font border-2 px-1">
                      Adjust M.A.
                    </th>
                    <th className="table-header-font border-2 px-1">
                      Total Return
                    </th>
                    <th className="table-header-font border-2 px-1">
                      Remining Return
                    </th>
                  </>
                )}

                <th className="table-header-font border-2 px-1">Dps Status</th>
                <th className="table-header-font border-2 px-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.dpsNo}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.memberId}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.name}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.mobile}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.duration}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.matureAmount}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.totalPaid}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {totalLateFee - returnData?.totalLateFeePaid}
                </td>
                {returnData?.status === "closed" && (
                  <>
                    <td className="table-data-font border-2 px-1 text-center">
                      {returnData?.adjustableMatureAmount}
                    </td>

                    <td className="table-data-font border-2 px-1 text-center">
                      {returnData?.totalReturn}
                    </td>
                    <td className="table-data-font border-2 px-1 text-center">
                      {returnData?.adjustableMatureAmount -
                        returnData?.totalReturn}
                    </td>
                  </>
                )}

                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.status}
                </td>

                <td className="border-2 px-1 text-center">
                  {returnData?.status === "active" ? (
                    <p
                      className="bg-red-600 text-white rounded text-lg cursor-pointer"
                      onClick={() => setShowCloseModal(true)}
                    >
                      Close
                    </p>
                  ) : (
                    <p
                      className="bg-secondary text-white rounded text-lg cursor-pointer"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Pay
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Nominee Information section */}

        {returnData?.status === "closed" && (
          <div className="w-[100%]">
            <h1 className="bg-[#5daaf1] inline px-2 py-1 rounded-md text-white text-[18px]">
              Return Information
            </h1>
            <table className="my-2">
              <thead>
                <tr className="border">
                  <th className="table-header-font border-2">Admin Name</th>
                  <th className="table-header-font border-2 px-1">
                    Admin Phone
                  </th>
                  <th className="table-header-font border-2 px-1">
                    Return Date
                  </th>
                  <th className="table-header-font border-2 px-1">
                    Tranjection No
                  </th>
                  <th className="table-header-font border-2 px-1">
                    Return Amount
                  </th>
                  <th className="table-header-font border-2 px-1">Print</th>
                </tr>
              </thead>
              <tbody>
                {retunHistory?.map((item, index) => (
                  <tr key={index}>
                    <td className="table-data-font border-2 px-1 text-center w-[200px]">
                      {item?.adminName}
                    </td>
                    <td className="table-data-font border-2 px-1 text-center w-[200px]">
                      {item?.adminPhone}
                    </td>
                    <td className="table-data-font border-2 px-1 text-center w-[200px]">
                      {item?.returnDate}
                    </td>
                    <td className="table-data-font border-2 px-1 text-center w-[200px]">
                      {item?.trnxIDCheckNoOthers}
                    </td>
                    <td className="table-data-font border-2 px-1 text-center w-[200px]">
                      {item?.amount}
                    </td>
                    <td
                      onClick={() => handlePrint(item._id)}
                      className="table-data-font border-2 px-1 text-center w-[80px]   "
                    >
                      <Icon
                        icon="material-symbols:print"
                        width={30}
                        color="black"
                        className="cursor-pointer w-[30px] mx-auto"
                      />
                      {/* <ReactToPrint
                        trigger={() => (
                          <Icon
                            icon="material-symbols:print"
                            width={30}
                            color="black"
                            className="cursor-pointer w-[30px] mx-auto"
                          />
                        )}
                        content={() => componentRef.current}
                        onBeforePrint={() => setShowContent(true)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showContent && (
          <Modal
            title="Print Voucher"
            width="w-[40%]"
            setModal={setShowContent}
            body={
              <PrintBody
                retunHistory={singleRetunHistory}
                returnData={returnData}
              />
            }
          />
        )}

        {showPaymentModal && (
          <Modal
            title="Payment"
            width="w-[40%]"
            setModal={setShowPaymentModal}
            body={
              <PaymentBody
                setShowPaymentModal={setShowPaymentModal}
                selectedId={selectedId}
                setUpdateStatus={setUpdateStatus}
                maxReturn={
                  returnData?.adjustableMatureAmount - returnData?.totalReturn
                }
              />
            }
          />
        )}
        {showCloseModal && (
          <Modal
            title="Close your DPS"
            width="w-[40%]"
            setModal={setShowCloseModal}
            body={
              <CloseBody
                setShowCloseModal={setShowCloseModal}
                selectedId={selectedId}
                setUpdateStatus={setUpdateStatus}
                returnData={returnData}
                totalLateFee={totalLateFee}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  submitButton:
    "my-0 mx-0 bg-secondary hover:bg-primary hover:outline hover:outline-2 hover:outline-secondary hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-black text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center",
};

export default ReturnHistory;
