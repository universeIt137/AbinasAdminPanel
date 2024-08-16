/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { Icon } from "@iconify/react";
import MenuBar from "../../../shared/MenuBar";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MemberInformation from "./component/MemberInformation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  currentDate,
  dpsTotalLateFee,
  getAllDps,
  paymentDps,
} from "../../../services/webDashboard/dps";
import Modal from "../../../shared/Modal";
import { toast } from "react-toastify";

const PaymentBody = ({
  setShowPaymentModal,
  selectedHistory,
  selectedId,
  setUpdateStatus,
  totalLateFee,
  totalLateFeePaid = 0,
  refetch,
}) => {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [lateFeeAmount, setLateFeeAmount] = useState("");
  const [transjectionNo, setTransjectionNo] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(paymentAmount);
  // console.log(lateFeeAmount);
  const queryClient = useQueryClient();
  const createDpsMutation = useMutation(paymentDps, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("depsHistory");
      setLoading(false);
      setShowPaymentModal(false);
      toast.info("Your DPS Payment Processng");
    },
    onError: (error) => {
      setLoading(false);
      setShowPaymentModal(false);
    },
  });

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      console.log(
        selectedHistory?.monthlyInstAmount - selectedHistory?.paymentAmount
      );
      console.log("lateFeeAmount: ", lateFeeAmount);
      if (
        selectedHistory?.monthlyInstAmount - selectedHistory?.paymentAmount <
        lateFeeAmount
      ) {
        toast.error("Your DPS Late fee not enough");
        return;
      } else {
        const newPaymentData = {
          id: selectedId,
          trnxIDCheckNoOthers: transjectionNo,
          installmentNo: selectedHistory?.installmentNo,
          payAmount: paymentAmount,
          lateFeeAmount,
        };
        console.log(newPaymentData);
        await createDpsMutation.mutateAsync(newPaymentData);
      }

      // refetch();
      setUpdateStatus(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  console.log(totalLateFeePaid);

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="p-5">
          <div className="flex">
            <div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Installment Amount
                </label>
                <input
                  type="number"
                  className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                  value={selectedHistory?.monthlyInstAmount}
                  readOnly
                />
              </div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Due
                </label>
                <input
                  type="number"
                  className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                  value={
                    selectedHistory?.monthlyInstAmount -
                    selectedHistory?.paymentAmount
                  }
                  readOnly
                />
              </div>
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
            </div>
            <div className="divider lg:divider-horizontal"> </div>
            <div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Total Late Fee
                </label>
                <input
                  type="number"
                  value={totalLateFee}
                  className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                  readOnly
                />
              </div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Due Late Fee
                </label>
                <input
                  type="number"
                  value={totalLateFee - totalLateFeePaid}
                  className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                  readOnly
                />
              </div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Late Fee Amount
                </label>
                <input
                  type="number"
                  value={lateFeeAmount}
                  className="input-form bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary mb-1.5"
                  onChange={(e) => setLateFeeAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-0">
                <label htmlFor="monthlyInstAmount" className="input-label pb-2">
                  Pay Date
                </label>
                <DatePicker
                  className="bg-input px-2 py-0.5 rounded-[6px] outline-[#000000CC] border-[2px] border-#000000CC bg-primary input-form"
                  selected={new Date()}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-4 ">
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
    </>
  );
};

