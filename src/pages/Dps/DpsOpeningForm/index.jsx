import Table from "../../../shared/Table/Table";
import OpeningForm from "./components/OpeningForm";
import MenuBar from "../../../shared/MenuBar";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMemberShip } from "../../../services/webDashboard/memberShip";
import MemberInformation from "./components/MemberInformation";
import {
  approveDpsForm,
  getAllDps,
  getapprovedDps,
  getunapprovedDps,
} from "../../../services/webDashboard/dps";
import Loader from "../../../shared/Loader";
import DpsUpdate from "./components/DpsUpdate";

const DpsPage = () => {
  const [loading, setLoading] = useState(true); //loading off
  const [allMembership, setAllMembership] = useState([]);
  const [selectedMemberShip, setSelectedMemberShip] = useState([]);
  const [allUnapprovedDps, setAllUnapprovedDps] = useState([]);
  const [allapprovedDps, setAllapprovedDps] = useState([]);
  const [paymentHistorys, setPaymentHistorys] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState();
  const [showDpsUpdate, setShowDpsUpdate] = useState(false);
  const [selectedDpsUpdate, setSelectedDpsUpdate] = useState({});

  const queryClient = useQueryClient();

  const memberShipQuery = useQuery("meberships", () => getMemberShip(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  const allDpsDatas = useQuery("allDpss", () => getAllDps(), {
    cacheTime: 0,
    staleTime: Infinity, // console.log(
    refetchOnMount: true,
  });

  const unapproveQuery = useQuery("dpsForm", () => getunapprovedDps(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const approvedQuery = useQuery("dpsFormapproved", () => getapprovedDps(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  // console.log(approvedQuery);

  const approveDpsFromMutation = useMutation(approveDpsForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("dpsForm");
      queryClient.invalidateQueries("dpsFormapproved");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (memberShipQuery.data?.data) {
      const approvedData = memberShipQuery.data?.data?.result?.filter(
        (item) => item.status === "approved"
      );
      setAllMembership(approvedData);
      // setAllMembership(memberShipQuery.data?.data?.result);
    }
  }, [memberShipQuery.data?.data]);

  useEffect(() => {
    if (allDpsDatas?.data?.data) {
      const approvedData = allDpsDatas?.data?.data?.filter(
        (item) => item.approveStatus === "approved"
      );
      // // console.log(approvedData);
    }
  }, [allDpsDatas?.data?.data]);

  useEffect(() => {
    if (unapproveQuery.data?.data) {
      const tempData = unapproveQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          dpsNo: item?.dpsNo,
          openingDate: item?.openingDate?.split("T")[0],
          memberID: item?.memberID,
          duration: item?.duration,
          interestRate: item?.interestRate,
          noOfInstallment: item?.noOfInstallment,
          monthlyInstAmount: item?.monthlyInstAmount,
          principleAmount: item?.principleAmount,
          matureAmount: item?.matureAmount,
          lastPayDate: item?.lastPayDate,
          lateFee: item?.lateFee,
          firstInstallmentAmount: item?.firstInstallmentAmount,
          trnxIDCheckNoOthers: item?.trnxIDCheckNoOthers,
          naration: item?.naration,
        };
      });

      setAllUnapprovedDps(tempData);
      setLoading(false);
    }
  }, [unapproveQuery.data?.data]);

  useEffect(() => {
    if (approvedQuery.data?.data) {
      const tempData = approvedQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          dpsNo: item?.dpsNo,
          openingDate: item?.openingDate?.split("T")[0],
          memberID: item?.memberID,
          duration: item?.duration,
          interestRate: item?.interestRate,
          noOfInstallment: item?.noOfInstallment,
          monthlyInstAmount: item?.monthlyInstAmount,
          principleAmount: item?.principleAmount,
          matureAmount: item?.matureAmount,
          paymentHistory: item?.paymentHistory,
          naration: item?.naration,
          lastPayDate: item?.lastPayDate,
        };
      });
      // // console.log(tempData);
      setAllapprovedDps(tempData);
      setLoading(false);
    }
  }, [approvedQuery.data?.data]);

  useEffect(() => {
    const filtaredItem = allapprovedDps?.filter(
      (item) => item?._id === selectedPaymentId
    );
    const tempData = filtaredItem[0]?.paymentHistory?.map((item) => {
      return {
        _id: item._id,
        dpsNo: filtaredItem[0]?.dpsNo,
        memberId: filtaredItem[0]?.memberID,
        installmentAmount: item?.monthlyInstAmount,
        installmentDate: item?.lastDate,
        status: item?.paymentStatus,
      };
    });

    setPaymentHistorys(tempData);
  }, [selectedPaymentId]);

  const tableHeader = [
    { name: "DPS NO", key: "dpsNo" },
    { name: "Opening Date", key: "openingDate" },
    { name: "Member ID", key: "memberID" },
    { name: "Duration", key: "duration" },
    { name: "Inst Rate", key: "interestRate" },
    { name: "Monthly Inst", key: "monthlyInstAmount" },
    { name: "Principle Amount", key: "principleAmount" },
    { name: "Mature Amount", key: "matureAmount" },
  ];

  const onHandleActions = async (id) => {
    setLoading(true);
    try {
      await approveDpsFromMutation.mutateAsync(id);
      setSelectedPaymentId("");
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const handleActionClick = async (type, id) => {
    console.log(type, id);
    const selectedDps = allUnapprovedDps?.filter((item) => item._id === id);
    const result = allMembership?.filter(
      (item) => item.memberId === selectedDps[0]?.memberID
    );
    // // console.log(selectedDps);
    setSelectedMemberShip(result);
    switch (type) {
      case "click":
        setSelectedPaymentId(id);
        break;
      case "approve":
        console.log(id);
        await onHandleActions(id);
        break;
      case "edit":
        // // console.log("Edit: ");
        // // console.log(selectedDps?.[0]);

        setSelectedDpsUpdate(selectedDps?.[0]);
        setShowDpsUpdate(true);
        break;
      case "reject":
        break;
      case "pending":
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-5">
      {loading && <Loader forProcess={true} />}
      <MenuBar />
      {selectedMemberShip.length > 0 && (
        <MemberInformation selectedMemberShip={selectedMemberShip} />
      )}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="h-[350px] bg-primary rounded-md">
          <OpeningForm
            allMembership={allMembership}
            setSelectedMemberShip={setSelectedMemberShip}
          />
        </div>
        <div className="  bg-primary rounded-md  ">
          <h5 className="text-center  section-title  ">Unapproved List</h5>
          <div className="h-[320px] overflow-y-scroll ">
            <Table
              headers={tableHeader}
              data={allUnapprovedDps ?? []}
              Status={false}
              actions={true}
              actionName={"Status"}
              handleActionClick={handleActionClick}
              actionValue={{ approve: true, edit: true }}
            />
          </div>
        </div>

        <div className="  bg-primary rounded-md  ">
          <h5 className="text-center  section-title  ">Approved List</h5>
          <div className="h-[320px] overflow-y-scroll ">
            <Table
              headers={tableHeader}
              data={allapprovedDps ?? []}
              Status={false}
              actions={false}
              // actionName={"View"}
              // actionValue={{ edit: true }}
              handleActionClick={handleActionClick}
            />
          </div>
        </div>
        <div className="  bg-primary rounded-md  ">
          <h5 className="text-center  section-title  ">Payment History</h5>
          <div className="h-[320px] overflow-y-scroll ">
            <Table
              headers={[
                { name: "DPS NO", key: "dpsNo" },
                { name: "Membership ID", key: "memberId" },
                { name: "Inst. Amount", key: "installmentAmount" },
                { name: "Inst. Date", key: "installmentDate" },
                { name: "Status", key: "status" },
              ]}
              data={paymentHistorys ?? []}
              Status={false}
              actions={false}
            />
          </div>
        </div>
        {/* <div className="h-[350px] bg-primary rounded-md overflow-y-scroll">
          <Table
            title={"Payment History"}
            headers={[
              { name: "DPS NO", key: "dpsNo" },
              { name: "Membership ID", key: "memberId" },
              { name: "Inst. Amount", key: "installmentAmount" },
              { name: "Inst. Date", key: "installmentDate" },
            ]}
            data={paymentHistorys ?? []}
            Status={false}
            actions={true}
            actionName={"Flag"}
            // handleActionClick={}
          />
        </div> */}
      </div>
      {showDpsUpdate && (
        <DpsUpdate
          selectedDpsUpdate={selectedDpsUpdate}
          showDpsUpdate={showDpsUpdate}
          setShowDpsUpdate={setShowDpsUpdate}
        />
      )}
    </div>
  );
};

export default DpsPage;
