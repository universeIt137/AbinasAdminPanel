/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Modal from "../../../../shared/Modal";
import { useMutation, useQueryClient } from "react-query";
import {
  dpsReturnAmount,
  dpsStatusChange,
} from "../../../../services/webDashboard/dps";
import { toast } from "react-toastify";
import Loader from "../../Loader";

const CloseBody = ({
  setShowCloseModal,
  selectedId,
  setUpdateStatus,
  returnData,
}) => {
  const [loading, setLoading] = useState(false);
  const [givenRate, setGivenRate] = useState(returnData?.interestRate);
  const [retunableAmount, setRetunableAmount] = useState(
    Math.ceil(
      (Number(returnData?.interestRate) * Number(returnData?.totalPaid)) / 100
    )
  );
  const [totalReturnAmout, setTotalReturnAmout] = useState(
    retunableAmount + Number(returnData?.totalPaid)
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
    setTotalReturnAmout(retunableAmount + Number(returnData?.totalPaid));
  }, [retunableAmount]);

  const submitHandler = async () => {
    try {
      const tempData = {
        id: selectedId,
        matureAmount: totalReturnAmout,
        returnableAmount: totalReturnAmout,
      };
      await closeDpsMutation.mutateAsync(tempData);
      setUpdateStatus(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4">
      {loading && <Loader forProcess={true} />}
      <h1 className="text-xl font-semibold my-2">
        Total Dps Payment : {returnData?.totalPaid}
      </h1>
      <h1 className="text-xl font-semibold">
        Dps interestRate : {returnData?.interestRate}
      </h1>
      <div className="flex flex-col my-4">
        <label htmlFor="monthlyInstAmount" className="input-label pb-2">
          How many % you have return this DPS
        </label>
        <input
          type="number"
          className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
          value={givenRate}
          onChange={(e) => {
            setGivenRate(e.target.value);
            setRetunableAmount(
              Math.ceil(
                (Number(e.target.value) * Number(returnData?.totalPaid)) / 100
              )
            );
          }}
        />
      </div>

      <h1 className="text-xl font-semibold">
        User Total Returnable Amount : {totalReturnAmout}
      </h1>
      <button
        className="bg-red-600 px-8 py-2 rounded-md text-white mt-5"
        onClick={submitHandler}
      >
        Close
      </button>
    </div>
  );
};

const PaymentBody = ({ setShowPaymentModal, selectedId, setUpdateStatus }) => {
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
      const newPaymentData = {
        id: selectedId,
        trnxIDCheckNoOthers: transjectionNo,
        returnAmount: paymentAmount,
      };
      await dpsReturnAmountMutation.mutateAsync(newPaymentData);
      setUpdateStatus(true);
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

const ReturnHistory = ({ selectedReturn, setUpdateStatus }) => {
  const [returnData, setReturnData] = useState({});
  const [retunHistory, setRetunHistory] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    if (selectedReturn) {
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
        remaningAmount: selectedReturn[0]?.returnableAmount,
        status: selectedReturn[0]?.dpsStatus,
        interestRate: selectedReturn[0]?.interestRate,
      };
      setReturnData(tempData);
      setRetunHistory(selectedReturn[0]?.dpsReturn);
      setSelectedId(selectedReturn[0]?._id);
    }
  }, [selectedReturn]);

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
                  Total Return
                </th>
                <th className="table-header-font border-2 px-1">
                  Remining Return
                </th>
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
                  {returnData?.totalReturn}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {returnData?.remaningAmount - returnData?.totalReturn}
                </td>
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

        <div className="w-[100%]">
          <h1 className="bg-[#5daaf1] inline px-2 py-1 rounded-md text-white text-[18px]">
            Return Information
          </h1>
          <table className="my-2">
            <thead>
              <tr className="border">
                <th className="table-header-font border-2">Admin Name</th>
                <th className="table-header-font border-2 px-1">Admin Phone</th>
                <th className="table-header-font border-2 px-1">Return Date</th>
                <th className="table-header-font border-2 px-1">
                  Tranjection No
                </th>
                <th className="table-header-font border-2 px-1">
                  Return Amount
                </th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