const DpsCollection = () => {
  const [selectedDps, setSelectedDps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [totalLateFee, setTotalLateFee] = useState("");
  const [totalLateFeePaid, setTotalLateFeePaid] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [presentDate, setPresentDate] = useState(currentDate());

  console.log(presentDate);

  // const queryClient = useQueryClient();
  const dpsHistoryQuery = useQuery("depsHistory", () => getAllDps(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (updateStatus) {
      dataLoad();
      setUpdateStatus(false);
    }
  }, [updateStatus]);

  const dpsHistoryDataFilter = (datas) => {
    const temppaymentHistory = datas[0]?.paymentHistory?.map((item, index) => {
      return {
        _id: item._id,
        dpsNo: datas[0]?.dpsNo,
        memberID: datas[0]?.memberID,
        duration: datas[0]?.duration,
        payLastDay: item?.lastDate,
        PayDate: item?.payDate,
        transjectionNo: item?.trnxIDCheckNoOthers,
        interestRate: item?.interestRate,
        installmentNo: item?.installmentNo,
        monthlyInstAmount: item?.monthlyInstAmount,
        due: item?.due,
        paymentStatus: item?.paymentStatus,
        paymentAmount: item?.paymentAmount,
      };
    });

    return temppaymentHistory;
  };

  // const dpsTotalLateFee = (paymentHistory, dpsInfo) => {
  //   const lateFee = dpsInfo[0].lateFee;

  //   const d = new Date();
  //   const ts = new Date(d);
  //   const currentDate = ts.toJSON().split("T")[0];
  //   const totalLateFee = paymentHistory.reduce((sum, paymentDetails) => {
  //     if (
  //       (paymentDetails.paymentStatus === "unpaid" &&
  //         paymentDetails.payLastDay < currentDate) ||
  //       (paymentDetails.paymentStatus === "paid" &&
  //         paymentDetails.payLastDay < paymentDetails.PayDate)
  //     ) {
  //       return sum + lateFee;
  //     } else {
  //       return sum;
  //     }
  //   }, 0);

  //   return totalLateFee;
  // };

  const dataLoad = async () => {
    const allDps = await getAllDps();
    const dpsHistory = allDps?.data?.filter(
      (item) => item?.dpsNo === searchTerm
    );
    const temppaymentHistory = dpsHistoryDataFilter(dpsHistory);
    const totalLateFees = dpsTotalLateFee(dpsHistory[0]);
    setTotalLateFee(totalLateFees);

    setTotalLateFeePaid(dpsHistory?.[0].totalLateFeePaid);
    setPaymentHistory(temppaymentHistory);
    setSelectedId(dpsHistory[0]?._id);
    setSelectedDps(dpsHistory);
    toast.success("Your DPS Payment success");
    console.log(dpsHistory);
  };

  const searchHandler = () => {
    const dpsHistory = dpsHistoryQuery.data?.data?.filter(
      (item) => item?.dpsNo === searchTerm
    );
    const temppaymentHistory = dpsHistoryDataFilter(dpsHistory);
    const totalLateFees = dpsTotalLateFee(dpsHistory[0]);
    setTotalLateFee(totalLateFees);
    // console.log(dpsHistory[0].totalLateFeePaid);
    setTotalLateFeePaid(dpsHistory?.[0].totalLateFeePaid);
    // console.log(temppaymentHistory);
    setPaymentHistory(temppaymentHistory);
    setSelectedId(dpsHistory[0]?._id);
    setSelectedDps(dpsHistory);
    // console.log(dpsHistory);
  };

  const handleOnChangeInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTrack = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  console.log(selectedDps);

  return (
    <div className="w-[90%] mx-auto mt-5">
      <MenuBar />
      <div className=" flex my-5">
        <h1 className="text-2xl font-semibold mr-4">Search By DPS No</h1>
        <div className=" flex items-center border-2 rounded-md">
          <input
            type="text"
            className="outline-none pl-2 w-[300px]"
            placeholder="search by dps no"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleTrack(e)}
          />
          <Icon
            icon="tdesign:search"
            className="mx-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
      </div>

      {selectedDps.length > 0 && (
        <MemberInformation selectedMemberShip={selectedDps[0]?.userId} />
      )}

      {/* table */}
      {selectedDps.length > 0 && (
        <div className="bg-primary p-2 rounded-md">
          <h5 className="text-center bg-primary section-title">Payment List</h5>
          <div className="bg-white p-2 rounded-sm">
            <div className="overflow-x-auto ">
              <table className="w-[100%]">
                {/* head */}
                <thead>
                  <tr className="">
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Inst. No
                    </th>
                    <th
                      className=" bg-customBase border-2 border-white   px-4 py-2 table-header-font w-[50px]"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      DPS No
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Member ID
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Duration
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Last Date
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Pay Date
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Trnx ID/Check no
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Inst. Rate
                    </th>

                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Monthly Inst.
                    </th>

                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Payment Amount
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Late Fee
                    </th>

                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Payment
                    </th>
                    <th
                      className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                      style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory?.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 !== 0 ? "bg-customBase" : "bg-[#D8DFE5] "
                      } `}
                    >
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.installmentNo}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.dpsNo}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.memberID}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.duration}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.payLastDay}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.PayDate}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.transjectionNo}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.interestRate}
                      </td>

                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.monthlyInstAmount}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {item?.paymentAmount}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font">
                        {(item.paymentStatus === "unpaid" &&
                          item.payLastDay < presentDate) ||
                        (item.paymentStatus === "paid" &&
                          item.payLastDay < item.PayDate)
                          ? selectedDps?.[0]?.lateFee
                          : 0}
                      </td>
                      <td className="border-2 border-white text-base font-normal table-data-font cursor-pointer">
                        <button
                          className={`${
                            item?.paymentStatus === "paid" ||
                            selectedDps?.[0]?.dpsStatus === "closed"
                              ? "bg-[#1187ee7c]"
                              : "bg-[#1188EE]"
                          } text-white rounded-md text-base font-normal table-data-font cursor-pointer px-5 py-2`}
                          onClick={() => {
                            setSelectedHistory(item);
                            setShowPaymentModal(true);
                          }}
                          disabled={
                            item?.paymentStatus === "paid" ||
                            selectedDps?.[0]?.dpsStatus === "closed"
                          }
                        >
                          Pay
                        </button>
                      </td>
                      <td className="flex text-white rounded-md border-2 border-white text-base font-normal table-data-font">
                        {item?.paymentStatus === "unpaid" ? (
                          <div className="bg-[#6E7984] text-center px-2 rounded-md mr-3">
                            <p>Unpaid</p>
                          </div>
                        ) : item?.paymentStatus === "late paid" ? (
                          <div className="bg-[#FA8D29] text-center px-0.5 rounded-md mr-3">
                            <p>Late Paid</p>
                          </div>
                        ) : (
                          <div className="bg-[#08BF0F] text-center px-5 rounded-md mr-3">
                            <p>Paid</p>
                          </div>
                        )}

                        <Icon
                          icon="material-symbols:print"
                          width={30}
                          color="black"
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="mt-2" />
              <div className="flex justify-end gap-10 mt-2">
                <div className="bg-slate-300 p-4">
                  <h1 className="text-end text-xl font-semibold">
                    Total DPS payment : {selectedDps?.[0].totalPaid}
                  </h1>
                  <h1 className="text-end text-xl font-semibold">
                    Total payment (DPS + Late Fee) :{" "}
                    {selectedDps?.[0].totalPaid +
                      selectedDps?.[0].totalLateFeePaid}
                  </h1>
                </div>
                <div className="bg-slate-300 p-4">
                  <h1 className="text-end text-xl font-semibold">
                    Late Fee: {totalLateFee}
                  </h1>
                  <h1 className="text-end text-xl font-semibold">
                    Late Fee Paid: {selectedDps?.[0].totalLateFeePaid}
                  </h1>
                  <h1 className="text-end text-xl font-semibold">
                    Late Due: {totalLateFee - selectedDps?.[0].totalLateFeePaid}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <Modal
          title="Payment"
          width="w-[34%]"
          setModal={setShowPaymentModal}
          body={
            <PaymentBody
              setShowPaymentModal={setShowPaymentModal}
              selectedHistory={selectedHistory}
              selectedId={selectedId}
              refetch={dpsHistoryQuery.refetch}
              setUpdateStatus={setUpdateStatus}
              totalLateFee={totalLateFee}
              totalLateFeePaid={totalLateFeePaid}
            />
          }
        />
      )}
    </div>
  );
};

const styles = {
  submitButton:
    "my-0 mx-0 bg-secondary hover:bg-primary hover:outline hover:outline-2 hover:outline-secondary hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-black text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center",
};

export default DpsCollection;
